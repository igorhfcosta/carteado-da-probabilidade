document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const revealItems = document.querySelectorAll('.section, .path-card, .info-card, .showcase-card, .cta-band');

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

  revealItems.forEach(item => {
    item.classList.add('reveal');
  });

  const firstSection = document.querySelector('.section');
  if (firstSection) {
    firstSection.classList.add('revealed');
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach(item => {
    if (!item.classList.contains('revealed')) {
      observer.observe(item);
    }
  });
});
