(() => {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('simulador')) return;
  if (!document.querySelector('link[href^="i18n.css"]')) {
    const i18nCss = document.createElement('link');
    i18nCss.rel = 'stylesheet';
    i18nCss.href = 'i18n.css?v=20260622-idiomas2';
    document.head.appendChild(i18nCss);
  }
  if (!document.querySelector('script[src^="i18n.js"]')) {
    const i18nScript = document.createElement('script');
    i18nScript.src = 'i18n.js?v=20260622-idiomas2';
    i18nScript.defer = true;
    document.head.appendChild(i18nScript);
  }
})();

