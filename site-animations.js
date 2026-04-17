document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
  const selectors = [
    '.hero', '.section', '.highlight', '.footer-cta', '.timeline-item',
    '.contact-main', '.contact-side', '.story-main', '.story-side',
    '.stat-card', '.step', '.download-card', '.faq-card', '.resource-card',
    '.feature-card', '.cta', '.section-head', '.hero-visual', '.hero-copy',
    '.hero-card', '.showcase-card', '.card', '.panel'
  ];

  const targets = [...new Set(selectors.flatMap(selector => Array.from(document.querySelectorAll(selector))))];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((element, index) => {
      element.classList.add('js-animate-on-scroll');
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 60}ms`;
      observer.observe(element);
    });
  } else {
    targets.forEach((element) => element.classList.add('is-visible'));
  }

  const header = document.querySelector('.site-header');
  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 14);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });
});
