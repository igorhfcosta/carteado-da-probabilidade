fetch("menu.html")
  .then(res => res.text())
  .then(data => {
    const menuContainer = document.getElementById("menu-container");
    if (!menuContainer) return;
    menuContainer.innerHTML = data;

    const toggle = document.querySelector(".nav-toggle");
    const panel = document.getElementById("mobile-menu");
    const dropdown = document.querySelector(".dropdown");
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const pageName = document.getElementById("currentPageName");
    const compactToggle = document.getElementById("menuToggle");
    const current = window.location.pathname.split("/").pop() || "index.html";
    const path = window.location.pathname;

    function closeMenu() {
      if (!panel || !toggle) return;
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }

    function closeDropdown() {
      if (!dropdown || !dropdownToggle) return;
      dropdown.classList.remove("open");
      dropdownToggle.setAttribute("aria-expanded", "false");
    }

    if (toggle && panel) {
      toggle.setAttribute("aria-expanded", "false");

      toggle.addEventListener("click", function () {
        const willOpen = panel.hidden;
        panel.hidden = !panel.hidden;
        toggle.setAttribute("aria-expanded", String(willOpen));
      });

      panel.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
      });
    }

    if (dropdown && dropdownToggle) {
      dropdownToggle.addEventListener("click", function (event) {
        event.preventDefault();
        const willOpen = !dropdown.classList.contains("open");
        dropdown.classList.toggle("open", willOpen);
        dropdownToggle.setAttribute("aria-expanded", String(willOpen));
      });
    }

    if (pageName) {
      if (current === "index.html" || current === "") pageName.textContent = "Início";
      else if (path.includes("como-jogar")) pageName.textContent = "Como jogar";
      else if (path.includes("baixar")) pageName.textContent = "Download";
      else if (path.includes("simulador")) pageName.textContent = "Jogo";
      else if (path.includes("proposta")) pageName.textContent = "Proposta didática";
      else if (path.includes("embasamento")) pageName.textContent = "Embasamento teórico";
      else if (path.includes("sobre")) pageName.textContent = "Sobre";
      else if (path.includes("contato")) pageName.textContent = "Contato";
      else pageName.textContent = "Página";
    }

    if (compactToggle && toggle) {
      compactToggle.addEventListener("click", function () {
        toggle.click();
      });
    }

    document.addEventListener("click", function (event) {
      if (
        panel &&
        toggle &&
        !panel.hidden &&
        !panel.contains(event.target) &&
        !toggle.contains(event.target) &&
        !compactToggle?.contains(event.target)
      ) {
        closeMenu();
      }

      if (
        dropdown &&
        dropdownToggle &&
        dropdown.classList.contains("open") &&
        !dropdown.contains(event.target)
      ) {
        closeDropdown();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) {
        closeMenu();
      }
      if (window.innerWidth <= 900) {
        closeDropdown();
      }

    });

    document.querySelectorAll(".nav-link, .dropdown-item, .nav-play").forEach(link => {
      if (link.getAttribute("href") === current) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
        const parentDropdown = link.closest(".dropdown");
        if (parentDropdown) {
          const parentToggle = parentDropdown.querySelector(".dropdown-toggle");
          if (parentToggle) parentToggle.classList.add("active");
        }
      }
    });
  })
  .catch(err => console.error("Erro ao carregar menu:", err));

document.addEventListener("DOMContentLoaded", function () {
  const turnGrid = document.querySelector(".turn-section .turn-grid");

  if (!turnGrid || document.getElementById("turn-hover-style")) return;

  const turnHoverStyle = document.createElement("style");
  turnHoverStyle.id = "turn-hover-style";
  turnHoverStyle.textContent = `
    .turn-section .turn-grid article{
      overflow:hidden;
      transition:transform .22s ease, border-color .22s ease, box-shadow .22s ease, background .22s ease;
      will-change:transform;
    }

    .turn-section .turn-grid article::after{
      content:"";
      position:absolute;
      inset:auto -42px -52px auto;
      width:126px;
      height:126px;
      border:1px dashed rgba(168,85,247,.24);
      border-radius:50%;
      opacity:0;
      transform:scale(.8);
      transition:opacity .22s ease, transform .22s ease;
      pointer-events:none;
    }

    .turn-section .turn-grid article:hover{
      transform:translateY(-8px);
      border-color:rgba(168,85,247,.42);
      background:linear-gradient(180deg, rgba(255,255,255,.095) 0%, rgba(168,85,247,.10) 100%);
      box-shadow:0 20px 36px rgba(0,0,0,.24), 0 0 0 1px rgba(168,85,247,.12);
    }

    .turn-section .turn-grid article:hover::after{
      opacity:1;
      transform:scale(1);
    }

    .turn-section .turn-grid article:hover .turn-number{
      box-shadow:0 12px 24px rgba(168,85,247,.30);
    }

    .turn-section .turn-grid article:hover .turn-icon img{
      transform:translateY(-3px) scale(1.06);
      filter:drop-shadow(0 16px 18px rgba(168,85,247,.28));
    }

    .turn-section .turn-icon img{
      transition:transform .22s ease, filter .22s ease;
    }
  `;

  document.head.appendChild(turnHoverStyle);
});
