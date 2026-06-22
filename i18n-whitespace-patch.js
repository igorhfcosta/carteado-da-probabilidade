(() => {
  if (window.__carteadoI18nWhitespacePatch) return;
  window.__carteadoI18nWhitespacePatch = true;

  const nativeReplace = String.prototype.replace;
  const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim();

  String.prototype.replace = function patchedCarteadoReplace(searchValue, replaceValue) {
    const source = String(this);

    if (
      typeof searchValue === 'string' &&
      typeof replaceValue === 'string' &&
      searchValue &&
      !source.includes(searchValue) &&
      normalize(source) === normalize(searchValue)
    ) {
      const leading = source.match(/^\s*/)?.[0] || '';
      const trailing = source.match(/\s*$/)?.[0] || '';
      return `${leading}${replaceValue}${trailing}`;
    }

    return nativeReplace.apply(this, arguments);
  };
})();
