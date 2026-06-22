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

  const quickRules = document.querySelectorAll('.quick-rules .quick-grid article');

  if (quickRules.length >= 7) {
    const rulesText = [
      {
        title: 'Preparação dos materiais',
        text: 'Separe as cartas numéricas e as cartas de efeito. Embaralhe cada monte separadamente e deixe-os virados para baixo, ao alcance dos jogadores.'
      },
      {
        title: 'Cartas iniciais',
        text: 'Cada jogador inicia a partida com 7 cartas na mão. As cartas podem ser numéricas ou de efeito, conforme a composição definida para o baralho.'
      },
      {
        title: 'Objetivo da partida',
        text: 'O objetivo é ser o primeiro jogador a descartar todas as cartas da mão, escolhendo bem os dados e usando efeitos no momento certo.'
      },
      {
        title: 'Escolha dos dados',
        text: 'Em seu turno, o jogador escolhe dois dados entre os disponíveis. Essa escolha define as somas possíveis e suas chances de descarte.'
      },
      {
        title: 'Descarte por soma',
        text: 'Após lançar os dados, some os resultados. Se tiver uma ou mais cartas com esse valor, descarte todas elas no mesmo turno. O coringa pode substituir qualquer carta numérica.'
      },
      {
        title: 'Cartas de efeito',
        text: 'As cartas de efeito só podem ser usadas no próprio turno do jogador. Elas permitem novas ações, compras, bloqueios ou mudanças na jogada.'
      },
      {
        title: 'Fim do turno',
        text: 'Depois de descartar, usar uma carta de efeito ou não conseguir jogar, o turno termina e a vez passa para o próximo jogador, respeitando os efeitos ativos.'
      }
    ];

    quickRules.forEach((rule, index) => {
      const content = rulesText[index];
      const title = rule.querySelector('h3');
      const paragraph = rule.querySelector('p');

      if (content && title && paragraph) {
        title.textContent = content.title;
        paragraph.textContent = content.text;
      }
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