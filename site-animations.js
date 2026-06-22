document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-enabled');

  const MATERIAL_LINKS = [
    'https://drive.google.com/drive/folders/1-mFXXFyECQVbNoklxSwOKxRK1ZJIeuex?usp=sharing',
    'https://drive.google.com/drive/folders/1ejZo6c3CLSsN3bzOSmZ9oI8IRMjX7PJU?usp=sharing',
    'https://drive.google.com/drive/folders/1k-2uPY4gMdtZBwX31OE3FDmcndl1MD2s?usp=drive_link',
    'https://drive.google.com/drive/folders/17w4_b_AV8Mmw2rY_1SPoJJ5eeD7yzB3w?usp=sharing'
  ];

  const PROJECT_TITLE = 'Carteado da Probabilidade';
  const PROJECT_DESCRIPTION = 'Jogo educativo com cartas e dados para aprender probabilidade por meio de estratégia, análise de possibilidades e tomada de decisão.';
  const PROJECT_IMAGE = new URL('logo/logo.png', window.location.href).href;

  const upsertMeta = (selector, attributes) => {
    let meta = document.head.querySelector(selector);
    if (!meta) {
      meta = document.createElement('meta');
      document.head.appendChild(meta);
    }
    Object.entries(attributes).forEach(([key, value]) => meta.setAttribute(key, value));
  };

  const upsertLink = (selector, attributes) => {
    let link = document.head.querySelector(selector);
    if (!link) {
      link = document.createElement('link');
      document.head.appendChild(link);
    }
    Object.entries(attributes).forEach(([key, value]) => link.setAttribute(key, value));
  };

  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: PROJECT_TITLE });
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: PROJECT_DESCRIPTION });
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: window.location.href });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: PROJECT_IMAGE });
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: PROJECT_TITLE });
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: PROJECT_DESCRIPTION });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: PROJECT_IMAGE });
  upsertLink('link[rel="apple-touch-icon"]', { rel: 'apple-touch-icon', href: 'logo/logo.png' });

  const header = document.querySelector('.site-header');
  if (header) {
    const updateHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
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
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const footerLinks = [
    { label: 'Abrir site da Universidade Federal de Uberlândia', url: 'https://ufu.br/' },
    { label: 'Abrir site do PPGECM UFU', url: 'https://ppgecm.ufu.br/' }
  ];

  document.querySelectorAll('.realizacao-footer .footer-logo-block').forEach((block, index) => {
    const config = footerLinks[index];
    if (!config) return;

    block.classList.add('is-clickable');
    block.setAttribute('role', 'link');
    block.setAttribute('tabindex', '0');
    block.setAttribute('aria-label', config.label);
    block.setAttribute('title', config.label);

    const openTarget = () => window.open(config.url, '_blank', 'noopener,noreferrer');
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

  const openAllMaterials = () => {
    MATERIAL_LINKS.forEach((link, index) => {
      window.setTimeout(() => window.open(link, '_blank', 'noopener,noreferrer'), index * 120);
    });
  };

  document.addEventListener('click', (event) => {
    const openAllButton = event.target.closest('[data-open-all-materials]');
    if (!openAllButton) return;
    event.preventDefault();
    openAllMaterials();
  });

  const homePage = document.querySelector('.home-page');

  if (homePage) {
    const homeEnhancementStyle = document.createElement('style');
    homeEnhancementStyle.textContent = `
      .hero-card{ animation:homeCardFloat 5.8s ease-in-out infinite; will-change:transform; }
      .hero-card.card-b{ animation-delay:.35s; }
      .hero-card.card-c{ animation-delay:.7s; }
      .hero-die{ animation:homeDiceFloat 4.8s ease-in-out infinite; will-change:transform; }
      .hero-die.die-white{ animation-delay:.45s; }
      .hero:hover .hero-card,
      .hero:hover .hero-die{ animation-play-state:paused; }
      @keyframes homeCardFloat{ 0%, 100%{ translate:0 0; } 50%{ translate:0 -12px; } }
      @keyframes homeDiceFloat{ 0%, 100%{ translate:0 0; } 50%{ translate:0 -10px; } }
    `;
    document.head.appendChild(homeEnhancementStyle);
  }

  if (homePage && homeRealizacaoFooter && !document.querySelector('.home-faq-section')) {
    const faqStyle = document.createElement('style');
    faqStyle.textContent = `
      .home-faq-section{ position:relative; width:100%; max-width:none; padding:64px max(22px, calc((100vw - 1180px) / 2)) 70px; background:#fff; border-top:0; overflow:hidden; }
      .home-faq-section::before, .home-faq-section::after{ display:none; }
      .home-faq-inner{ position:relative; z-index:1; width:min(1180px, 100%); margin:0 auto; display:grid; grid-template-columns:minmax(260px, .82fr) minmax(0, 1.18fr); gap:42px; align-items:start; }
      .home-faq-copy .section-label{ color:var(--purple-700); }
      .home-faq-copy h2{ color:var(--ink); font-size:clamp(2rem, 3.4vw, 3.25rem); line-height:1.06; letter-spacing:-.045em; }
      .home-faq-copy h2 span{ color:var(--purple-600); }
      .home-faq-copy p{ max-width:420px; margin-top:16px; color:var(--muted); font-size:1rem; }
      .home-faq-badge{ width:78px; height:78px; margin-top:26px; display:grid; place-items:center; border-radius:24px; color:#fff; font-size:2rem; font-weight:950; background:linear-gradient(135deg, #a855f7, #5f22c8); box-shadow:0 18px 34px rgba(95,34,200,.22); transform:rotate(-5deg); }
      .home-faq-list{ display:grid; gap:14px; }
      .home-faq-item{ position:relative; border:1px solid rgba(168,85,247,.22); border-radius:18px; background:rgba(255,255,255,.92); box-shadow:0 14px 30px rgba(35,11,80,.08); overflow:hidden; transition:transform .22s ease, box-shadow .22s ease, border-color .22s ease, background .22s ease; }
      .home-faq-item:hover{ transform:translateY(-3px); border-color:rgba(139,61,241,.42); box-shadow:0 20px 38px rgba(95,34,200,.13); }
      .home-faq-item[open]{ border-color:rgba(139,61,241,.52); background:linear-gradient(180deg, #fff 0%, #f8f2ff 100%); }
      .home-faq-item summary{ list-style:none; min-height:68px; display:flex; align-items:center; justify-content:space-between; gap:18px; padding:18px 22px; color:var(--ink); font-size:1rem; font-weight:900; cursor:pointer; }
      .home-faq-item summary::-webkit-details-marker{ display:none; }
      .home-faq-item summary::after{ content:"+"; width:34px; height:34px; flex:0 0 34px; display:grid; place-items:center; border-radius:50%; color:#fff; font-size:1.35rem; line-height:1; background:linear-gradient(135deg, #a855f7, #5f22c8); box-shadow:0 10px 18px rgba(95,34,200,.18); transition:transform .2s ease; }
      .home-faq-item[open] summary::after{ content:"−"; transform:rotate(180deg); }
      .home-faq-answer{ padding:0 22px 22px; color:var(--muted); font-size:.96rem; line-height:1.65; }
      .home-faq-answer strong{ color:var(--purple-700); }
      @media (max-width: 980px){ .home-faq-inner{ grid-template-columns:1fr; gap:28px; } .home-faq-copy p{ max-width:680px; } }
      @media (max-width: 680px){ .home-faq-section{ padding:52px 18px 56px; } .home-faq-badge{ width:62px; height:62px; border-radius:18px; font-size:1.55rem; } .home-faq-item summary{ align-items:flex-start; min-height:auto; padding:16px 16px; font-size:.95rem; } .home-faq-answer{ padding:0 16px 18px; font-size:.9rem; } }
    `;
    document.head.appendChild(faqStyle);

    const faqSection = document.createElement('section');
    faqSection.className = 'home-faq-section';
    faqSection.setAttribute('aria-labelledby', 'home-faq-title');
    faqSection.innerHTML = `
      <div class="home-faq-inner">
        <div class="home-faq-copy">
          <span class="section-label">Perguntas frequentes</span>
          <h2 id="home-faq-title">Dúvidas rápidas sobre o <span>Carteado</span>.</h2>
          <p>Respostas diretas para quem quer conhecer, baixar, imprimir ou aplicar o jogo em sala de aula.</p>
          <div class="home-faq-badge" aria-hidden="true">?</div>
        </div>
        <div class="home-faq-list">
          <details class="home-faq-item" open><summary>O jogo é gratuito?</summary><div class="home-faq-answer">Sim. O material foi pensado como um <strong>recurso educacional</strong> para apoiar aulas, oficinas e projetos envolvendo probabilidade.</div></details>
          <details class="home-faq-item"><summary>Para qual público o jogo é indicado?</summary><div class="home-faq-answer">Ele pode ser usado principalmente com estudantes dos anos finais do Ensino Fundamental, Ensino Médio, EJA e também em contextos de formação de professores.</div></details>
          <details class="home-faq-item"><summary>Preciso imprimir todos os materiais?</summary><div class="home-faq-answer">Para jogar a versão física, o ideal é imprimir as cartas, os dados planificados e o manual. A página de downloads reúne os arquivos necessários.</div></details>
          <details class="home-faq-item"><summary>Posso adaptar as regras para minha turma?</summary><div class="home-faq-answer">Pode. O jogo foi pensado para permitir mediação docente. O professor pode ajustar o tempo, a quantidade de rodadas e o foco da discussão matemática.</div></details>
          <details class="home-faq-item"><summary>Existe uma versão digital?</summary><div class="home-faq-answer">Sim. O site possui uma área para jogar/simular, pensada para experimentar possibilidades e apoiar o uso do jogo também no ambiente digital.</div></details>
          <details class="home-faq-item"><summary>Como posso enviar sugestões ou relatos de uso?</summary><div class="home-faq-answer">Use a página de contato para enviar mensagens, sugestões, links de materiais ou relatos de aplicação. Isso ajuda a aprimorar o projeto.</div></details>
        </div>
      </div>
    `;

    faqSection.querySelectorAll('.home-faq-item').forEach((item) => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        faqSection.querySelectorAll('.home-faq-item').forEach((otherItem) => {
          if (otherItem !== item) otherItem.open = false;
        });
      });
    });

    homeRealizacaoFooter.insertAdjacentElement('beforebegin', faqSection);
  }

  const downloadPage = document.querySelector('.download-page');
  if (downloadPage && !document.querySelector('.package-section')) {
    const packageStyle = document.createElement('style');
    packageStyle.textContent = `
      .package-section{ padding:0 0 46px; color:#150b2f; background:#fff; }
      .package-strip{ width:100%; padding:30px clamp(22px, 4vw, 42px); display:grid; grid-template-columns:minmax(0, 1fr) auto; gap:24px; align-items:center; border:1px solid rgba(168,85,247,.22); border-radius:24px; background:radial-gradient(circle at 88% 20%, rgba(168,85,247,.18), transparent 34%), linear-gradient(135deg, #fff 0%, #f7efff 100%); box-shadow:0 20px 44px rgba(35,11,80,.10); }
      .package-strip strong{ display:block; color:#150b2f; font-size:clamp(1.35rem, 2.2vw, 2rem); line-height:1.1; letter-spacing:-.035em; }
      .package-strip p{ max-width:680px; margin:8px 0 0; color:#514763; line-height:1.55; }
      .package-strip .download-btn{ min-width:210px; color:#fff; border:0; background:linear-gradient(135deg, #a855f7, #5f22c8); box-shadow:0 14px 30px rgba(95,34,200,.24); }
      @media (max-width:760px){ .package-strip{ grid-template-columns:1fr; text-align:left; } .package-strip .download-btn{ width:100%; } }
    `;
    document.head.appendChild(packageStyle);

    const filesSection = document.querySelector('.files-section');
    if (filesSection) {
      const packageSection = document.createElement('section');
      packageSection.className = 'package-section';
      packageSection.id = 'pacote-completo';
      packageSection.innerHTML = `
        <div class="page-shell">
          <div class="package-strip">
            <div>
              <strong>Baixe o pacote completo do jogo.</strong>
              <p>Acesse cartas, manual, caixa e dados em um único caminho para preparar o material com mais facilidade.</p>
            </div>
            <a class="download-btn primary" href="#" data-open-all-materials>Baixar tudo</a>
          </div>
        </div>
      `;
      filesSection.insertAdjacentElement('afterend', packageSection);
    }
  }

  const componentsSection = document.querySelector('.components-section');
  if (componentsSection) {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .dice-item{ transition:transform .22s ease, box-shadow .22s ease, border-color .22s ease, background .22s ease; will-change:transform; }
      .dice-photo, .dice-photo img{ transition:transform .22s ease, filter .22s ease, background .22s ease; }
      .dice-item:hover{ transform:translateY(-8px); border-color:rgba(139,61,241,.34); background:linear-gradient(180deg, #fff 0%, #f5edff 100%); box-shadow:0 18px 30px rgba(95,34,200,.14); }
      .dice-item:hover .dice-photo{ transform:rotate(-4deg) scale(1.05); background:rgba(168,85,247,.16); }
      .dice-item:hover .dice-photo img{ transform:translateY(-4px) rotate(7deg) scale(1.06); filter:drop-shadow(0 18px 18px rgba(95,34,200,.28)); }
    `;
    document.head.appendChild(componentStyle);
  }

  const quickRulesGrid = document.querySelector('.quick-rules .quick-grid');
  const quickRules = quickRulesGrid ? Array.from(quickRulesGrid.querySelectorAll('article')) : [];
  if (quickRulesGrid && quickRules.length >= 7) {
    const quickRulesStyle = document.createElement('style');
    quickRulesStyle.textContent = `
      .quick-rules{ padding-bottom:30px !important; }
      .quick-rules .quick-grid{ grid-template-columns:repeat(5, minmax(0, 1fr)) !important; gap:18px !important; }
      .quick-rules .quick-grid article{ position:relative; min-height:236px !important; padding:24px 18px 22px !important; border-color:rgba(168,85,247,.22) !important; border-radius:18px !important; background:radial-gradient(circle at 50% 0%, rgba(168,85,247,.10), transparent 46%), linear-gradient(180deg, #fff 0%, #fbf8ff 100%) !important; box-shadow:0 16px 34px rgba(18,9,47,.07) !important; overflow:hidden; transition:transform .22s ease, box-shadow .22s ease, border-color .22s ease; }
      .quick-rules .quick-grid article::after{ content:""; position:absolute; inset:auto -34px -40px auto; width:110px; height:110px; border:1px dashed rgba(168,85,247,.22); border-radius:50%; }
      .quick-rules .quick-grid article:hover{ transform:translateY(-6px); border-color:rgba(139,61,241,.42) !important; box-shadow:0 20px 38px rgba(95,34,200,.13) !important; }
      .quick-rules .rule-icon{ width:62px !important; height:54px !important; margin-bottom:6px !important; }
      .quick-rules .rule-number{ width:28px !important; height:28px !important; box-shadow:0 8px 16px rgba(95,34,200,.18); }
      .quick-rules .quick-grid h3{ margin:16px 0 10px !important; color:#12002f; font-size:1rem !important; line-height:1.12 !important; }
      .quick-rules .quick-grid p{ max-width:190px; margin:0 auto !important; color:#4f4567 !important; font-size:.89rem !important; line-height:1.45 !important; }
      @media (max-width: 1100px){ .quick-rules .quick-grid{ grid-template-columns:repeat(3, minmax(0, 1fr)) !important; } }
      @media (max-width: 680px){ .quick-rules .quick-grid{ grid-template-columns:1fr !important; } .quick-rules .quick-grid article{ min-height:auto !important; align-items:flex-start !important; text-align:left !important; padding:22px 24px !important; } .quick-rules .quick-grid p{ max-width:none !important; margin:0 !important; } }
    `;
    document.head.appendChild(quickRulesStyle);

    const compactRules = [
      { sourceIndex: 0, title: 'Preparação', text: 'Separe cartas numéricas, cartas de efeito e dados. Embaralhe os montes antes de começar.' },
      { sourceIndex: 1, title: 'Cartas iniciais', text: 'Cada jogador começa com 7 cartas na mão. As demais ficam nos montes de compra.' },
      { sourceIndex: 2, title: 'Objetivo', text: 'Vence quem descartar todas as cartas primeiro, usando estratégia e efeitos no momento certo.' },
      { sourceIndex: 5, title: 'Cartas de efeito', text: 'Só podem ser usadas no próprio turno e alteram a jogada, a compra ou a ação dos oponentes.' },
      { sourceIndex: 6, title: 'Fim do turno', text: 'Após descartar, usar efeito ou não conseguir jogar, a vez passa para o próximo jogador.' }
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

  const initializeAccessibilityBar = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('simulador') || document.querySelector('.accessibility-widget')) return;

    const STORAGE_KEY = 'carteadoAcessibilidade';
    const defaultState = {
      font: 0,
      contrast: false,
      reduceMotion: false,
      underlineLinks: false,
      textSpacing: false
    };

    const loadState = () => {
      try {
        return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
      } catch (error) {
        return { ...defaultState };
      }
    };

    let state = loadState();

    const accessibilityStyle = document.createElement('style');
    accessibilityStyle.id = 'accessibility-style';
    accessibilityStyle.textContent = `
      html.a11y-font-1{ font-size:106%; }
      html.a11y-font-2{ font-size:112%; }
      html.a11y-font-3{ font-size:118%; }
      html.a11y-spacing body{ letter-spacing:.04em; line-height:1.75; }
      html.a11y-underline a{ text-decoration:underline !important; text-underline-offset:.18em; }
      html.a11y-no-motion, html.a11y-no-motion *{ scroll-behavior:auto !important; }
      html.a11y-no-motion *, html.a11y-no-motion *::before, html.a11y-no-motion *::after{ animation:none !important; transition:none !important; }

      html.a11y-contrast body,
      html.a11y-contrast main,
      html.a11y-contrast section,
      html.a11y-contrast .home-faq-section,
      html.a11y-contrast .package-section,
      html.a11y-contrast .download-page,
      html.a11y-contrast .content-section,
      html.a11y-contrast .page-section{
        background:#05000d !important;
        color:#fff !important;
      }

      html.a11y-contrast p,
      html.a11y-contrast span,
      html.a11y-contrast li,
      html.a11y-contrast label,
      html.a11y-contrast small,
      html.a11y-contrast .hero-text,
      html.a11y-contrast .hero-lead,
      html.a11y-contrast .section-label,
      html.a11y-contrast .home-faq-answer,
      html.a11y-contrast .package-strip p,
      html.a11y-contrast .footer-logo-text span,
      html.a11y-contrast .footer-credit{
        color:#fff !important;
      }

      html.a11y-contrast a,
      html.a11y-contrast button,
      html.a11y-contrast h1,
      html.a11y-contrast h2,
      html.a11y-contrast h3,
      html.a11y-contrast h4,
      html.a11y-contrast strong,
      html.a11y-contrast summary{
        color:#fff !important;
      }

      html.a11y-contrast article,
      html.a11y-contrast .component-card,
      html.a11y-contrast .home-faq-item,
      html.a11y-contrast .package-strip,
      html.a11y-contrast .footer-logo-block,
      html.a11y-contrast .quick-rules .quick-grid article,
      html.a11y-contrast .step-card,
      html.a11y-contrast .file-card,
      html.a11y-contrast .download-card,
      html.a11y-contrast .contact-card,
      html.a11y-contrast .form-card,
      html.a11y-contrast .timeline-card,
      html.a11y-contrast .author-card,
      html.a11y-contrast .value-card,
      html.a11y-contrast .dice-item,
      html.a11y-contrast .effect-info,
      html.a11y-contrast .number-card,
      html.a11y-contrast .site-header-inner,
      html.a11y-contrast .mobile-panel{
        background:#12002f !important;
        color:#fff !important;
        border-color:#facc15 !important;
        box-shadow:0 0 0 2px rgba(250,204,21,.45), 0 18px 38px rgba(0,0,0,.35) !important;
      }

      html.a11y-contrast input,
      html.a11y-contrast textarea,
      html.a11y-contrast select{
        background:#05000d !important;
        color:#fff !important;
        border-color:#facc15 !important;
      }

      html.a11y-contrast input::placeholder,
      html.a11y-contrast textarea::placeholder{ color:#e7d7ff !important; }

      html.a11y-contrast .accessibility-widget{ color:#12002f !important; }
      html.a11y-contrast .accessibility-toggle{
        color:#05000d !important;
        background:#facc15 !important;
        box-shadow:0 18px 34px rgba(0,0,0,.45), 0 0 0 6px rgba(255,255,255,.98) !important;
      }
      html.a11y-contrast .accessibility-panel{
        background:#fff !important;
        color:#12002f !important;
        border:3px solid #facc15 !important;
        box-shadow:0 24px 60px rgba(0,0,0,.55) !important;
      }
      html.a11y-contrast .accessibility-panel h2,
      html.a11y-contrast .accessibility-panel p,
      html.a11y-contrast .accessibility-panel span,
      html.a11y-contrast .accessibility-status,
      html.a11y-contrast .font-range-label,
      html.a11y-contrast .font-range-value{
        color:#12002f !important;
      }
      html.a11y-contrast .accessibility-action{
        background:#12002f !important;
        color:#fff !important;
        border-color:#facc15 !important;
      }
      html.a11y-contrast .accessibility-action[aria-pressed="true"]{
        background:#facc15 !important;
        color:#12002f !important;
      }
      html.a11y-contrast .font-range{
        accent-color:#5f22c8;
      }

      html.a11y-contrast a:focus-visible,
      html.a11y-contrast button:focus-visible,
      html.a11y-contrast input:focus-visible,
      html.a11y-contrast textarea:focus-visible,
      html.a11y-contrast [tabindex]:focus-visible{
        outline:4px solid #facc15 !important;
        outline-offset:4px !important;
      }

      .accessibility-widget{ position:fixed; left:22px; bottom:22px; z-index:1200; font-family:inherit; }
      .accessibility-toggle{ width:58px; height:58px; border:0; border-radius:50%; display:grid; place-items:center; color:#fff; font-size:1.55rem; font-weight:950; cursor:pointer; background:linear-gradient(135deg, #a855f7, #5f22c8); box-shadow:0 18px 34px rgba(35,11,80,.30), 0 0 0 6px rgba(255,255,255,.82); transition:transform .2s ease, box-shadow .2s ease; }
      .accessibility-toggle:hover{ transform:translateY(-3px); box-shadow:0 22px 38px rgba(35,11,80,.34), 0 0 0 6px rgba(255,255,255,.94); }
      .accessibility-toggle:focus-visible{ outline:4px solid rgba(168,85,247,.42); outline-offset:8px; }
      .accessibility-panel{ position:absolute; left:0; bottom:74px; width:min(350px, calc(100vw - 28px)); padding:18px; border:1px solid rgba(168,85,247,.26); border-radius:24px; background:rgba(255,255,255,.96); color:#160337; box-shadow:0 24px 60px rgba(35,11,80,.25); backdrop-filter:blur(14px); }
      .accessibility-panel[hidden]{ display:none; }
      .accessibility-panel h2{ margin:0; color:#160337; font-size:1.08rem; line-height:1.2; }
      .accessibility-panel p{ margin:6px 0 14px; color:#594a72; font-size:.88rem; line-height:1.45; }
      .font-control{ grid-column:1 / -1; padding:12px; border:1px solid rgba(168,85,247,.18); border-radius:16px; background:linear-gradient(180deg, #fff, #fbf7ff); }
      .font-control-top{ display:flex; justify-content:space-between; gap:12px; align-items:center; margin-bottom:10px; }
      .font-range-label{ color:#2b0b63; font-weight:900; font-size:.92rem; }
      .font-range-value{ color:#5f22c8; font-weight:950; font-size:.84rem; }
      .font-range{ width:100%; accent-color:#8b3df1; cursor:pointer; }
      .accessibility-actions{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      .accessibility-action{ min-height:46px; padding:10px 12px; border:1px solid rgba(168,85,247,.22); border-radius:14px; color:#2b0b63; font-weight:850; text-align:left; cursor:pointer; background:linear-gradient(180deg, #fff, #f8f2ff); box-shadow:0 10px 18px rgba(35,11,80,.06); transition:transform .18s ease, border-color .18s ease, box-shadow .18s ease; }
      .accessibility-action:hover{ transform:translateY(-2px); border-color:rgba(139,61,241,.48); box-shadow:0 14px 24px rgba(95,34,200,.12); }
      .accessibility-action[aria-pressed="true"]{ color:#fff; border-color:transparent; background:linear-gradient(135deg, #8b3df1, #5f22c8); }
      .accessibility-action.full{ grid-column:1 / -1; text-align:center; justify-content:center; }
      .accessibility-status{ margin-top:12px; color:#5f22c8; font-size:.82rem; font-weight:800; }
      @media (max-width:680px){ .accessibility-widget{ left:14px; bottom:14px; } .accessibility-toggle{ width:52px; height:52px; font-size:1.35rem; } .accessibility-panel{ bottom:66px; padding:16px; } .accessibility-actions{ grid-template-columns:1fr; } }
    `;
    document.head.appendChild(accessibilityStyle);

    const widget = document.createElement('aside');
    widget.className = 'accessibility-widget';
    widget.setAttribute('aria-label', 'Ferramentas de acessibilidade');
    widget.innerHTML = `
      <button class="accessibility-toggle" type="button" aria-label="Abrir ferramentas de acessibilidade" aria-expanded="false" aria-controls="accessibility-panel">A</button>
      <div class="accessibility-panel" id="accessibility-panel" hidden>
        <h2>Acessibilidade</h2>
        <p>Ajuste a leitura e a navegação do site.</p>
        <div class="accessibility-actions">
          <div class="font-control">
            <div class="font-control-top">
              <span class="font-range-label">Tamanho da fonte</span>
              <span class="font-range-value">Padrão</span>
            </div>
            <input class="font-range" type="range" min="0" max="3" step="1" value="0" aria-label="Variar tamanho da fonte">
          </div>
          <button class="accessibility-action" type="button" data-a11y="contrast" aria-pressed="false">Alto contraste</button>
          <button class="accessibility-action" type="button" data-a11y="motion" aria-pressed="false">Pausar animações</button>
          <button class="accessibility-action" type="button" data-a11y="underline" aria-pressed="false">Sublinhar links</button>
          <button class="accessibility-action" type="button" data-a11y="spacing" aria-pressed="false">Espaçamento maior</button>
          <button class="accessibility-action full" type="button" data-a11y="reset">Voltar ao padrão</button>
        </div>
        <div class="accessibility-status" aria-live="polite">Configurações padrão.</div>
      </div>
    `;
    document.body.appendChild(widget);

    const toggle = widget.querySelector('.accessibility-toggle');
    const panel = widget.querySelector('.accessibility-panel');
    const status = widget.querySelector('.accessibility-status');
    const fontRange = widget.querySelector('.font-range');
    const fontRangeValue = widget.querySelector('.font-range-value');

    const updateFontLabel = () => {
      if (!fontRange || !fontRangeValue) return;
      fontRange.value = String(state.font);
      fontRangeValue.textContent = state.font === 0 ? 'Padrão' : `+${state.font}`;
    };

    const applyState = (message) => {
      document.documentElement.classList.remove('a11y-font-1', 'a11y-font-2', 'a11y-font-3');
      if (state.font > 0) document.documentElement.classList.add(`a11y-font-${state.font}`);
      document.documentElement.classList.toggle('a11y-contrast', state.contrast);
      document.documentElement.classList.toggle('a11y-no-motion', state.reduceMotion);
      document.documentElement.classList.toggle('a11y-underline', state.underlineLinks);
      document.documentElement.classList.toggle('a11y-spacing', state.textSpacing);

      widget.querySelector('[data-a11y="contrast"]').setAttribute('aria-pressed', String(state.contrast));
      widget.querySelector('[data-a11y="motion"]').setAttribute('aria-pressed', String(state.reduceMotion));
      widget.querySelector('[data-a11y="underline"]').setAttribute('aria-pressed', String(state.underlineLinks));
      widget.querySelector('[data-a11y="spacing"]').setAttribute('aria-pressed', String(state.textSpacing));
      updateFontLabel();

      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      if (status) status.textContent = message || `Fonte ${state.font === 0 ? 'padrão' : '+' + state.font}.`;
    };

    toggle.addEventListener('click', () => {
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      toggle.setAttribute('aria-expanded', String(willOpen));
    });

    if (fontRange) {
      fontRange.addEventListener('input', () => {
        state.font = Number(fontRange.value);
        applyState(state.font === 0 ? 'Fonte padrão.' : `Fonte ajustada para +${state.font}.`);
      });
    }

    widget.addEventListener('click', (event) => {
      const action = event.target.closest('[data-a11y]');
      if (!action) return;
      const type = action.dataset.a11y;

      if (type === 'contrast') {
        state.contrast = !state.contrast;
        applyState(state.contrast ? 'Alto contraste ativado.' : 'Alto contraste desativado.');
      }
      if (type === 'motion') {
        state.reduceMotion = !state.reduceMotion;
        applyState(state.reduceMotion ? 'Animações pausadas.' : 'Animações reativadas.');
      }
      if (type === 'underline') {
        state.underlineLinks = !state.underlineLinks;
        applyState(state.underlineLinks ? 'Links sublinhados.' : 'Sublinhado removido.');
      }
      if (type === 'spacing') {
        state.textSpacing = !state.textSpacing;
        applyState(state.textSpacing ? 'Espaçamento ampliado.' : 'Espaçamento padrão.');
      }
      if (type === 'reset') {
        state = { ...defaultState };
        applyState('Configurações restauradas.');
      }
    });

    document.addEventListener('click', (event) => {
      if (!panel.hidden && !widget.contains(event.target)) {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !panel.hidden) {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    applyState();
  };

  initializeAccessibilityBar();

  const animateItems = document.querySelectorAll('.js-animate-on-scroll');
  if (animateItems.length) {
    const firstItem = animateItems[0];
    if (firstItem) firstItem.classList.add('is-visible');

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
      if (!item.classList.contains('is-visible')) observer.observe(item);
    });
  }
});
