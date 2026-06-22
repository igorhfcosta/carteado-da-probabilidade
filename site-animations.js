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

  const componentsSection = document.querySelector('.components-section');

  if (componentsSection) {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .component-card{
        grid-template-columns:minmax(0, 1fr) 280px !important;
        overflow:hidden !important;
      }

      .component-visual{
        min-height:255px !important;
      }

      .card-fan{
        width:278px !important;
        height:250px !important;
      }

      .card-fan .fan-card{
        width:124px !important;
        max-height:210px !important;
      }

      .card-fan .fan-card-left{
        transform:translateX(-45px) rotate(-14deg) !important;
      }

      .card-fan .fan-card-center{
        transform:translateY(-8px) rotate(0deg) !important;
      }

      .card-fan .fan-card-right{
        transform:translateX(45px) rotate(14deg) !important;
      }

      .effect-fan .fan-card-center{
        transform:translateY(-8px) rotate(3deg) !important;
      }

      .component-card:hover .fan-card-left{
        transform:translateX(-58px) translateY(2px) rotate(-17deg) !important;
      }

      .component-card:hover .fan-card-center{
        transform:translateY(-16px) rotate(0deg) !important;
      }

      .component-card:hover .fan-card-right{
        transform:translateX(58px) translateY(2px) rotate(17deg) !important;
      }

      .effect-card:hover .fan-card-center{
        transform:translateY(-16px) rotate(3deg) !important;
      }

      .dice-item{
        transition:transform .22s ease, box-shadow .22s ease, border-color .22s ease, background .22s ease;
        will-change:transform;
      }

      .dice-photo,
      .dice-photo img{
        transition:transform .22s ease, filter .22s ease, background .22s ease;
      }

      .dice-item:hover{
        transform:translateY(-8px);
        border-color:rgba(139,61,241,.34);
        background:linear-gradient(180deg, #fff 0%, #f5edff 100%);
        box-shadow:0 18px 30px rgba(95,34,200,.14);
      }

      .dice-item:hover .dice-photo{
        transform:rotate(-4deg) scale(1.05);
        background:rgba(168,85,247,.16);
      }

      .dice-item:hover .dice-photo img{
        transform:translateY(-4px) rotate(7deg) scale(1.06);
        filter:drop-shadow(0 18px 18px rgba(95,34,200,.28));
      }

      @media (max-width: 1120px){
        .component-card{
          grid-template-columns:minmax(0, 1fr) 260px !important;
        }
      }

      @media (max-width: 760px){
        .component-card{
          grid-template-columns:1fr !important;
        }

        .component-visual{
          min-height:232px !important;
        }

        .card-fan{
          width:236px !important;
          height:224px !important;
        }

        .card-fan .fan-card{
          width:108px !important;
          max-height:186px !important;
        }

        .card-fan .fan-card-left{
          transform:translateX(-38px) rotate(-14deg) !important;
        }

        .card-fan .fan-card-right{
          transform:translateX(38px) rotate(14deg) !important;
        }
      }
    `;
    document.head.appendChild(componentStyle);
  }

  const quickRulesGrid = document.querySelector('.quick-rules .quick-grid');
  const quickRules = quickRulesGrid ? Array.from(quickRulesGrid.querySelectorAll('article')) : [];

  if (quickRulesGrid && quickRules.length >= 7) {
    const quickRulesStyle = document.createElement('style');
    quickRulesStyle.textContent = `
      .quick-rules{
        padding-bottom:30px !important;
      }

      .quick-rules .quick-grid{
        grid-template-columns:repeat(5, minmax(0, 1fr)) !important;
        gap:18px !important;
      }

      .quick-rules .quick-grid article{
        position:relative;
        min-height:236px !important;
        padding:24px 18px 22px !important;
        border-color:rgba(168,85,247,.22) !important;
        border-radius:18px !important;
        background:
          radial-gradient(circle at 50% 0%, rgba(168,85,247,.10), transparent 46%),
          linear-gradient(180deg, #fff 0%, #fbf8ff 100%) !important;
        box-shadow:0 16px 34px rgba(18,9,47,.07) !important;
        overflow:hidden;
        transition:transform .22s ease, box-shadow .22s ease, border-color .22s ease;
      }

      .quick-rules .quick-grid article::after{
        content:"";
        position:absolute;
        inset:auto -34px -40px auto;
        width:110px;
        height:110px;
        border:1px dashed rgba(168,85,247,.22);
        border-radius:50%;
      }

      .quick-rules .quick-grid article:hover{
        transform:translateY(-6px);
        border-color:rgba(139,61,241,.42) !important;
        box-shadow:0 20px 38px rgba(95,34,200,.13) !important;
      }

      .quick-rules .rule-icon{
        width:62px !important;
        height:54px !important;
        margin-bottom:6px !important;
      }

      .quick-rules .rule-number{
        width:28px !important;
        height:28px !important;
        box-shadow:0 8px 16px rgba(95,34,200,.18);
      }

      .quick-rules .quick-grid h3{
        margin:16px 0 10px !important;
        color:#12002f;
        font-size:1rem !important;
        line-height:1.12 !important;
      }

      .quick-rules .quick-grid p{
        max-width:190px;
        margin:0 auto !important;
        color:#4f4567 !important;
        font-size:.89rem !important;
        line-height:1.45 !important;
      }

      @media (max-width: 1100px){
        .quick-rules .quick-grid{
          grid-template-columns:repeat(3, minmax(0, 1fr)) !important;
        }
      }

      @media (max-width: 680px){
        .quick-rules .quick-grid{
          grid-template-columns:1fr !important;
        }

        .quick-rules .quick-grid article{
          min-height:auto !important;
          align-items:flex-start !important;
          text-align:left !important;
          padding:22px 24px !important;
        }

        .quick-rules .quick-grid p{
          max-width:none !important;
          margin:0 !important;
        }
      }
    `;
    document.head.appendChild(quickRulesStyle);

    const compactRules = [
      {
        sourceIndex: 0,
        title: 'Preparação',
        text: 'Separe cartas numéricas, cartas de efeito e dados. Embaralhe os montes antes de começar.'
      },
      {
        sourceIndex: 1,
        title: 'Cartas iniciais',
        text: 'Cada jogador começa com 7 cartas na mão. As demais ficam nos montes de compra.'
      },
      {
        sourceIndex: 2,
        title: 'Objetivo',
        text: 'Vence quem descartar todas as cartas primeiro, usando estratégia e efeitos no momento certo.'
      },
      {
        sourceIndex: 5,
        title: 'Cartas de efeito',
        text: 'Só podem ser usadas no próprio turno e alteram a jogada, a compra ou a ação dos oponentes.'
      },
      {
        sourceIndex: 6,
        title: 'Fim do turno',
        text: 'Após descartar, usar efeito ou não conseguir jogar, a vez passa para o próximo jogador.'
      }
    ];

    quickRulesGrid.innerHTML = '';

    compactRules.forEach((content, index) => {
      const baseRule = quickRules[content.sourceIndex] || quickRules[index];
      const rule = baseRule.cloneNode(true);
      const number = rule.querySelector('.rule-number');
      const title = rule.querySelector('h3');
      const paragraph = rule.querySelector('p');

      if (number) number.textContent = String(index + 1);
      if (title) title.textContent = content.title;
      if (paragraph) paragraph.textContent = content.text;

      quickRulesGrid.appendChild(rule);
    });
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