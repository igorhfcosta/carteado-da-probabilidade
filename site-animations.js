document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-enabled');

  const header = document.querySelector('.site-header');

  if (header) {
    const updateHeaderState = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  const btn = document.getElementById('backToTop');
  const progress = document.querySelector('.progress-bar');
  const circumference = 2 * Math.PI * 18;

  if (btn && progress) {
    const updateBackToTopState = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      progress.style.strokeDashoffset = circumference - scrollPercent * circumference;
      btn.classList.toggle('show', scrollTop > 200);

      const footer = document.querySelector('.home-footer.realizacao-footer, .site-footer');
      if (footer) {
        const buttonRect = btn.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const isOverFooter =
          buttonRect.bottom >= footerRect.top &&
          buttonRect.top <= footerRect.bottom &&
          buttonRect.right >= footerRect.left &&
          buttonRect.left <= footerRect.right;

        btn.classList.toggle('on-footer', isOverFooter);
      } else {
        btn.classList.remove('on-footer');
      }
    };

    updateBackToTopState();
    window.addEventListener('scroll', updateBackToTopState, { passive: true });
    window.addEventListener('resize', updateBackToTopState);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const footerLinks = [
    {
      label: 'Abrir site da Universidade Federal de Uberlândia',
      url: 'https://ufu.br/'
    },
    {
      label: 'Abrir site do PPGECM UFU',
      url: 'https://ppgecm.ufu.br/'
    }
  ];

  document.querySelectorAll('.realizacao-footer .footer-logo-block').forEach((block, index) => {
    const config = footerLinks[index];
    if (!config) return;

    block.classList.add('is-clickable');
    block.setAttribute('role', 'link');
    block.setAttribute('tabindex', '0');
    block.setAttribute('aria-label', config.label);
    block.setAttribute('title', config.label);

    const openTarget = () => {
      window.open(config.url, '_blank', 'noopener,noreferrer');
    };

    block.addEventListener('click', openTarget);
    block.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openTarget();
      }
    });
  });

  const homeRealizacaoFooter = document.querySelector('.home-footer.realizacao-footer');

  if (homeRealizacaoFooter) {
    homeRealizacaoFooter.querySelectorAll('.footer-dice, .footer-card').forEach((item) => item.remove());
  }

  const componentsSection = document.querySelector('.components-section');

  if (componentsSection) {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
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
    `;
    document.head.appendChild(componentStyle);
  }

  const quickRulesGrid = document.querySelector('.quick-rules .quick-grid');
  const quickRules = quickRulesGrid ? Array.from(quickRulesGrid.querySelectorAll('article')) : [];

  if (quickRulesGrid && quickRules.length >= 7) {
    const quickRulesStyle = document.createElement('style');
    quickRulesStyle.textContent = `
      .quick-rules{ padding-bottom:30px !important; }

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

      .quick-rules .rule-icon{ width:62px !important; height:54px !important; margin-bottom:6px !important; }
      .quick-rules .rule-number{ width:28px !important; height:28px !important; box-shadow:0 8px 16px rgba(95,34,200,.18); }
      .quick-rules .quick-grid h3{ margin:16px 0 10px !important; color:#12002f; font-size:1rem !important; line-height:1.12 !important; }
      .quick-rules .quick-grid p{ max-width:190px; margin:0 auto !important; color:#4f4567 !important; font-size:.89rem !important; line-height:1.45 !important; }

      @media (max-width: 1100px){
        .quick-rules .quick-grid{ grid-template-columns:repeat(3, minmax(0, 1fr)) !important; }
      }

      @media (max-width: 680px){
        .quick-rules .quick-grid{ grid-template-columns:1fr !important; }
        .quick-rules .quick-grid article{ min-height:auto !important; align-items:flex-start !important; text-align:left !important; padding:22px 24px !important; }
        .quick-rules .quick-grid p{ max-width:none !important; margin:0 !important; }
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

  const turnGrid = document.querySelector('.turn-section .turn-grid');

  if (turnGrid) {
    const turnStyle = document.createElement('style');
    turnStyle.textContent = `
      .turn-section,
      .turn-section .page-shell,
      .turn-grid{
        overflow:visible !important;
      }

      .turn-section{
        position:relative;
        padding:38px 0 36px !important;
        background:
          radial-gradient(circle at 14% 0%, rgba(168,85,247,.18), transparent 34%),
          radial-gradient(circle at 86% 8%, rgba(139,61,241,.16), transparent 32%),
          linear-gradient(135deg, #12002f 0%, #1a0642 54%, #240657 100%) !important;
      }

      .turn-section::before{
        content:"";
        position:absolute;
        inset:0;
        pointer-events:none;
        opacity:.24;
        background:
          linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
        background-size:56px 56px;
      }

      .turn-section .page-shell{ position:relative; z-index:1; }
      .turn-section .section-heading{ margin-bottom:24px !important; }

      .turn-grid{
        position:relative;
        display:grid !important;
        grid-template-columns:repeat(7, minmax(0, 1fr)) !important;
        gap:14px !important;
        padding-top:18px !important;
      }

      .turn-grid article{
        position:relative;
        min-height:206px !important;
        display:flex !important;
        flex-direction:column !important;
        align-items:center !important;
        justify-content:flex-start !important;
        padding:42px 14px 18px !important;
        text-align:center !important;
        border:1px solid rgba(216,180,254,.22) !important;
        border-radius:14px !important;
        background:
          radial-gradient(circle at 50% 0%, rgba(168,85,247,.20), transparent 44%),
          rgba(255,255,255,.055) !important;
        box-shadow:0 10px 24px rgba(0,0,0,.10) !important;
        overflow:visible !important;
        transform:translateY(0) !important;
        transition:transform .22s ease, border-color .22s ease, box-shadow .22s ease, background .22s ease;
      }

      .turn-grid article:hover{
        transform:translateY(-6px) !important;
        border-color:rgba(168,85,247,.55) !important;
        background:
          radial-gradient(circle at 50% 0%, rgba(168,85,247,.28), transparent 46%),
          rgba(255,255,255,.075) !important;
        box-shadow:0 20px 34px rgba(0,0,0,.18), 0 0 0 1px rgba(168,85,247,.18) !important;
      }

      .turn-grid article::after{
        content:"";
        position:absolute;
        right:-34px;
        bottom:-42px;
        width:110px;
        height:110px;
        border:1px dashed rgba(168,85,247,.16);
        border-radius:50%;
        pointer-events:none;
      }

      .turn-number{
        position:absolute !important;
        left:50% !important;
        top:-21px !important;
        z-index:5 !important;
        width:42px !important;
        height:42px !important;
        display:grid !important;
        place-items:center !important;
        margin:0 !important;
        border-radius:50% !important;
        background:linear-gradient(135deg, var(--rules-purple-2), var(--rules-purple-dark)) !important;
        transform:translateX(-50%) !important;
        color:#fff !important;
        font-size:1.05rem !important;
        font-weight:900 !important;
        box-shadow:0 10px 24px rgba(95,34,200,.35), 0 0 0 5px rgba(168,85,247,.12) !important;
      }

      .turn-icon{
        width:58px !important;
        height:44px !important;
        margin:0 auto 8px !important;
        display:grid !important;
        place-items:center !important;
        transition:transform .22s ease, filter .22s ease;
      }

      .turn-grid article:hover .turn-icon{
        transform:translateY(-3px) scale(1.04);
      }

      .turn-icon img{ filter:drop-shadow(0 12px 18px rgba(168,85,247,.22)) !important; }
      .turn-grid h3{ margin:10px 0 8px !important; color:#fff; font-size:.9rem !important; line-height:1.14 !important; letter-spacing:-.02em; }
      .turn-grid p{ margin:0 auto !important; max-width:142px; color:#efe6ff !important; font-size:.8rem !important; line-height:1.36 !important; }

      @media (max-width: 1120px){
        .turn-grid{ grid-template-columns:repeat(3, minmax(0, 1fr)) !important; row-gap:34px !important; }
      }

      @media (max-width: 680px){
        .turn-section{ padding:36px 0 38px !important; }
        .turn-grid{ grid-template-columns:1fr !important; row-gap:30px !important; }
        .turn-grid article{ min-height:auto !important; padding:42px 20px 20px !important; }
        .turn-grid p{ max-width:none !important; }
      }
    `;
    document.head.appendChild(turnStyle);
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
