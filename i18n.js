(() => {
  const currentPath = window.location.pathname.toLowerCase();
  if (currentPath.includes('simulador')) return;
  if (window.__carteadoI18nLoaded) return;
  window.__carteadoI18nLoaded = true;

  const STORAGE_KEY = 'carteadoIdioma';
  const LANGS = {
    pt: { label: 'Português', short: 'PT', html: 'pt-BR' },
    en: { label: 'English', short: 'EN', html: 'en' },
    es: { label: 'Español', short: 'ES', html: 'es' }
  };

  const pageTitles = {
    pt: {
      '/': 'Carteado da Probabilidade - Início',
      'index.html': 'Carteado da Probabilidade - Início',
      'como-jogar.html': 'Carteado da Probabilidade - Como jogar',
      'baixar.html': 'Carteado da Probabilidade - Download',
      'proposta-didatica.html': 'Carteado da Probabilidade - Proposta didática',
      'embasamento-teorico.html': 'Carteado da Probabilidade - Embasamento teórico',
      'sobre.html': 'Carteado da Probabilidade - Sobre o Projeto',
      'contato.html': 'Carteado da Probabilidade - Contato'
    },
    en: {
      '/': 'Probability Card Game - Home',
      'index.html': 'Probability Card Game - Home',
      'como-jogar.html': 'Probability Card Game - How to Play',
      'baixar.html': 'Probability Card Game - Download',
      'proposta-didatica.html': 'Probability Card Game - Teaching Proposal',
      'embasamento-teorico.html': 'Probability Card Game - Theoretical Basis',
      'sobre.html': 'Probability Card Game - About the Project',
      'contato.html': 'Probability Card Game - Contact'
    },
    es: {
      '/': 'Carteado de la Probabilidad - Inicio',
      'index.html': 'Carteado de la Probabilidad - Cómo jugar',
      'como-jogar.html': 'Carteado de la Probabilidad - Cómo jugar',
      'baixar.html': 'Carteado de la Probabilidad - Descargar',
      'proposta-didatica.html': 'Carteado de la Probabilidad - Propuesta didáctica',
      'embasamento-teorico.html': 'Carteado de la Probabilidad - Fundamentación teórica',
      'sobre.html': 'Carteado de la Probabilidad - Sobre el proyecto',
      'contato.html': 'Carteado de la Probabilidad - Contacto'
    }
  };

  const dict = {
    en: {
      'Carteado': 'Card Game',
      'da Probabilidade': 'of Probability',
      'Carteado da Probabilidade': 'Probability Card Game',
      'Carteado da Probabilidade - Início': 'Probability Card Game - Home',
      'Carteado da Probabilidade - Página inicial': 'Probability Card Game - Home page',
      'Navegação principal': 'Main navigation',
      'Navegação mobile': 'Mobile navigation',
      'Abrir menu': 'Open menu',
      'Home': 'Home',
      'Início': 'Home',
      'Como jogar': 'How to play',
      'Como Jogar': 'How to Play',
      'Download': 'Download',
      'Professor': 'Teacher',
      'Proposta didática': 'Teaching proposal',
      'Proposta Didática': 'Teaching Proposal',
      'Embasamento teórico': 'Theoretical basis',
      'Embasamento Teórico': 'Theoretical Basis',
      'Fundamentação': 'Theoretical basis',
      'Sobre': 'About',
      'Sobre o Projeto': 'About the Project',
      'Contato': 'Contact',
      'Jogar agora': 'Play now',
      'JOGAR AGORA': 'PLAY NOW',
      'Baixar materiais': 'Download materials',
      'BAIXAR MATERIAIS': 'DOWNLOAD MATERIALS',
      'Ver regras': 'See rules',
      'VER REGRAS': 'SEE RULES',
      'Explorar': 'Explore',
      'Explore o Carteado': 'Explore the Card Game',
      'Perguntas frequentes': 'Frequently asked questions',
      'PERGUNTAS FREQUENTES': 'FREQUENTLY ASKED QUESTIONS',
      'Dúvidas rápidas sobre o': 'Quick questions about the',
      'Respostas diretas para quem quer conhecer, baixar, imprimir ou aplicar o jogo em sala de aula.': 'Direct answers for those who want to learn about, download, print, or use the game in the classroom.',
      'O jogo é gratuito?': 'Is the game free?',
      'Sim. O material foi pensado como um': 'Yes. The material was designed as an',
      'recurso educacional': 'educational resource',
      'para apoiar aulas, oficinas e projetos envolvendo probabilidade.': 'to support classes, workshops, and projects involving probability.',
      'Para qual público o jogo é indicado?': 'Who is the game intended for?',
      'Ele pode ser usado principalmente com estudantes dos anos finais do Ensino Fundamental, Ensino Médio, EJA e também em contextos de formação de professores.': 'It can mainly be used with students in the final years of elementary school, high school, adult education, and also in teacher education contexts.',
      'Preciso imprimir todos os materiais?': 'Do I need to print all materials?',
      'Para jogar a versão física, o ideal é imprimir as cartas, os dados planificados e o manual. A página de downloads reúne os arquivos necessários.': 'To play the physical version, it is best to print the cards, printable dice nets, and manual. The download page gathers the required files.',
      'Posso adaptar as regras para minha turma?': 'Can I adapt the rules for my class?',
      'Pode. O jogo foi pensado para permitir mediação docente. O professor pode ajustar o tempo, a quantidade de rodadas e o foco da discussão matemática.': 'Yes. The game was designed to allow teacher mediation. Teachers may adjust the time, number of rounds, and focus of the mathematical discussion.',
      'Existe uma versão digital?': 'Is there a digital version?',
      'Sim. O site possui uma área para jogar/simular, pensada para experimentar possibilidades e apoiar o uso do jogo também no ambiente digital.': 'Yes. The site has an area to play/simulate, designed to test possibilities and support using the game in a digital environment.',
      'Como posso enviar sugestões ou relatos de uso?': 'How can I send suggestions or usage reports?',
      'Use a página de contato para enviar mensagens, sugestões, links de materiais ou relatos de aplicação. Isso ajuda a aprimorar o projeto.': 'Use the contact page to send messages, suggestions, material links, or reports of use. This helps improve the project.',
      'Baixe o pacote completo do jogo.': 'Download the complete game package.',
      'Acesse cartas, manual, caixa e dados em um único caminho para preparar o material com mais facilidade.': 'Access cards, manual, box, and dice in one place to prepare the material more easily.',
      'Baixar tudo': 'Download all',
      'Realização': 'Produced by',
      'REALIZAÇÃO': 'PRODUCED BY',
      'Universidade Federal de Uberlândia': 'Federal University of Uberlândia',
      'Mestrado Profissional em Ensino de Ciências e Matemática': 'Professional Master’s Program in Science and Mathematics Education',
      'Desenvolvido por Igor Henrique Ferreira da Costa.': 'Developed by Igor Henrique Ferreira da Costa.',
      'Feito para a educação.': 'Made for education.',
      '© 2026 Carteado da Probabilidade.': '© 2026 Probability Card Game.',
      'Abrir site da Universidade Federal de Uberlândia': 'Open the Federal University of Uberlândia website',
      'Abrir site do PPGECM UFU': 'Open the PPGECM UFU website',
      'Conheça as cartas e os dados': 'Meet the cards and dice',
      'Números': 'Numbers',
      'Cartas numéricas': 'Number cards',
      'As cartas numéricas variam de': 'Number cards range from',
      '1 a 20': '1 to 20',
      'e há': 'and there are',
      'duas cartas de cada valor': 'two cards of each value',
      'no baralho.': 'in the deck.',
      'Efeitos': 'Effects',
      'Cartas de efeito': 'Effect cards',
      'As cartas de efeito interferem no ritmo da partida e aumentam a estratégia.': 'Effect cards interfere with the pace of the match and increase strategy.',
      'Há duas cartas de cada efeito no baralho.': 'There are two cards of each effect in the deck.',
      'Rolar dados novamente': 'Roll dice again',
      'Permite jogar os dados novamente no próprio turno.': 'Allows you to roll the dice again on your turn.',
      'Compre uma carta numérica': 'Draw a number card',
      'O jogador compra uma carta do monte numérico.': 'The player draws a card from the number deck.',
      'Compre uma carta de efeito': 'Draw an effect card',
      'O jogador compra uma carta do monte de efeitos.': 'The player draws a card from the effect deck.',
      'Bloqueie o oponente': 'Block the opponent',
      'Impede a jogada do próximo oponente.': 'Prevents the next opponent from playing.',
      'Perca a vez': 'Lose a turn',
      'O jogador perde sua ação na rodada.': 'The player loses their action in the round.',
      'Coringa': 'Wildcard',
      'Substitui uma carta numérica e ajuda a resolver jogadas mais difíceis.': 'Replaces a number card and helps solve more difficult plays.',
      'Dados': 'Dice',
      'Tipos de dados utilizados': 'Types of dice used',
      'Os dados possuem quantidades diferentes de faces. Isso muda as somas possíveis e permite comparar resultados mais prováveis, menos prováveis, possíveis e impossíveis durante a partida.': 'The dice have different numbers of faces. This changes the possible sums and makes it possible to compare more likely, less likely, possible, and impossible results during the game.',
      'faces': 'faces',
      'Regras rápidas': 'Quick rules',
      'Preparação': 'Preparation',
      'Separe cartas numéricas, cartas de efeito e dados. Embaralhe os montes antes de começar.': 'Separate number cards, effect cards, and dice. Shuffle the decks before starting.',
      'Cartas iniciais': 'Starting cards',
      'Cada jogador começa com 7 cartas na mão. As demais ficam nos montes de compra.': 'Each player starts with 7 cards in hand. The remaining cards stay in the draw piles.',
      'Objetivo': 'Goal',
      'Vence quem descartar todas as cartas primeiro, usando estratégia e efeitos no momento certo.': 'The first player to discard all cards wins, using strategy and effects at the right time.',
      'Só podem ser usadas no próprio turno e alteram a jogada, a compra ou a ação dos oponentes.': 'They can only be used on the player’s own turn and change the play, drawing action, or opponents’ actions.',
      'Fim do turno': 'End of turn',
      'Após descartar, usar efeito ou não conseguir jogar, a vez passa para o próximo jogador.': 'After discarding, using an effect, or being unable to play, the turn passes to the next player.',
      'Passo a passo do turno': 'Turn step by step',
      'Compre uma carta': 'Draw a card',
      'Compre 1 carta do monte de compra para sua mão.': 'Draw 1 card from the draw pile to your hand.',
      'Descarte uma carta': 'Discard a card',
      'Escolha 1 carta da mão e descarte na área central.': 'Choose 1 card from your hand and discard it in the center area.',
      'Escolha os dados': 'Choose the dice',
      'Escolha 2, 3 ou 4 dados disponíveis para a rodada.': 'Choose 2, 3, or 4 available dice for the round.',
      'Role os dados': 'Roll the dice',
      'Role os dados escolhidos.': 'Roll the chosen dice.',
      'Some os resultados': 'Add the results',
      'Some os valores obtidos nos dados rolados.': 'Add the values obtained on the rolled dice.',
      'Verifique sua mão': 'Check your hand',
      'Se o total corresponder à carta da soma, continue.': 'If the total matches the sum card, continue.',
      'Passe a vez': 'Pass the turn',
      'Encerrada a jogada, a vez passa para o próximo jogador.': 'Once the play is over, the turn passes to the next player.',
      'Como montar o jogo': 'How to assemble the game',
      'Baixe os materiais, prepare a impressão e organize tudo para deixar o jogo pronto para uso.': 'Download the materials, prepare the printing, and organize everything to make the game ready to use.',
      'Baixe os arquivos': 'Download the files',
      'Escolha os materiais desejados e acesse os links de download.': 'Choose the desired materials and access the download links.',
      'Imprima os PDFs': 'Print the PDFs',
      'Prepare a impressão das cartas, da caixa, do manual e dos dados.': 'Prepare the printing of the cards, box, manual, and dice.',
      'Recorte com cuidado': 'Cut carefully',
      'Recorte os componentes para obter um acabamento mais limpo.': 'Cut out the components to get a cleaner finish.',
      'Proteja as cartas': 'Protect the cards',
      'Se quiser mais durabilidade, plastifique ou reforce o material.': 'For more durability, laminate or reinforce the material.',
      'Organize tudo': 'Organize everything',
      'Finalize os dados, guarde as peças e deixe o jogo pronto para a partida.': 'Finish the dice, store the pieces, and make the game ready to play.',
      'Dica de acabamento': 'Finishing tip',
      'Para valorizar o jogo como material didático, cuide da impressão, dos cortes e da organização dos componentes. Um acabamento simples, mas bem feito, melhora a experiência em sala de aula.': 'To value the game as teaching material, take care with printing, cutting, and organizing the components. A simple but well-done finish improves the classroom experience.',
      'Uma proposta em desenvolvimento': 'A proposal under development',
      'O Carteado da Probabilidade é um projeto educacional voltado ao ensino de probabilidade por meio de cartas, dados, escolhas estratégicas e discussão matemática. O site reúne a memória do projeto, os materiais de apoio, a versão digital e caminhos para aplicação em sala de aula.': 'Probability Card Game is an educational project focused on teaching probability through cards, dice, strategic choices, and mathematical discussion. The site brings together the project history, support materials, the digital version, and ways to use it in the classroom.',
      'Contato': 'Contact',
      'Comunidade Carteado da Probabilidade': 'Probability Card Game Community',
      'Entre em contato, compartilhe experiências, envie sugestões ou tire suas dúvidas. Sua participação fortalece o projeto!': 'Get in touch, share experiences, send suggestions, or ask questions. Your participation strengthens the project!',
      'Envie sua mensagem': 'Send your message',
      'Preencha o formulário abaixo para falar conosco. Responderemos o mais breve possível.': 'Fill out the form below to contact us. We will reply as soon as possible.',
      'Nome completo': 'Full name',
      'Seu nome': 'Your name',
      'E-mail': 'Email',
      'Assunto': 'Subject',
      'Mensagem': 'Message',
      'Escreva sua mensagem aqui...': 'Write your message here...',
      'Link dos anexos': 'Attachment link',
      'Preferencialmente, envie um link do Google Drive com permissão de visualização ativada.': 'Preferably, send a Google Drive link with viewing permission enabled.',
      'Enviar mensagem': 'Send message',
      'Colabore com o projeto': 'Collaborate with the project',
      'Relate aplicações': 'Report applications',
      'Conte como o jogo foi utilizado na sua sala de aula.': 'Tell us how the game was used in your classroom.',
      'Sugira melhorias': 'Suggest improvements',
      'Envie ideias para novas cartas, regras ou recursos.': 'Send ideas for new cards, rules, or resources.',
      'Envie adaptações': 'Send adaptations',
      'Compartilhe adaptações que você criou.': 'Share adaptations you created.',
      'Compartilhe atividades': 'Share activities',
      'Envie planos de aula ou atividades complementares.': 'Send lesson plans or complementary activities.',
      'Outras formas de contato': 'Other contact options',
      'Prefere falar diretamente? Utilize os canais abaixo.': 'Prefer to talk directly? Use the channels below.',
      'Instituição': 'Institution',
      'Acessibilidade': 'Accessibility',
      'Ajuste a leitura e a navegação do site.': 'Adjust site reading and navigation.',
      'Tamanho da fonte': 'Font size',
      'Padrão': 'Default',
      'Variar tamanho da fonte': 'Change font size',
      'Alto contraste': 'High contrast',
      'Pausar animações': 'Pause animations',
      'Sublinhar links': 'Underline links',
      'Espaçamento maior': 'Larger spacing',
      'Voltar ao padrão': 'Reset to default',
      'Configurações padrão.': 'Default settings.',
      'Configurações carregadas.': 'Settings loaded.',
      'Idioma': 'Language',
      'Escolha o idioma do site.': 'Choose the site language.',
      'Português': 'Portuguese',
      'Inglês': 'English',
      'Espanhol': 'Spanish'
    },
    es: {
      'Carteado': 'Carteado',
      'da Probabilidade': 'de la Probabilidad',
      'Carteado da Probabilidade': 'Carteado de la Probabilidad',
      'Carteado da Probabilidade - Início': 'Carteado de la Probabilidad - Inicio',
      'Carteado da Probabilidade - Página inicial': 'Carteado de la Probabilidad - Página inicial',
      'Navegação principal': 'Navegación principal',
      'Navegação mobile': 'Navegación móvil',
      'Abrir menu': 'Abrir menú',
      'Home': 'Inicio',
      'Início': 'Inicio',
      'Como jogar': 'Cómo jugar',
      'Como Jogar': 'Cómo jugar',
      'Download': 'Descargar',
      'Professor': 'Profesor',
      'Proposta didática': 'Propuesta didáctica',
      'Proposta Didática': 'Propuesta didáctica',
      'Embasamento teórico': 'Fundamentación teórica',
      'Embasamento Teórico': 'Fundamentación teórica',
      'Fundamentação': 'Fundamentación',
      'Sobre': 'Sobre',
      'Sobre o Projeto': 'Sobre el proyecto',
      'Contato': 'Contacto',
      'Jogar agora': 'Jugar ahora',
      'JOGAR AGORA': 'JUGAR AHORA',
      'Baixar materiais': 'Descargar materiales',
      'BAIXAR MATERIAIS': 'DESCARGAR MATERIALES',
      'Ver regras': 'Ver reglas',
      'VER REGRAS': 'VER REGLAS',
      'Explore o Carteado': 'Explora el Carteado',
      'Perguntas frequentes': 'Preguntas frecuentes',
      'PERGUNTAS FREQUENTES': 'PREGUNTAS FRECUENTES',
      'Dúvidas rápidas sobre o': 'Dudas rápidas sobre el',
      'Respostas diretas para quem quer conhecer, baixar, imprimir ou aplicar o jogo em sala de aula.': 'Respuestas directas para quien quiere conocer, descargar, imprimir o aplicar el juego en el aula.',
      'O jogo é gratuito?': '¿El juego es gratuito?',
      'Sim. O material foi pensado como um': 'Sí. El material fue pensado como un',
      'recurso educacional': 'recurso educativo',
      'para apoiar aulas, oficinas e projetos envolvendo probabilidade.': 'para apoyar clases, talleres y proyectos relacionados con probabilidad.',
      'Para qual público o jogo é indicado?': '¿Para qué público está indicado el juego?',
      'Ele pode ser usado principalmente com estudantes dos anos finais do Ensino Fundamental, Ensino Médio, EJA e também em contextos de formação de professores.': 'Puede utilizarse principalmente con estudiantes de los últimos años de primaria/secundaria básica, secundaria, educación de jóvenes y adultos y también en contextos de formación docente.',
      'Preciso imprimir todos os materiais?': '¿Necesito imprimir todos los materiales?',
      'Para jogar a versão física, o ideal é imprimir as cartas, os dados planificados e o manual. A página de downloads reúne os arquivos necessários.': 'Para jugar la versión física, lo ideal es imprimir las cartas, los dados desplegados y el manual. La página de descargas reúne los archivos necesarios.',
      'Posso adaptar as regras para minha turma?': '¿Puedo adaptar las reglas para mi grupo?',
      'Pode. O jogo foi pensado para permitir mediação docente. O professor pode ajustar o tempo, a quantidade de rodadas e o foco da discussão matemática.': 'Sí. El juego fue pensado para permitir mediación docente. El profesor puede ajustar el tiempo, la cantidad de rondas y el foco de la discusión matemática.',
      'Existe uma versão digital?': '¿Existe una versión digital?',
      'Sim. O site possui uma área para jogar/simular, pensada para experimentar possibilidades e apoiar o uso do jogo também no ambiente digital.': 'Sí. El sitio tiene un área para jugar/simular, pensada para experimentar posibilidades y apoyar el uso del juego también en el entorno digital.',
      'Como posso enviar sugestões ou relatos de uso?': '¿Cómo puedo enviar sugerencias o relatos de uso?',
      'Use a página de contato para enviar mensagens, sugestões, links de materiais ou relatos de aplicação. Isso ajuda a aprimorar o projeto.': 'Use la página de contacto para enviar mensajes, sugerencias, enlaces de materiales o relatos de aplicación. Esto ayuda a mejorar el proyecto.',
      'Baixe o pacote completo do jogo.': 'Descarga el paquete completo del juego.',
      'Acesse cartas, manual, caixa e dados em um único caminho para preparar o material com mais facilidade.': 'Accede a cartas, manual, caja y dados en un solo lugar para preparar el material con más facilidad.',
      'Baixar tudo': 'Descargar todo',
      'Realização': 'Realización',
      'REALIZAÇÃO': 'REALIZACIÓN',
      'Universidade Federal de Uberlândia': 'Universidad Federal de Uberlândia',
      'Mestrado Profissional em Ensino de Ciências e Matemática': 'Maestría Profesional en Enseñanza de Ciencias y Matemáticas',
      'Desenvolvido por Igor Henrique Ferreira da Costa.': 'Desarrollado por Igor Henrique Ferreira da Costa.',
      'Feito para a educação.': 'Hecho para la educación.',
      '© 2026 Carteado da Probabilidade.': '© 2026 Carteado de la Probabilidad.',
      'Abrir site da Universidade Federal de Uberlândia': 'Abrir el sitio de la Universidad Federal de Uberlândia',
      'Abrir site do PPGECM UFU': 'Abrir el sitio del PPGECM UFU',
      'Conheça as cartas e os dados': 'Conoce las cartas y los dados',
      'Números': 'Números',
      'Cartas numéricas': 'Cartas numéricas',
      'As cartas numéricas variam de': 'Las cartas numéricas varían de',
      '1 a 20': '1 a 20',
      'e há': 'y hay',
      'duas cartas de cada valor': 'dos cartas de cada valor',
      'no baralho.': 'en el mazo.',
      'Efeitos': 'Efectos',
      'Cartas de efeito': 'Cartas de efecto',
      'As cartas de efeito interferem no ritmo da partida e aumentam a estratégia.': 'Las cartas de efecto interfieren en el ritmo de la partida y aumentan la estrategia.',
      'Há duas cartas de cada efeito no baralho.': 'Hay dos cartas de cada efecto en el mazo.',
      'Rolar dados novamente': 'Lanzar los dados nuevamente',
      'Permite jogar os dados novamente no próprio turno.': 'Permite lanzar los dados nuevamente en el propio turno.',
      'Compre uma carta numérica': 'Roba una carta numérica',
      'O jogador compra uma carta do monte numérico.': 'El jugador roba una carta del mazo numérico.',
      'Compre uma carta de efeito': 'Roba una carta de efecto',
      'O jogador compra uma carta do monte de efeitos.': 'El jugador roba una carta del mazo de efectos.',
      'Bloqueie o oponente': 'Bloquea al oponente',
      'Impede a jogada do próximo oponente.': 'Impide la jugada del próximo oponente.',
      'Perca a vez': 'Pierde el turno',
      'O jogador perde sua ação na rodada.': 'El jugador pierde su acción en la ronda.',
      'Coringa': 'Comodín',
      'Substitui uma carta numérica e ajuda a resolver jogadas mais difíceis.': 'Sustituye una carta numérica y ayuda a resolver jugadas más difíciles.',
      'Dados': 'Dados',
      'Tipos de dados utilizados': 'Tipos de dados utilizados',
      'Os dados possuem quantidades diferentes de faces. Isso muda as somas possíveis e permite comparar resultados mais prováveis, menos prováveis, possíveis e impossíveis durante a partida.': 'Los dados tienen diferentes cantidades de caras. Esto cambia las sumas posibles y permite comparar resultados más probables, menos probables, posibles e imposibles durante la partida.',
      'faces': 'caras',
      'Regras rápidas': 'Reglas rápidas',
      'Preparação': 'Preparación',
      'Separe cartas numéricas, cartas de efeito e dados. Embaralhe os montes antes de começar.': 'Separe cartas numéricas, cartas de efecto y dados. Baraje los mazos antes de empezar.',
      'Cartas iniciais': 'Cartas iniciales',
      'Cada jogador começa com 7 cartas na mão. As demais ficam nos montes de compra.': 'Cada jugador empieza con 7 cartas en la mano. Las demás quedan en los mazos de robo.',
      'Objetivo': 'Objetivo',
      'Vence quem descartar todas as cartas primeiro, usando estratégia e efeitos no momento certo.': 'Gana quien descarte todas sus cartas primero, usando estrategia y efectos en el momento adecuado.',
      'Só podem ser usadas no próprio turno e alteram a jogada, a compra ou a ação dos oponentes.': 'Solo pueden usarse en el propio turno y alteran la jugada, el robo o la acción de los oponentes.',
      'Fim do turno': 'Fin del turno',
      'Após descartar, usar efeito ou não conseguir jogar, a vez passa para o próximo jogador.': 'Después de descartar, usar efecto o no poder jugar, el turno pasa al siguiente jugador.',
      'Passo a passo do turno': 'Paso a paso del turno',
      'Compre uma carta': 'Roba una carta',
      'Compre 1 carta do monte de compra para sua mão.': 'Roba 1 carta del mazo de robo para tu mano.',
      'Descarte uma carta': 'Descarta una carta',
      'Escolha 1 carta da mão e descarte na área central.': 'Elige 1 carta de la mano y descártala en el área central.',
      'Escolha os dados': 'Elige los dados',
      'Escolha 2, 3 ou 4 dados disponíveis para a rodada.': 'Elige 2, 3 o 4 dados disponibles para la ronda.',
      'Role os dados': 'Lanza los dados',
      'Role os dados escolhidos.': 'Lanza los dados elegidos.',
      'Some os resultados': 'Suma los resultados',
      'Some os valores obtidos nos dados rolados.': 'Suma los valores obtenidos en los dados lanzados.',
      'Verifique sua mão': 'Verifica tu mano',
      'Se o total corresponder à carta da soma, continue.': 'Si el total corresponde a la carta de suma, continúa.',
      'Passe a vez': 'Pasa el turno',
      'Encerrada a jogada, a vez passa para o próximo jogador.': 'Terminada la jugada, el turno pasa al siguiente jugador.',
      'Como montar o jogo': 'Cómo montar el juego',
      'Baixe os materiais, prepare a impressão e organize tudo para deixar o jogo pronto para uso.': 'Descarga los materiales, prepara la impresión y organiza todo para dejar el juego listo para usar.',
      'Baixe os arquivos': 'Descarga los archivos',
      'Escolha os materiais desejados e acesse os links de download.': 'Elige los materiales deseados y accede a los enlaces de descarga.',
      'Imprima os PDFs': 'Imprime los PDF',
      'Prepare a impressão das cartas, da caixa, do manual e dos dados.': 'Prepara la impresión de las cartas, la caja, el manual y los dados.',
      'Recorte com cuidado': 'Recorta con cuidado',
      'Recorte os componentes para obter um acabamento mais limpo.': 'Recorta los componentes para obtener un acabado más limpio.',
      'Proteja as cartas': 'Protege las cartas',
      'Se quiser mais durabilidade, plastifique ou reforce o material.': 'Si quieres más durabilidad, plastifica o refuerza el material.',
      'Organize tudo': 'Organiza todo',
      'Finalize os dados, guarde as peças e deixe o jogo pronto para a partida.': 'Finaliza los dados, guarda las piezas y deja el juego listo para la partida.',
      'Dica de acabamento': 'Consejo de acabado',
      'Para valorizar o jogo como material didático, cuide da impressão, dos cortes e da organização dos componentes. Um acabamento simples, mas bem feito, melhora a experiência em sala de aula.': 'Para valorar el juego como material didáctico, cuida la impresión, los cortes y la organización de los componentes. Un acabado simple, pero bien hecho, mejora la experiencia en el aula.',
      'Uma proposta em desenvolvimento': 'Una propuesta en desarrollo',
      'O Carteado da Probabilidade é um projeto educacional voltado ao ensino de probabilidade por meio de cartas, dados, escolhas estratégicas e discussão matemática. O site reúne a memória do projeto, os materiais de apoio, a versão digital e caminhos para aplicação em sala de aula.': 'El Carteado de la Probabilidad es un proyecto educativo orientado a la enseñanza de probabilidad mediante cartas, dados, elecciones estratégicas y discusión matemática. El sitio reúne la memoria del proyecto, los materiales de apoyo, la versión digital y caminos para la aplicación en el aula.',
      'Comunidade Carteado da Probabilidade': 'Comunidad Carteado de la Probabilidad',
      'Entre em contato, compartilhe experiências, envie sugestões ou tire suas dúvidas. Sua participação fortalece o projeto!': 'Ponte en contacto, comparte experiencias, envía sugerencias o resuelve tus dudas. ¡Tu participación fortalece el proyecto!',
      'Envie sua mensagem': 'Envía tu mensaje',
      'Preencha o formulário abaixo para falar conosco. Responderemos o mais breve possível.': 'Completa el formulario para hablar con nosotros. Responderemos lo antes posible.',
      'Nome completo': 'Nombre completo',
      'Seu nome': 'Tu nombre',
      'E-mail': 'Correo electrónico',
      'Assunto': 'Asunto',
      'Mensagem': 'Mensaje',
      'Escreva sua mensagem aqui...': 'Escribe tu mensaje aquí...',
      'Link dos anexos': 'Enlace de los anexos',
      'Preferencialmente, envie um link do Google Drive com permissão de visualização ativada.': 'Preferiblemente, envía un enlace de Google Drive con permiso de visualización activado.',
      'Enviar mensagem': 'Enviar mensaje',
      'Colabore com o projeto': 'Colabora con el proyecto',
      'Relate aplicações': 'Relata aplicaciones',
      'Conte como o jogo foi utilizado na sua sala de aula.': 'Cuenta cómo se utilizó el juego en tu aula.',
      'Sugira melhorias': 'Sugiere mejoras',
      'Envie ideias para novas cartas, regras ou recursos.': 'Envía ideas para nuevas cartas, reglas o recursos.',
      'Envie adaptações': 'Envía adaptaciones',
      'Compartilhe adaptações que você criou.': 'Comparte adaptaciones que hayas creado.',
      'Compartilhe atividades': 'Comparte actividades',
      'Envie planos de aula ou atividades complementares.': 'Envía planes de clase o actividades complementarias.',
      'Outras formas de contato': 'Otras formas de contacto',
      'Prefere falar diretamente? Utilize os canais abaixo.': '¿Prefieres hablar directamente? Usa los canales abajo.',
      'Instituição': 'Institución',
      'Acessibilidade': 'Accesibilidad',
      'Ajuste a leitura e a navegação do site.': 'Ajusta la lectura y navegación del sitio.',
      'Tamanho da fonte': 'Tamaño de fuente',
      'Padrão': 'Predeterminado',
      'Variar tamanho da fonte': 'Cambiar tamaño de fuente',
      'Alto contraste': 'Alto contraste',
      'Pausar animações': 'Pausar animaciones',
      'Sublinhar links': 'Subrayar enlaces',
      'Espaçamento maior': 'Mayor espaciado',
      'Voltar ao padrão': 'Restablecer',
      'Configurações padrão.': 'Configuración predeterminada.',
      'Configurações carregadas.': 'Configuración cargada.',
      'Idioma': 'Idioma',
      'Escolha o idioma do site.': 'Elige el idioma del sitio.',
      'Português': 'Portugués',
      'Inglês': 'Inglés',
      'Espanhol': 'Español'
    }
  };

  const normalize = (value) => String(value || '').replace(/\s+/g, ' ').trim();
  const preferred = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANGS[saved]) return saved;
    const nav = (navigator.language || navigator.userLanguage || 'pt').toLowerCase();
    if (nav.startsWith('en')) return 'en';
    if (nav.startsWith('es')) return 'es';
    return 'pt';
  };

  let currentLang = preferred();
  let translating = false;

  const translateText = (text, lang) => {
    const clean = normalize(text);
    if (!clean || lang === 'pt') return text;
    const translated = dict[lang]?.[clean];
    return translated || text;
  };

  const translateAttributes = (root, lang) => {
    const attrs = ['alt', 'title', 'aria-label', 'placeholder', 'value'];
    const elements = root.querySelectorAll ? root.querySelectorAll('*') : [];
    elements.forEach((el) => {
      attrs.forEach((attr) => {
        if (!el.hasAttribute(attr)) return;
        const originalAttr = `data-i18n-original-${attr}`;
        if (!el.hasAttribute(originalAttr)) el.setAttribute(originalAttr, el.getAttribute(attr));
        const original = el.getAttribute(originalAttr);
        el.setAttribute(attr, translateText(original, lang));
      });
    });
  };

  const translateTextNodes = (root, lang) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest('script, style, noscript, code, pre, textarea')) return NodeFilter.FILTER_REJECT;
        if (!normalize(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent) return;
      if (!parent.dataset.i18nOriginalText) parent.dataset.i18nOriginalText = node.nodeValue;
      const original = parent.dataset.i18nOriginalText;
      node.nodeValue = translateText(original, lang);
    });
  };

  const applyPageMeta = (lang) => {
    document.documentElement.lang = LANGS[lang].html;
    const file = window.location.pathname.split('/').pop() || 'index.html';
    const title = pageTitles[lang]?.[file] || pageTitles[lang]?.['/'];
    if (title) document.title = title;
    const desc = {
      pt: 'Carteado da Probabilidade: jogo educativo com cartas e dados para aprender probabilidade por meio de estratégia, análise de possibilidades e tomada de decisão.',
      en: 'Probability Card Game: an educational card and dice game for learning probability through strategy, analysis of possibilities, and decision-making.',
      es: 'Carteado de la Probabilidad: juego educativo con cartas y dados para aprender probabilidad mediante estrategia, análisis de posibilidades y toma de decisiones.'
    }[lang];
    document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').forEach((meta) => meta.setAttribute('content', desc));
  };

  const applyLanguage = (lang, options = {}) => {
    if (!LANGS[lang] || translating) return;
    translating = true;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyPageMeta(lang);
    translateTextNodes(document.body, lang);
    translateAttributes(document.body, lang);
    document.querySelectorAll('.language-current').forEach((item) => { item.textContent = LANGS[lang].short; });
    document.querySelectorAll('.language-option').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });
    translating = false;
    if (options.announce) {
      const live = document.querySelector('.language-status');
      if (live) live.textContent = lang === 'pt' ? 'Idioma alterado para português.' : lang === 'en' ? 'Language changed to English.' : 'Idioma cambiado a español.';
    }
  };

  const createWidget = () => {
    if (document.querySelector('.language-widget')) return;
    const widget = document.createElement('div');
    widget.className = 'language-widget';
    widget.innerHTML = `
      <button class="language-toggle" type="button" aria-label="Idioma" aria-expanded="false" aria-controls="language-panel">
        <span class="language-globe" aria-hidden="true">🌐</span>
        <span class="language-current">${LANGS[currentLang].short}</span>
      </button>
      <div class="language-panel" id="language-panel" hidden>
        <h2>Idioma</h2>
        <p>Escolha o idioma do site.</p>
        <div class="language-options">
          <button class="language-option" type="button" data-lang="pt"><span>Português</span><small>PT</small></button>
          <button class="language-option" type="button" data-lang="en"><span>English</span><small>EN</small></button>
          <button class="language-option" type="button" data-lang="es"><span>Español</span><small>ES</small></button>
        </div>
        <div class="language-status" aria-live="polite" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;"></div>
      </div>
    `;
    document.body.appendChild(widget);

    const toggle = widget.querySelector('.language-toggle');
    const panel = widget.querySelector('.language-panel');
    toggle.addEventListener('click', () => {
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      toggle.setAttribute('aria-expanded', String(willOpen));
    });
    widget.querySelectorAll('.language-option').forEach((button) => {
      button.addEventListener('click', () => {
        applyLanguage(button.dataset.lang, { announce: true });
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', (event) => {
      if (panel.hidden || widget.contains(event.target)) return;
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || panel.hidden) return;
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    });
  };

  const boot = () => {
    createWidget();
    applyLanguage(currentLang);
    const observer = new MutationObserver(() => {
      if (translating) return;
      window.clearTimeout(window.__carteadoI18nTimer);
      window.__carteadoI18nTimer = window.setTimeout(() => applyLanguage(currentLang), 60);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
