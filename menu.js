fetch("menu.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("menu-container").innerHTML = data;

    // ===== MENU MOBILE =====
    const toggle = document.querySelector('.nav-toggle');
    const panel = document.getElementById('mobile-menu');

    function closeMenu() {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }

    if (toggle && panel) {
      toggle.addEventListener('click', function () {
        const willOpen = panel.hidden;
        panel.hidden = !panel.hidden;
        toggle.setAttribute('aria-expanded', String(willOpen));
      });

      panel.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      document.addEventListener('click', function (event) {
        if (panel.hidden) return;
        if (!panel.contains(event.target) && !toggle.contains(event.target)) {
          closeMenu();
        }
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth > 900) closeMenu();
      });
    }

    // ===== LINK ATIVO =====
    const current = window.location.pathname.split("/").pop();

    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });

  })
  .catch(err => console.error("Erro ao carregar menu:", err));