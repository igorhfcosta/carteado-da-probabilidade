/*
  Patch de acessibilidade para imagens.
  Mantido neste arquivo porque ele já é carregado em todas as páginas do site,
  exceto no simulador/jogo.
*/
(() => {
  const altByFile = {
    'logo.png': 'Logo do Carteado da Probabilidade',
    'logoufu.png': 'Logo da Universidade Federal de Uberlândia',
    'logoppgecm.png': 'Logo do PPGECM, Mestrado Profissional em Ensino de Ciências e Matemática',
    'autor.jpeg': 'Foto de Igor Henrique Ferreira da Costa, autor do projeto',
    'orientador.jpeg': 'Foto de Rogério Fernando Pires, orientador do projeto',
    'imagem27.png': 'Registro da primeira versão do Carteado da Probabilidade desenvolvida em 2024',
    'imagem31.png': 'Registro da versão reformulada do Carteado da Probabilidade',
    'number1.png': 'Carta numérica 1 do Carteado da Probabilidade',
    'number2.png': 'Carta numérica 2 do Carteado da Probabilidade',
    'number3.png': 'Carta numérica 3 do Carteado da Probabilidade',
    'number4.png': 'Carta numérica 4 do Carteado da Probabilidade',
    'number5.png': 'Carta numérica 5 do Carteado da Probabilidade',
    'number6.png': 'Carta numérica 6 do Carteado da Probabilidade',
    'number7.png': 'Carta numérica 7 do Carteado da Probabilidade',
    'number8.png': 'Carta numérica 8 do Carteado da Probabilidade',
    'number9.png': 'Carta numérica 9 do Carteado da Probabilidade',
    'number10.png': 'Carta numérica 10 do Carteado da Probabilidade',
    'number11.png': 'Carta numérica 11 do Carteado da Probabilidade',
    'number12.png': 'Carta numérica 12 do Carteado da Probabilidade',
    'number13.png': 'Carta numérica 13 do Carteado da Probabilidade',
    'number14.png': 'Carta numérica 14 do Carteado da Probabilidade',
    'number15.png': 'Carta numérica 15 do Carteado da Probabilidade',
    'number16.png': 'Carta numérica 16 do Carteado da Probabilidade',
    'number17.png': 'Carta numérica 17 do Carteado da Probabilidade',
    'number18.png': 'Carta numérica 18 do Carteado da Probabilidade',
    'number19.png': 'Carta numérica 19 do Carteado da Probabilidade',
    'number20.png': 'Carta numérica 20 do Carteado da Probabilidade',
    'joker.png': 'Carta de efeito Coringa',
    'reroll.png': 'Carta de efeito para rolar os dados novamente',
    'draw-number.png': 'Carta de efeito para comprar uma carta numérica',
    'effect-trigger.png': 'Carta de efeito para comprar uma carta de efeito',
    'block-opponent.png': 'Carta de efeito para bloquear o oponente',
    'lose-turn.png': 'Carta de efeito Perca a vez',
    'd4.png': 'Dado de 4 faces',
    'd6.png': 'Dado de 6 faces',
    'd8.png': 'Dado de 8 faces',
    'd10.png': 'Dado de 10 faces',
    'turn-card.png': 'Ícone de compra de carta',
    'turn-discard.png': 'Ícone de descarte de carta',
    'turn-dice.png': 'Ícone de escolha dos dados',
    'turn-roll.png': 'Ícone de rolagem dos dados',
    'turn-sum.png': 'Ícone de soma dos resultados',
    'turn-check.png': 'Ícone de verificação da mão',
    'turn-next.png': 'Ícone de passar a vez',
    'rule-setup.png': 'Ícone de preparação dos materiais',
    'rule-cards.png': 'Ícone de cartas iniciais',
    'rule-goal.png': 'Ícone de objetivo da partida',
    'rule-effect.png': 'Ícone de cartas de efeito',
    'rule-end.png': 'Ícone de fim do turno'
  };

  const fallbackAlt = (src) => {
    const file = decodeURIComponent((src || '').split('/').pop() || '').split('?')[0].split('#')[0];
    if (!file) return '';
    if (altByFile[file]) return altByFile[file];
    const cleanName = file.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ').trim();
    return cleanName ? `Imagem: ${cleanName}` : '';
  };

  const isDecorative = (img) => {
    return img.getAttribute('aria-hidden') === 'true' || Boolean(img.closest('[aria-hidden="true"]'));
  };

  const applyImageAlts = (root = document) => {
    root.querySelectorAll('img').forEach((img) => {
      if (isDecorative(img)) {
        img.setAttribute('alt', '');
        return;
      }
      const currentAlt = img.getAttribute('alt');
      if (currentAlt && currentAlt.trim()) return;
      const alt = fallbackAlt(img.getAttribute('src'));
      if (alt) img.setAttribute('alt', alt);
    });
  };

  const start = () => {
    applyImageAlts();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          if (node.matches?.('img')) applyImageAlts(node.parentElement || document);
          else if (node.querySelector?.('img')) applyImageAlts(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
