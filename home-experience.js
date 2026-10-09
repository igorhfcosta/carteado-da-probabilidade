(() => {
  'use strict';
  const home = document.querySelector('.home-page');
  if (!home) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const noMotion = () => motion.matches || document.documentElement.classList.contains('a11y-no-motion');
  const revealTargets = home.querySelectorAll('.chance-copy, .chance-table, .how-intro, .step-grid article, .section-title, .benefit-grid article, .path-grid a, .teacher-copy, .teacher-list > div, .home-faq__intro, .home-faq__item');
  if ('IntersectionObserver' in window && !noMotion()) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    revealTargets.forEach((element, index) => {
      element.classList.add('home-reveal', 'is-pending');
      element.style.setProperty('--reveal-delay', `${(index % 3) * 75}ms`);
      observer.observe(element);
    });
    // Changing the OS preference must reveal content already awaiting an entrance.
    motion.addEventListener('change', () => {
      if (!motion.matches) return;
      observer.disconnect();
      revealTargets.forEach(element => element.classList.remove('is-pending'));
    });
  }
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const hero = home.querySelector('.hero');
  const scene = home.querySelector('.hero-visual');
  hero.addEventListener('pointermove', event => {
    if (noMotion() || !finePointer.matches) return;
    const rect = hero.getBoundingClientRect();
    scene.style.setProperty('--scene-x', `${((event.clientX - rect.left) / rect.width - .5) * 16}px`);
    scene.style.setProperty('--scene-y', `${((event.clientY - rect.top) / rect.height - .5) * 12}px`);
  });
  hero.addEventListener('pointerleave', () => {
    scene.style.removeProperty('--scene-x'); scene.style.removeProperty('--scene-y');
  });
  home.querySelectorAll('.path-grid a').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (noMotion() || !finePointer.matches) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
    });
  });
  home.querySelector('.hero-scroll-cue').addEventListener('click', () => {
    home.querySelector('.chance-lab').scrollIntoView({ behavior: noMotion() ? 'instant' : 'smooth' });
  });
  const top = document.querySelector('.back-to-top');
  let scrollQueued = false;
  const updateScroll = () => {
    scrollQueued = false;
    top.classList.toggle('show', window.scrollY > 500);
    top.hidden = window.scrollY <= 500;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    top.querySelector('.progress-bar').style.strokeDashoffset = String(113 * (1 - (height > 0 ? Math.min(1, window.scrollY / height) : 0)));
  };
  window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(updateScroll);
  }, { passive: true });
  window.addEventListener('resize', updateScroll);
  top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: noMotion() ? 'instant' : 'smooth' }));
  updateScroll();
  const table = home.querySelector('.chance-table');
  const roll = table.querySelector('.roll-demo');
  const dice = [...table.querySelectorAll('[data-demo-die]')];
  const result = table.querySelector('.chance-result');
  roll.hidden = false;
  roll.addEventListener('click', () => {
    if (roll.disabled) return;
    roll.disabled = true;
    table.classList.add('is-rolling');
    const finish = () => {
      const values = dice.map(die => {
        const value = 1 + Math.floor(Math.random() * 6);
        die.textContent = String(value); return value;
      });
      const sum = values[0] + values[1];
      const combinations = 6 - Math.abs(7 - sum);
      result.textContent = `${values[0]} + ${values[1]} = ${sum}. Essa soma tem ${combinations} ${combinations === 1 ? 'combinação' : 'combinações'} entre os 36 resultados possíveis.`;
      table.classList.remove('is-rolling');
      roll.disabled = false;
    };
    if (noMotion()) finish(); else window.setTimeout(finish, 550);
  });
})();
