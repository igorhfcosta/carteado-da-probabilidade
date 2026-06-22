const accessibilityOverrideLink = document.createElement("link");
accessibilityOverrideLink.rel = "stylesheet";
accessibilityOverrideLink.href = "accessibility-overrides.css?v=20260622";
document.head.appendChild(accessibilityOverrideLink);

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

    const placeLanguageWidgetInMenu = () => {
      if (path.toLowerCase().includes("simulador")) return true;
      const playButton = document.querySelector(".site-header .nav-play");
      const widget = document.querySelector(".language-widget");
      if (!playButton || !widget) return false;
      if (!widget.classList.contains("language-widget--nav")) {
        widget.classList.add("language-widget--nav");
      }
      if (widget.parentElement !== playButton.parentElement || widget.previousElementSibling !== playButton) {
        playButton.insertAdjacentElement("afterend", widget);
      }
      return true;
    };

    if (!placeLanguageWidgetInMenu()) {
      let tries = 0;
      const languagePlacementTimer = window.setInterval(() => {
        tries += 1;
        if (placeLanguageWidgetInMenu() || tries > 40) {
          window.clearInterval(languagePlacementTimer);
        }
      }, 100);
    }
  })
  .catch(err => console.error("Erro ao carregar menu:", err));

document.addEventListener("DOMContentLoaded", function () {
  const turnGrid = document.querySelector(".turn-section .turn-grid");

  if (!turnGrid || document.getElementById("turn-hover-style")) return;

  const applyTurnStyle = () => {
    if (document.getElementById("turn-hover-style")) return;

    const turnHoverStyle = document.createElement("style");
    turnHoverStyle.id = "turn-hover-style";
    turnHoverStyle.textContent = `
      .turn-section{
        padding:34px 0 38px !important;
      }

      .turn-section .section-heading{
        margin-bottom:22px !important;
      }

      .turn-section .turn-grid{
        display:grid !important;
        grid-template-columns:repeat(7, minmax(0, 1fr)) !important;
        gap:12px !important;
      }

      .turn-section .turn-grid::before{
        display:none !important;
      }

      .turn-section .turn-grid article{
        min-height:210px !important;
        padding:30px 14px 16px !important;
        align-items:center !important;
        justify-content:flex-start !important;
        text-align:center !important;
        border-radius:16px !important;
        border:1px solid rgba(216,180,254,.22) !important;
        background:
          radial-gradient(circle at 50% 0%, rgba(168,85,247,.14), transparent 48%),
          linear-gradient(180deg, rgba(255,255,255,.075), rgba(255,255,255,.035)) !important;
        box-shadow:0 12px 26px rgba(0,0,0,.14), inset 0 1px 0 rgba(255,255,255,.06) !important;
        overflow:hidden !important;
        transform:translateY(0) !important;
        transition:transform .22s ease, border-color .22s ease, box-shadow .22s ease, background .22s ease !important;
        will-change:transform;
      }

      .turn-section .turn-grid article:nth-child(n+5){
        transform:translateX(0) !important;
      }

      .turn-section .turn-grid article::after{
        content:"";
        position:absolute;
        inset:auto -34px -44px auto;
        width:110px;
        height:110px;
        border:1px dashed rgba(168,85,247,.22);
        border-radius:50%;
        opacity:.55;
        transform:scale(.9);
        transition:opacity .22s ease, transform .22s ease;
        pointer-events:none;
      }

      .turn-section .turn-grid article:hover{
        transform:translateY(-6px) !important;
        border-color:rgba(168,85,247,.46) !important;
        background:
          radial-gradient(circle at 50% 0%, rgba(168,85,247,.22), transparent 50%),
          linear-gradient(180deg, rgba(255,255,255,.11), rgba(255,255,255,.055)) !important;
        box-shadow:0 18px 34px rgba(95,34,200,.18), inset 0 1px 0 rgba(255,255,255,.10) !important;
      }

      .turn-section .turn-grid article:hover::after{
        opacity:1;
        transform:scale(1);
      }

      .turn-section .turn-number{
        position:absolute !important;
        left:50% !important;
        top:-15px !important;
        width:38px !important;
        height:38px !important;
        margin:0 !important;
        transform:translateX(-50%) !important;
        background:linear-gradient(135deg, var(--rules-purple-2), var(--rules-purple-dark)) !important;
        box-shadow:0 10px 18px rgba(95,34,200,.28) !important;
        font-size:1rem !important;
      }

      .turn-section .turn-icon{
        width:64px !important;
        height:52px !important;
        margin:12px auto 10px !important;
        place-items:center !important;
        transition:transform .22s ease, filter .22s ease !important;
      }

      .turn-section .turn-icon img{
        transition:transform .22s ease, filter .22s ease !important;
        filter:drop-shadow(0 10px 14px rgba(168,85,247,.22)) !important;
      }

      .turn-section .turn-grid article:hover .turn-icon{
        transform:translateY(-3px) scale(1.04) !important;
      }

      .turn-section .turn-grid article:hover .turn-icon img{
        transform:scale(1.05) !important;
        filter:drop-shadow(0 14px 18px rgba(168,85,247,.30)) !important;
      }

      .turn-section .turn-grid h3{
        margin:8px 0 8px !important;
        color:#fff !important;
        font-size:.94rem !important;
        line-height:1.15 !important;
        letter-spacing:-.01em !important;
      }

      .turn-section .turn-grid p{
        max-width:150px !important;
        margin:0 auto !important;
        color:#eadfff !important;
        font-size:.8rem !important;
        line-height:1.38 !important;
      }

      @media (max-width: 1120px){
        .turn-section .turn-grid{ grid-template-columns:repeat(4, minmax(0, 1fr)) !important; }
      }

      @media (max-width: 760px){
        .turn-section{ padding:34px 0 36px !important; }
        .turn-section .turn-grid{ grid-template-columns:1fr !important; }
        .turn-section .turn-grid article{
          min-height:auto !important;
          align-items:flex-start !important;
          text-align:left !important;
          padding:24px 22px !important;
        }
        .turn-section .turn-number{
          position:static !important;
          transform:none !important;
          margin:0 0 12px !important;
        }
        .turn-section .turn-icon{ margin:0 0 12px !important; }
        .turn-section .turn-grid p{ max-width:none !important; margin:0 !important; }
      }
    `;

    document.head.appendChild(turnHoverStyle);
  };

  window.setTimeout(applyTurnStyle, 0);
});
