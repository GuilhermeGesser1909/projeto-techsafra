document.addEventListener('DOMContentLoaded', function () {
  const botoes = document.querySelectorAll('.sidebar button');
  const secoes = document.querySelectorAll('section[id^="section"]');

  function mostrarSecao(idBotao, idSecao) {

    secoes.forEach(secao => secao.style.display = 'none');
    botoes.forEach(b => b.classList.remove('ativo'));
    document.querySelector(idSecao).style.display = 'block';
    document.querySelector(idBotao).classList.add('ativo');
  }
  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const id = botao.getAttribute('id');
      const numero = id.replace('botao', '');
      mostrarSecao(`#${id}`, `#section${numero}`);
    });
  });

  mostrarSecao('#botao1', '#section1');
});