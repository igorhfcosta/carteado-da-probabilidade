document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-enabled');

  const header = document.querySelector('.site-header');

  if (header) {
    const updateHeaderState = () => {
      if (window.scrollY > 12) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  const btn = document.getElementById("backToTop");
  const progress = document.querySelector(".progress-bar");

  const circumference = 2 * Math.PI * 18; // r = 18

  if (btn && progress) {
    const updateBackToTopState = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      const offset = circumference - scrollPercent * circumference;
      progress.style.strokeDashoffset = offset;

      if (scrollTop > 200) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }

      const footer = document.querySelector('.home-footer.realizacao-footer, .site-footer');
      if (footer) {
        const buttonRect = btn.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const isOverFooter =
          buttonRect.bottom >= footerRect.top &&
          buttonRect.top <= footerRect.bottom &&
          buttonRect.right >= footerRect.left &&
          buttonRect.left <= footerRect.right;

        btn.classList.toggle("on-footer", isOverFooter);
      } else {
        btn.classList.remove("on-footer");
      }
    };

    updateBackToTopState();
    window.addEventListener("scroll", updateBackToTopState, { passive: true });
    window.addEventListener("resize", updateBackToTopState);

    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  const homeRealizacaoFooter = document.querySelector('.home-footer.realizacao-footer');

  if (homeRealizacaoFooter) {
    homeRealizacaoFooter.querySelectorAll('.footer-dice, .footer-card').forEach((item) => item.remove());

    const footerCompactStyle = document.createElement('style');
    footerCompactStyle.textContent = `
      .home-footer.realizacao-footer{
        min-height: 260px !important;
        padding: 36px clamp(22px, 5vw, 64px) 24px !important;
        gap: 16px !important;
      }

      .home-footer.realizacao-footer::after{
        bottom: -88px !important;
        height: 132px !important;
      }

      .home-footer .footer-orbit.left{
        left: -92px !important;
        top: 44px !important;
        width: 270px !important;
        height: 92px !important;
      }

      .home-footer .footer-orbit.right{
        right: 44px !important;
        top: 42px !important;
        width: 278px !important;
        height: 94px !important;
      }

      .home-footer .realizacao-label{
        width: min(500px, 100%) !important;
        font-size: .96rem !important;
      }

      .home-footer .footer-logos{
        gap: 38px !important;
      }

      .home-footer .footer-logo-block{
        min-width: 284px !important;
        padding: 4px !important;
      }

      .home-footer .footer-logo-block img{
        height: 72px !important;
        max-width: 112px !important;
      }

      .home-footer .footer-logo-text strong{
        font-size: 1.9rem !important;
      }

      .home-footer .footer-logo-text span{
        font-size: .94rem !important;
      }

      .home-footer .footer-divider{
        height: 82px !important;
      }

      .home-footer .footer-bottom-line{
        margin-top: 0 !important;
      }

      .home-footer .footer-credit{
        font-size: .94rem !important;
      }

      @media (max-width: 860px){
        .home-footer.realizacao-footer{
          padding: 34px 20px 24px !important;
          gap: 16px !important;
        }

        .home-footer .footer-logos{
          gap: 16px !important;
        }

        .home-footer .footer-logo-block{
          min-width: 0 !important;
        }
      }

      @media (max-width: 520px){
        .home-footer.realizacao-footer{
          padding: 30px 16px 22px !important;
        }
      }
    `;
    document.head.appendChild(footerCompactStyle);
  }

  const animateItems = document.querySelectorAll('.js-animate-on-scroll');

  if (!animateItems.length) return;

  const firstItem = animateItems[0];
  if (firstItem) {
    firstItem.classList.add('is-visible');
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animateItems.forEach(item => {
    if (!item.classList.contains('is-visible')) {
      observer.observe(item);
    }
  });
});
