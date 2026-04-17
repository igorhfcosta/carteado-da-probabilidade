document.addEventListener('DOMContentLoaded', () => {
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

  const revealItems = document.querySelectorAll('.reveal');

  if (!revealItems.length) return;

  const firstReveal = revealItems[0];
  if (firstReveal) {
    firstReveal.classList.add('revealed');
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
