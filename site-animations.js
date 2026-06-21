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

      .effect-list{
        display:grid;
        gap:10px;
        margin-top:16px;
        padding:0;
        list-style:none;
      }

      .effect-list li{
        display:grid;
        gap:3px;
        padding:10px 12px;
        border:1px solid rgba(139,61,241,.16);
        border-radius:14px;
        background:rgba(255,255,255,.72);
        box-shadow:0 8px 18px rgba(95,34,200,.06);
      }

      .effect-list strong{
        color:var(--rules-purple-dark);
        font-size:.92rem;
        font-weight:900;
      }

      .effect-list span{
        color:#4b3f64;
        font-size:.88rem;
        line-height:1.35;
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

    const effectFan = componentsSection.querySelector('.effect-fan');
    const effectCopy = componentsSection.querySelector('.effect-card .component-copy');

    if (effectFan && effectCopy) {
      const effects = [
        {
          src: 'cards/fronts/joker.png',
          alt: 'Carta Coringa do Carteado da Probabilidade',
          title: 'Coringa',
          description: 'Substitui uma carta numérica e ajuda a resolver jogadas mais difíceis.'
        },
        {
          src: 'cards/fronts/reroll.png',
          alt: 'Carta de efeito Rejogar Dados',
          title: 'Rejogar dados',
          description: 'Permite tentar uma nova rolagem e repensar a estratégia da rodada.'
        },
        {
          src: 'cards/fronts/skip.png',
          alt: 'Carta de efeito Pular vez',
          title: 'Pular vez',
          description: 'Interfere na sequência da partida e muda o ritmo entre os jogadores.'
        },
        {
          src: 'cards/fronts/reverse.png',
          alt: 'Carta de efeito Inverter sentido',
          title: 'Inverter sentido',
          description: 'Altera a ordem da rodada e pode mudar completamente a próxima jogada.'
        },
        {
          src: 'cards/fronts/swap.png',
          alt: 'Carta de efeito Troca',
          title: 'Troca',
          description: 'Cria uma troca estratégica e força o jogador a revisar suas possibilidades.'
        },
        {
          src: 'cards/fronts/block.png',
          alt: 'Carta de efeito Bloqueio',
          title: 'Bloqueio',
          description: 'Reduz uma vantagem do adversário e protege a estratégia do jogador.'
        },
        {
          src: 'cards/fronts/draw2.png',
          alt: 'Carta de efeito Comprar cartas',
          title: 'Comprar cartas',
          description: 'Aumenta a pressão da rodada ao alterar a quantidade de cartas em jogo.'
        },
        {
          src: 'cards/fronts/steal.png',
          alt: 'Carta de efeito Roubar carta',
          title: 'Roubar carta',
          description: 'Permite interferir na mão do adversário e cria novas decisões.'
        },
        {
          src: 'cards/fronts/shield.png',
          alt: 'Carta de efeito Proteção',
          title: 'Proteção',
          description: 'Protege o jogador contra uma ação e mantém sua estratégia ativa.'
        },
        {
          src: 'cards/fronts/pular.png',
          alt: 'Carta de efeito Pular vez',
          title: 'Pular vez',
          description: 'Interfere na sequência da partida e muda o ritmo entre os jogadores.'
        },
        {
          src: 'cards/fronts/inverter.png',
          alt: 'Carta de efeito Inverter sentido',
          title: 'Inverter sentido',
          description: 'Altera a ordem da rodada e pode mudar completamente a próxima jogada.'
        },
        {
          src: 'cards/fronts/trocar.png',
          alt: 'Carta de efeito Troca',
          title: 'Troca',
          description: 'Cria uma troca estratégica e força o jogador a revisar suas possibilidades.'
        },
        {
          src: 'cards/fronts/bloqueio.png',
          alt: 'Carta de efeito Bloqueio',
          title: 'Bloqueio',
          description: 'Reduz uma vantagem do adversário e protege a estratégia do jogador.'
        }
      ];

      const loadImage = (effect) => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(effect);
        img.onerror = () => resolve(null);
        img.src = effect.src;
      });

      Promise.all(effects.map(loadImage)).then((results) => {
        const availableEffects = results.filter(Boolean);
        const selectedEffects = availableEffects.slice(0, 3);

        if (selectedEffects.length >= 2) {
          effectFan.innerHTML = '';

          selectedEffects.forEach((effect, index) => {
            const img = document.createElement('img');
            img.className = `fan-card ${index === 0 ? 'fan-card-left' : index === 1 ? 'fan-card-center' : 'fan-card-right'}`;
            img.src = effect.src;
            img.alt = effect.alt;
            effectFan.appendChild(img);
          });

          const oldList = effectCopy.querySelector('.effect-list');
          if (oldList) oldList.remove();

          const list = document.createElement('ul');
          list.className = 'effect-list';
          selectedEffects.forEach((effect) => {
            const item = document.createElement('li');
            item.innerHTML = `<strong>${effect.title}</strong><span>${effect.description}</span>`;
            list.appendChild(item);
          });

          effectCopy.appendChild(list);
        }
      });
    }
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