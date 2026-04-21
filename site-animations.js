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


const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

  
  
  animateItems.forEach(item => {
    if (!item.classList.contains('is-visible')) {
      observer.observe(item);
    }
  });
});
