(() => {
  const ROOT_SELECTOR = '#root';
  const MENU_KEYWORDS = ['Home', 'Como jogar', 'Download', 'Professor', 'Sobre', 'Contato', 'Simulador'];

  function normalize(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function hideInternalSimulatorMenu() {
    const root = document.querySelector(ROOT_SELECTOR);
    if (!root) return;

    const possibleMenus = root.querySelectorAll('header, nav, aside');
    possibleMenus.forEach((element) => {
      const text = normalize(element.textContent);
      const hits = MENU_KEYWORDS.filter((keyword) => text.includes(keyword)).length;

      if (text.includes('Simulador') && hits >= 2) {
        element.classList.add('sim-internal-menu-hidden');
      }
    });

    const standaloneTitles = root.querySelectorAll('h1, h2, h3, span, strong, p, div');
    standaloneTitles.forEach((element) => {
      if (element.children.length) return;
      if (normalize(element.textContent) === 'Simulador') {
        element.classList.add('sim-standalone-title-hidden');
      }
    });
  }

  function addFrameClasses() {
    const root = document.querySelector(ROOT_SELECTOR);
    if (!root) return;

    root.querySelectorAll('section, [class*="card"], [class*="Card"], [class*="panel"], [class*="Panel"]').forEach((element) => {
      element.classList.add('sim-purple-frame');
    });
  }

  function runEnhancements() {
    hideInternalSimulatorMenu();
    addFrameClasses();
  }

  document.addEventListener('DOMContentLoaded', () => {
    runEnhancements();
    setTimeout(runEnhancements, 250);
    setTimeout(runEnhancements, 900);

    const root = document.querySelector(ROOT_SELECTOR);
    if (!root) return;

    const observer = new MutationObserver(() => runEnhancements());
    observer.observe(root, { childList: true, subtree: true });
  });
})();
