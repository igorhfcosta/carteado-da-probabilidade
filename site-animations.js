(() => {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('simulador')) return;
  if (!document.querySelector('link[href^="i18n.css"]')) {
    const i18nCss = document.createElement('link');
    i18nCss.rel = 'stylesheet';
    i18nCss.href = 'i18n.css?v=20260622-idiomas3';
    document.head.appendChild(i18nCss);
  }

  const loadI18n = () => {
    if (!document.querySelector('script[src^="i18n.js"]')) {
      const i18nScript = document.createElement('script');
      i18nScript.src = 'i18n.js?v=20260622-idiomas3';
      i18nScript.async = false;
      document.head.appendChild(i18nScript);
    }
  };

  if (!document.querySelector('script[src^="i18n-whitespace-patch.js"]')) {
    const patchScript = document.createElement('script');
    patchScript.src = 'i18n-whitespace-patch.js?v=20260622-idiomas3';
    patchScript.async = false;
    patchScript.onload = loadI18n;
    patchScript.onerror = loadI18n;
    document.head.appendChild(patchScript);
  } else {
    loadI18n();
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-enabled');

  const MATERIAL_LINKS = [
    'https://drive.google.com/drive/folders/1-mFXXFyECQVbNoklxSwOKxRK1ZJIeuex?usp=sharing',
    'https://drive.google.com/drive/folders/1ejZo6c3CLSsN3bzOSmZ9oI8IRMjX7PJU?usp=sharing',
    'https://drive.google.com/drive/folders/1k-2uPY4gMdtZBwX31OE3FDmcndl1MD2s?usp=drive_link',
    'https://drive.google.com/drive/folders/17w4_b_AV8Mmw2rY_1SPoJJ5eeD7yzB3w?usp=sharing'
  ];

  const upsertMeta = (selector, attributes) => {
    let meta = document.head.querySelector(selector);
    if (!meta) { meta = document.createElement('meta'); document.head.appendChild(meta); }
    Object.entries(attributes).forEach(([key, value]) => meta.setAttribute(key, value));
  };
  const upsertLink = (selector, attributes) => {
    let link = document.head.querySelector(selector);
    if (!link) { link = document.createElement('link'); document.head.appendChild(link); }
    Object.entries(attributes).forEach(([key, value]) => link.setAttribute(key, value));
  };
  const PROJECT_TITLE = 'Carteado da Probabilidade';
  const PROJECT_DESCRIPTION = 'Jogo educativo com cartas e dados para aprender probabilidade por meio de estratégia, análise de possibilidades e tomada de decisão.';
  const PROJECT_IMAGE = new URL('logo/logo.png', window.location.href).href;
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

  const backToTop = document.getElementById('backToTop');
  const progress = document.querySelector('.progress-bar');
  if (backToTop && progress) {
    const circumference = 2 * Math.PI * 18;
    const updateBackToTopState = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      progress.style.strokeDashoffset = circumference - scrollPercent * circumference;
      backToTop.classList.toggle('show', scrollTop > 200);
      const footer = document.querySelector('.home-footer.realizacao-footer, .site-footer');
      if (!footer) return backToTop.classList.remove('on-footer');
      const buttonRect = backToTop.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      backToTop.classList.toggle('on-footer', buttonRect.bottom >= footerRect.top && buttonRect.top <= footerRect.bottom && buttonRect.right >= footerRect.left && buttonRect.left <= footerRect.right);
    };
    updateBackToTopState();
    window.addEventListener('scroll', updateBackToTopState, { passive: true });
    window.addEventListener('resize', updateBackToTopState);
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
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
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openTarget(); }
    });
  });

  const homePage = document.querySelector('.home-page');
  const homeRealizacaoFooter = document.querySelector('.home-footer.realizacao-footer');
  if (homeRealizacaoFooter) homeRealizacaoFooter.querySelectorAll('.footer-dice, .footer-card').forEach((item) => item.remove());

  document.addEventListener('click', (event) => {
    const openAllButton = event.target.closest('[data-open-all-materials]');
    if (!openAllButton) return;
    event.preventDefault();
    MATERIAL_LINKS.forEach((link, index) => window.setTimeout(() => window.open(link, '_blank', 'noopener,noreferrer'), index * 120));
  });

  if (homePage) {
    const style = document.createElement('style');
    style.textContent = `
      .hero-card{ animation:homeCardFloat 5.8s ease-in-out infinite; will-change:transform; }
      .hero-card.card-b{ animation-delay:.35s; }
      .hero-card.card-c{ animation-delay:.7s; }
      .hero-die{ animation:homeDiceFloat 4.8s ease-in-out infinite; will-change:transform; }
      .hero-die.die-white{ animation-delay:.45s; }
      .hero:hover .hero-card, .hero:hover .hero-die{ animation-play-state:paused; }
      @keyframes homeCardFloat{ 0%,100%{ translate:0 0; } 50%{ translate:0 -12px; } }
      @keyframes homeDiceFloat{ 0%,100%{ translate:0 0; } 50%{ translate:0 -10px; } }
    `;
    document.head.appendChild(style);
  }

  if (homePage && homeRealizacaoFooter && !document.querySelector('.home-faq-section')) {
    const faqStyle = document.createElement('style');
    faqStyle.textContent = `
      .home-faq-section{ position:relative; width:100%; max-width:none; padding:64px max(22px, calc((100vw - 1180px) / 2)) 70px; background:#fff; border-top:0; overflow:hidden; }
      .home-faq-inner{ position:relative; z-index:1; width:min(1180px, 100%); margin:0 auto; display:grid; grid-template-columns:minmax(260px,.82fr) minmax(0,1.18fr); gap:42px; align-items:start; }
      .home-faq-copy .section-label{ color:var(--purple-700); }
      .home-faq-copy h2{ color:var(--ink); font-size:clamp(2rem,3.4vw,3.25rem); line-height:1.06; letter-spacing:-.045em; }
      .home-faq-copy h2 span{ color:var(--purple-600); }
      .home-faq-copy p{ max-width:420px; margin-top:16px; color:var(--muted); font-size:1rem; }
      .home-faq-badge{ width:78px; height:78px; margin-top:26px; display:grid; place-items:center; border-radius:24px; color:#fff; font-size:2rem; font-weight:950; background:linear-gradient(135deg,#a855f7,#5f22c8); box-shadow:0 18px 34px rgba(95,34,200,.22); transform:rotate(-5deg); }
      .home-faq-list{ display:grid; gap:14px; }
      .home-faq-item{ position:relative; border:1px solid rgba(168,85,247,.22); border-radius:18px; background:rgba(255,255,255,.92); box-shadow:0 14px 30px rgba(35,11,80,.08); overflow:hidden; transition:transform .22s ease, box-shadow .22s ease, border-color .22s ease, background .22s ease; }
      .home-faq-item:hover{ transform:translateY(-3px); border-color:rgba(139,61,241,.42); box-shadow:0 20px 38px rgba(95,34,200,.13); }
      .home-faq-item[open]{ border-color:rgba(139,61,241,.52); background:linear-gradient(180deg,#fff 0%,#f8f2ff 100%); }
      .home-faq-item summary{ list-style:none; min-height:68px; display:flex; align-items:center; justify-content:space-between; gap:18px; padding:18px 22px; color:var(--ink); font-size:1rem; font-weight:900; cursor:pointer; }
      .home-faq-item summary::-webkit-details-marker{ display:none; }
      .home-faq-item summary::after{ content:"+"; width:34px; height:34px; flex:0 0 34px; display:grid; place-items:center; border-radius:50%; color:#fff; font-size:1.35rem; line-height:1; background:linear-gradient(135deg,#a855f7,#5f22c8); box-shadow:0 10px 18px rgba(95,34,200,.18); transition:transform .2s ease; }
      .home-faq-item[open] summary::after{ content:"−"; transform:rotate(180deg); }
      .home-faq-answer{ padding:0 22px 22px; color:var(--muted); font-size:.96rem; line-height:1.65; }
      .home-faq-answer strong{ color:var(--purple-700); }
      @media(max-width:980px){ .home-faq-inner{ grid-template-columns:1fr; gap:28px; } .home-faq-copy p{ max-width:680px; } }
      @media(max-width:680px){ .home-faq-section{ padding:52px 18px 56px; } .home-faq-badge{ width:62px; height:62px; border-radius:18px; font-size:1.55rem; } .home-faq-item summary{ align-items:flex-start; min-height:auto; padding:16px; font-size:.95rem; } .home-faq-answer{ padding:0 16px 18px; font-size:.9rem; } }
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
        faqSection.querySelectorAll('.home-faq-item').forEach((otherItem) => { if (otherItem !== item) otherItem.open = false; });
      });
    });
    homeRealizacaoFooter.insertAdjacentElement('beforebegin', faqSection);
  }

  const downloadPage = document.querySelector('.download-page');
  if (downloadPage && !document.querySelector('.package-section')) {
    const packageStyle = document.createElement('style');
    packageStyle.textContent = `
      .package-section{ padding:0 0 46px; color:#150b2f; background:#fff; }
      .package-strip{ width:100%; padding:30px clamp(22px,4vw,42px); display:grid; grid-template-columns:minmax(0,1fr) auto; gap:24px; align-items:center; border:1px solid rgba(168,85,247,.22); border-radius:24px; background:radial-gradient(circle at 88% 20%, rgba(168,85,247,.18), transparent 34%), linear-gradient(135deg,#fff 0%,#f7efff 100%); box-shadow:0 20px 44px rgba(35,11,80,.10); }
      .package-strip strong{ display:block; color:#150b2f; font-size:clamp(1.35rem,2.2vw,2rem); line-height:1.1; letter-spacing:-.035em; }
      .package-strip p{ max-width:680px; margin:8px 0 0; color:#514763; line-height:1.55; }
      .package-strip .download-btn{ min-width:210px; color:#fff; border:0; background:linear-gradient(135deg,#a855f7,#5f22c8); box-shadow:0 14px 30px rgba(95,34,200,.24); }
      @media(max-width:760px){ .package-strip{ grid-template-columns:1fr; text-align:left; } .package-strip .download-btn{ width:100%; } }
    `;
    document.head.appendChild(packageStyle);
    const filesSection = document.querySelector('.files-section');
    if (filesSection) {
      const packageSection = document.createElement('section');
      packageSection.className = 'package-section';
      packageSection.id = 'pacote-completo';
      packageSection.innerHTML = `<div class="page-shell"><div class="package-strip"><div><strong>Baixe o pacote completo do jogo.</strong><p>Acesse cartas, manual, caixa e dados em um único caminho para preparar o material com mais facilidade.</p></div><a class="download-btn primary" href="#" data-open-all-materials>Baixar tudo</a></div></div>`;
      filesSection.insertAdjacentElement('afterend', packageSection);
    }
  }

  if (document.querySelector('.components-section')) {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `.dice-item{ transition:transform .22s ease, box-shadow .22s ease, border-color .22s ease, background .22s ease; will-change:transform; } .dice-photo, .dice-photo img{ transition:transform .22s ease, filter .22s ease, background .22s ease; } .dice-item:hover{ transform:translateY(-8px); border-color:rgba(139,61,241,.34); background:linear-gradient(180deg,#fff 0%,#f5edff 100%); box-shadow:0 18px 30px rgba(95,34,200,.14); } .dice-item:hover .dice-photo{ transform:rotate(-4deg) scale(1.05); background:rgba(168,85,247,.16); } .dice-item:hover .dice-photo img{ transform:translateY(-4px) rotate(7deg) scale(1.06); filter:drop-shadow(0 18px 18px rgba(95,34,200,.28)); }`;
    document.head.appendChild(componentStyle);
  }

  const quickRulesGrid = document.querySelector('.quick-rules .quick-grid');
  const quickRules = quickRulesGrid ? Array.from(quickRulesGrid.querySelectorAll('article')) : [];
  if (quickRulesGrid && quickRules.length >= 7) {
    const quickRulesStyle = document.createElement('style');
    quickRulesStyle.textContent = `
      .quick-rules{ padding-bottom:30px !important; }
      .quick-rules .quick-grid{ grid-template-columns:repeat(5,minmax(0,1fr)) !important; gap:18px !important; }
      .quick-rules .quick-grid article{ position:relative; min-height:236px !important; padding:24px 18px 22px !important; border-color:rgba(168,85,247,.22) !important; border-radius:18px !important; background:radial-gradient(circle at 50% 0%, rgba(168,85,247,.10), transparent 46%), linear-gradient(180deg,#fff 0%,#fbf8ff 100%) !important; box-shadow:0 16px 34px rgba(18,9,47,.07) !important; overflow:hidden; transition:transform .22s ease, box-shadow .22s ease, border-color .22s ease; }
      .quick-rules .quick-grid article::after{ content:""; position:absolute; inset:auto -34px -40px auto; width:110px; height:110px; border:1px dashed rgba(168,85,247,.22); border-radius:50%; }
      .quick-rules .quick-grid article:hover{ transform:translateY(-6px); border-color:rgba(139,61,241,.42) !important; box-shadow:0 20px 38px rgba(95,34,200,.13) !important; }
      .quick-rules .rule-icon{ width:62px !important; height:54px !important; margin-bottom:6px !important; }
      .quick-rules .rule-number{ width:28px !important; height:28px !important; box-shadow:0 8px 16px rgba(95,34,200,.18); }
      .quick-rules .quick-grid h3{ margin:16px 0 10px !important; color:#12002f; font-size:1rem !important; line-height:1.12 !important; }
      .quick-rules .quick-grid p{ max-width:190px; margin:0 auto !important; color:#4f4567 !important; font-size:.89rem !important; line-height:1.45 !important; }
      @media(max-width:1100px){ .quick-rules .quick-grid{ grid-template-columns:repeat(3,minmax(0,1fr)) !important; } }
      @media(max-width:680px){ .quick-rules .quick-grid{ grid-template-columns:1fr !important; } .quick-rules .quick-grid article{ min-height:auto !important; align-items:flex-start !important; text-align:left !important; padding:22px 24px !important; } .quick-rules .quick-grid p{ max-width:none !important; margin:0 !important; } }
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
      const rule = (quickRules[content.sourceIndex] || quickRules[index]).cloneNode(true);
      rule.querySelector('.rule-number').textContent = String(index + 1);
      rule.querySelector('h3').textContent = content.title;
      rule.querySelector('p').textContent = content.text;
      quickRulesGrid.appendChild(rule);
    });
  }

  const initializeAccessibilityBar = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('simulador') || document.querySelector('.accessibility-widget')) return;
    const STORAGE_KEY = 'carteadoAcessibilidade';
    const defaultState = { font: 0, contrast: false, reduceMotion: false, underlineLinks: false, textSpacing: false };
    const loadState = () => { try { return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }; } catch { return { ...defaultState }; } };
    let state = loadState();
    const accessibilityStyle = document.createElement('style');
    accessibilityStyle.id = 'accessibility-style';
    accessibilityStyle.textContent = `
      html.a11y-font-1{ font-size:106%; } html.a11y-font-2{ font-size:112%; } html.a11y-font-3{ font-size:118%; }
      html.a11y-spacing body{ letter-spacing:.04em; line-height:1.78; }
      html.a11y-underline a{ text-decoration:underline !important; text-underline-offset:.18em; }
      html.a11y-no-motion, html.a11y-no-motion *{ scroll-behavior:auto !important; }
      html.a11y-no-motion *, html.a11y-no-motion *::before, html.a11y-no-motion *::after{ animation:none !important; transition:none !important; }
      html.a11y-contrast, html.a11y-contrast body, html.a11y-contrast main, html.a11y-contrast section, html.a11y-contrast header, html.a11y-contrast footer{ background:#05000d !important; color:#fff !important; }
      html.a11y-contrast *{ text-shadow:none !important; }
      html.a11y-contrast h1, html.a11y-contrast h2, html.a11y-contrast h3, html.a11y-contrast h4, html.a11y-contrast p, html.a11y-contrast span, html.a11y-contrast li, html.a11y-contrast label, html.a11y-contrast small, html.a11y-contrast strong{ color:#fff !important; }
      html.a11y-contrast a{ color:#ffd400 !important; }
      html.a11y-contrast .download-btn, html.a11y-contrast .btn, html.a11y-contrast button:not(.accessibility-toggle):not(.language-toggle){ border:2px solid #ffd400 !important; color:#000 !important; background:#ffd400 !important; }
      html.a11y-contrast article, html.a11y-contrast .card, html.a11y-contrast .feature-card, html.a11y-contrast .explore-card, html.a11y-contrast .quick-grid article, html.a11y-contrast .turn-grid article, html.a11y-contrast .dice-item, html.a11y-contrast .package-strip, html.a11y-contrast .home-faq-item, html.a11y-contrast .contact-card, html.a11y-contrast .timeline-card, html.a11y-contrast .info-card{ background:#12002f !important; border-color:#ffd400 !important; color:#fff !important; box-shadow:none !important; }
      html.a11y-contrast input, html.a11y-contrast textarea, html.a11y-contrast select{ background:#fff !important; color:#000 !important; border:2px solid #ffd400 !important; }
      .accessibility-widget{ position:fixed; right:0; top:50%; z-index:9998; transform:translateY(0); font-family:inherit; }
      .accessibility-toggle{ width:50px; min-height:46px; display:grid; place-items:center; border:2px solid rgba(255,255,255,.78); border-right:0; border-radius:18px 0 0 18px; color:#12002f; background:#ffd400; box-shadow:0 14px 28px rgba(35,11,80,.24); cursor:pointer; transition:transform .22s ease, box-shadow .22s ease; }
      .accessibility-toggle:hover, .accessibility-toggle:focus-visible{ transform:translateX(-4px); outline:3px solid rgba(255,212,0,.32); outline-offset:3px; }
      .a11y-icon{ width:24px; height:24px; stroke:currentColor; }
      .accessibility-panel{ position:absolute; right:60px; top:50%; width:min(330px, calc(100vw - 84px)); padding:16px; border:1px solid rgba(168,85,247,.24); border-radius:22px; background:rgba(255,255,255,.97); color:#170036; box-shadow:0 22px 48px rgba(18,0,47,.22); transform:translateY(-50%); backdrop-filter:blur(16px); }
      .accessibility-panel[hidden]{ display:none; }
      .accessibility-panel h2{ margin:0; font-size:1.18rem; color:#170036; }
      .accessibility-panel p{ margin:6px 0 14px; color:#5b4a75; font-size:.92rem; }
      .accessibility-actions{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      .accessibility-action, .font-control{ min-height:58px; padding:12px; border:1px solid rgba(168,85,247,.22); border-radius:14px; color:#25104c; background:linear-gradient(180deg,#fff,#fbf7ff); font:inherit; font-weight:900; text-align:left; cursor:pointer; }
      .accessibility-action[aria-pressed="true"]{ color:#fff; border-color:transparent; background:linear-gradient(135deg,#a855f7,#5f22c8); }
      .accessibility-action.full, .font-control{ grid-column:1/-1; }
      .font-control{ cursor:default; }
      .font-control-top{ display:flex; justify-content:space-between; gap:12px; margin-bottom:10px; color:#25104c; font-weight:950; }
      .font-range{ width:100%; accent-color:#8b3df1; }
      .accessibility-status{ grid-column:1/-1; color:#5f22c8; font-weight:850; font-size:.9rem; }
      html.a11y-contrast .accessibility-panel, html.a11y-contrast .accessibility-panel *{ color:#fff !important; background:#05000d !important; }
      html.a11y-contrast .accessibility-action, html.a11y-contrast .font-control{ border-color:#ffd400 !important; }
      @media(max-width:680px){ .accessibility-widget{ top:auto; bottom:38px; transform:none; } .accessibility-panel{ top:auto; bottom:0; transform:none; } }
    `;
    document.head.appendChild(accessibilityStyle);
    const widget = document.createElement('div');
    widget.className = 'accessibility-widget';
    widget.innerHTML = `<button class="accessibility-toggle" type="button" aria-label="Acessibilidade" aria-expanded="false" aria-controls="accessibility-panel"><svg class="a11y-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.2a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Z" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.2 10.2h13.6M12 10.4v9.4M8.2 20l1.15-5.1M15.8 20l-1.15-5.1" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div class="accessibility-panel" id="accessibility-panel" hidden><h2>Acessibilidade</h2><p>Ajuste a leitura e a navegação do site.</p><div class="accessibility-actions"><div class="font-control"><div class="font-control-top"><span class="font-range-label">Tamanho da fonte</span><span class="font-range-value">Padrão</span></div><input class="font-range" type="range" min="0" max="3" step="1" value="0" aria-label="Variar tamanho da fonte"></div><button class="accessibility-action" type="button" data-a11y="contrast" aria-pressed="false">Alto contraste</button><button class="accessibility-action" type="button" data-a11y="motion" aria-pressed="false">Pausar animações</button><button class="accessibility-action" type="button" data-a11y="underline" aria-pressed="false">Sublinhar links</button><button class="accessibility-action" type="button" data-a11y="spacing" aria-pressed="false">Espaçamento maior</button><button class="accessibility-action full" type="button" data-a11y="reset">Voltar ao padrão</button><div class="accessibility-status" aria-live="polite">Configurações padrão.</div></div></div>`;
    document.body.appendChild(widget);
    const toggle = widget.querySelector('.accessibility-toggle');
    const panel = widget.querySelector('.accessibility-panel');
    const status = widget.querySelector('.accessibility-status');
    const fontRange = widget.querySelector('.font-range');
    const fontRangeValue = widget.querySelector('.font-range-value');
    const updateFontLabel = () => { fontRange.value = String(state.font); fontRangeValue.textContent = state.font === 0 ? 'Padrão' : `+${state.font}`; };
    const applyState = (message) => {
      document.documentElement.classList.remove('a11y-font-1','a11y-font-2','a11y-font-3');
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
    toggle.addEventListener('click', () => { const willOpen = panel.hidden; panel.hidden = !willOpen; toggle.setAttribute('aria-expanded', String(willOpen)); });
    fontRange.addEventListener('input', () => { state.font = Number(fontRange.value); applyState(state.font === 0 ? 'Fonte padrão.' : `Fonte ajustada para +${state.font}.`); });
    widget.addEventListener('click', (event) => {
      const action = event.target.closest('[data-a11y]');
      if (!action) return;
      const type = action.dataset.a11y;
      if (type === 'contrast') state.contrast = !state.contrast;
      if (type === 'motion') state.reduceMotion = !state.reduceMotion;
      if (type === 'underline') state.underlineLinks = !state.underlineLinks;
      if (type === 'spacing') state.textSpacing = !state.textSpacing;
      if (type === 'reset') state = { ...defaultState };
      const messages = { contrast: state.contrast ? 'Alto contraste ativado.' : 'Alto contraste desativado.', motion: state.reduceMotion ? 'Animações pausadas.' : 'Animações reativadas.', underline: state.underlineLinks ? 'Links sublinhados.' : 'Sublinhado removido.', spacing: state.textSpacing ? 'Espaçamento ampliado.' : 'Espaçamento padrão.', reset: 'Configurações restauradas.' };
      applyState(messages[type]);
    });
    document.addEventListener('click', (event) => { if (panel.hidden || widget.contains(event.target)) return; panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); });
    document.addEventListener('keydown', (event) => { if (event.key !== 'Escape' || panel.hidden) return; panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); });
    applyState('Configurações carregadas.');
  };
  initializeAccessibilityBar();
});