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

  const homePage = document.querySelector('.home-page');

  if (homePage && homeRealizacaoFooter && !document.querySelector('.home-faq-section')) {
    const faqStyle = document.createElement('style');
    faqStyle.textContent = `
      .home-faq-section{
        position:relative;
        width:100%;
        max-width:none;
        padding:72px max(22px, calc((100vw - 1180px) / 2)) 76px;
        background:
          radial-gradient(circle at 12% 18%, rgba(168,85,247,.14), transparent 26%),
          radial-gradient(circle at 88% 76%, rgba(139,61,241,.16), transparent 28%),
          linear-gradient(180deg, #fff 0%, #fbf8ff 100%);
        overflow:hidden;
      }

      .home-faq-section::before,
      .home-faq-section::after{
        content:"";
        position:absolute;
        width:280px;
        height:96px;
        border:2px dashed rgba(168,85,247,.18);
        border-radius:50%;
        pointer-events:none;
      }

      .home-faq-section::before{ left:-96px; top:72px; transform:rotate(18deg); }
      .home-faq-section::after{ right:-82px; bottom:62px; transform:rotate(-14deg); }

      .home-faq-inner{
        position:relative;
        z-index:1;
        width:min(1180px, 100%);
        margin:0 auto;
        display:grid;
        grid-template-columns:minmax(260px, .82fr) minmax(0, 1.18fr);
        gap:42px;
        align-items:start;
      }

      .home-faq-copy .section-label{
        color:var(--purple-700);
      }

      .home-faq-copy h2{
        color:var(--ink);
        font-size:clamp(2rem, 3.4vw, 3.25rem);
        line-height:1.06;
        letter-spacing:-.045em;
      }

      .home-faq-copy h2 span{
        color:var(--purple-600);
      }

      .home-faq-copy p{
        max-width:420px;
        margin-top:16px;
        color:var(--muted);
        font-size:1rem;
      }

      .home-faq-badge{
        width:78px;
        height:78px;
        margin-top:26px;
        display:grid;
        place-items:center;
        border-radius:24px;
        color:#fff;
        font-size:2rem;
        font-weight:950;
        background:linear-gradient(135deg, #a855f7, #5f22c8);
        box-shadow:0 18px 34px rgba(95,34,200,.22);
        transform:rotate(-5deg);
      }

      .home-faq-list{
        display:grid;
        gap:14px;
      }

      .home-faq-item{
        position:relative;
        border:1px solid rgba(168,85,247,.22);
        border-radius:18px;
        background:rgba(255,255,255,.86);
        box-shadow:0 14px 30px rgba(35,11,80,.08);
        overflow:hidden;
        transition:transform .22s ease, box-shadow .22s ease, border-color .22s ease, background .22s ease;
      }

      .home-faq-item:hover{
        transform:translateY(-3px);
        border-color:rgba(139,61,241,.42);
        box-shadow:0 20px 38px rgba(95,34,200,.13);
      }

      .home-faq-item[open]{
        border-color:rgba(139,61,241,.52);
        background:linear-gradient(180deg, #fff 0%, #f6efff 100%);
      }

      .home-faq-item summary{
        list-style:none;
        min-height:68px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:18px;
        padding:18px 22px;
        color:var(--ink);
        font-size:1rem;
        font-weight:900;
        cursor:pointer;
      }

      .home-faq-item summary::-webkit-details-marker{ display:none; }

      .home-faq-item summary::after{
        content:"+";
        width:34px;
        height:34px;
        flex:0 0 34px;
        display:grid;
        place-items:center;
        border-radius:50%;
        color:#fff;
        font-size:1.35rem;
        line-height:1;
        background:linear-gradient(135deg, #a855f7, #5f22c8);
        box-shadow:0 10px 18px rgba(95,34,200,.18);
        transition:transform .2s ease;
      }

      .home-faq-item[open] summary::after{
        content:"−";
        transform:rotate(180deg);
      }

      .home-faq-answer{
        padding:0 22px 22px;
        color:var(--muted);
        font-size:.96rem;
        line-height:1.65;
      }

      .home-faq-answer strong{
        color:var(--purple-700);
      }

      @media (max-width: 980px){
        .home-faq-inner{
          grid-template-columns:1fr;
          gap:28px;
        }

        .home-faq-copy p{
          max-width:680px;
        }
      }

      @media (max-width: 680px){
        .home-faq-section{
          padding:52px 18px 56px;
        }

        .home-faq-badge{
          width:62px;
          height:62px;
          border-radius:18px;
          font-size:1.55rem;
        }

        .home-faq-item summary{
          align-items:flex-start;
          min-height:auto;
          padding:16px 16px;
          font-size:.95rem;
        }

        .home-faq-answer{
          padding:0 16px 18px;
          font-size:.9rem;
        }
      }
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
          <details class="home-faq-item" open>
            <summary>O jogo é gratuito?</summary>
            <div class="home-faq-answer">Sim. O material foi pensado como um <strong>recurso educacional</strong> para apoiar aulas, oficinas e projetos envolvendo probabilidade.</div>
          </details>
          <details class="home-faq-item">
            <summary>Para qual público o jogo é indicado?</summary>
            <div class="home-faq-answer">Ele pode ser usado principalmente com estudantes dos anos finais do Ensino Fundamental, Ensino Médio, EJA e também em contextos de formação de professores.</div>
          </details>
          <details class="home-faq-item">
            <summary>Preciso imprimir todos os materiais?</summary>
            <div class="home-faq-answer">Para jogar a versão física, o ideal é imprimir as cartas, os dados planificados e o manual. A página de downloads reúne os arquivos necessários.</div>
          </details>
          <details class="home-faq-item">
            <summary>Posso adaptar as regras para minha turma?</summary>
            <div class="home-faq-answer">Pode. O jogo foi pensado para permitir mediação docente. O professor pode ajustar o tempo, a quantidade de rodadas e o foco da discussão matemática.</div>
          </details>
          <details class="home-faq-item">
            <summary>Existe uma versão digital?</summary>
            <div class="home-faq-answer">Sim. O site possui uma área para jogar/simular, pensada para experimentar possibilidades e apoiar o uso do jogo também no ambiente digital.</div>
          </details>
          <details class="home-faq-item">
            <summary>Como posso enviar sugestões ou relatos de uso?</summary>
            <div class="home-faq-answer">Use a página de contato para enviar mensagens, sugestões, links de materiais ou relatos de aplicação. Isso ajuda a aprimorar o projeto.</div>
          </details>
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
