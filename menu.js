fetch("menu.html")
  .then(res => res.text())
  .then(data => {
    const menuContainer = document.getElementById("menu-container");
    if (!menuContainer) return;
    menuContainer.innerHTML = data;

    const toggle = document.querySelector('.nav-toggle');
    const panel = document.getElementById('mobile-menu');
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const current = window.location.pathname.split('/').pop() || 'index.html';

    const compactToggle = document.getElementById("menuToggle");

if (compactToggle && toggle) {
  compactToggle.addEventListener("click", function () {
    toggle.click();
  });
}
    
    function closeMenu() {
      if (!panel || !toggle) return;
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }

    function closeDropdown() {
      if (!dropdown || !dropdownToggle) return;
      dropdown.classList.remove('open');
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }

    if (toggle && panel) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.addEventListener('click', function () {
        const willOpen = panel.hidden;
        panel.hidden = !panel.hidden;
        toggle.setAttribute('aria-expanded', String(willOpen));
      });

      panel.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });
    }

    if (dropdown && dropdownToggle) {
      dropdownToggle.addEventListener('click', function (event) {
        event.preventDefault();
        const willOpen = !dropdown.classList.contains('open');
        dropdown.classList.toggle('open', willOpen);
        dropdownToggle.setAttribute('aria-expanded', String(willOpen));
      });
    }


const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 120) {
    header.classList.add("compact");
  } else {
    header.classList.remove("compact");
  }
});

const pageName = document.getElementById("currentPageName");

const path = window.location.pathname;

if (path.includes("index")) pageName.textContent = "Início";
else if (path.includes("como-jogar")) pageName.textContent = "Como jogar";
else if (path.includes("baixar")) pageName.textContent = "Baixar";
else if (path.includes("proposta")) pageName.textContent = "Professor";
else if (path.includes("embasamento")) pageName.textContent = "Embasamento";
else if (path.includes("sobre")) pageName.textContent = "Sobre";
else if (path.includes("contato")) pageName.textContent = "Contato";
    
    
    document.addEventListener('click', function (event) {
      if (panel && toggle && !panel.hidden && !panel.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
      if (dropdown && dropdownToggle && dropdown.classList.contains('open') && !dropdown.contains(event.target)) {
        closeDropdown();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeMenu();
      if (window.innerWidth <= 900) closeDropdown();
    });

    document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
        const parentDropdown = link.closest('.dropdown');
        if (parentDropdown) {
          const parentToggle = parentDropdown.querySelector('.dropdown-toggle');
          if (parentToggle) parentToggle.classList.add('active');
        }
      }
    });
  })
  .catch(err => console.error("Erro ao carregar menu:", err));
