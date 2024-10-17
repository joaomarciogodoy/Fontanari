document.addEventListener('DOMContentLoaded', function() {
    const botaoEsquerda = document.getElementById('botao-esquerda');
    const botaoDireita = document.getElementById('botao-direita');
    const votosEsquerda = document.getElementById('votos-esquerda');
    const votosDireita = document.getElementById('votos-direita');
    const mensagemFeedback = document.getElementById('mensagem-feedback');
  
    // Função para atualizar a contagem de votos
    function atualizarVotos() {
      fetch('/votos')
        .then(response => response.json())
        .then(data => {
          votosEsquerda.textContent = data.esquerda || 0;
          votosDireita.textContent = data.direita || 0;
        })
        .catch(error => console.error('Erro ao obter contagem de votos:', error));
    }
  
    // Função para exibir a mensagem de feedback
    function exibirMensagem(mensagem) {
      mensagemFeedback.textContent = mensagem;
      mensagemFeedback.style.display = 'block';
  
      // Ocultar a mensagem após 3 segundos
      setTimeout(() => {
        mensagemFeedback.textContent = '';
      }, 3000);
    }
  
    // Enviar voto para o lado esquerdo
    botaoEsquerda.addEventListener('click', () => {
      fetch('/votar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lado: 'esquerda' }),
      })
      .then(() => {
        atualizarVotos();
        exibirMensagem('Você votou na Esquerda!');
      })
      .catch(error => console.error('Erro ao votar na esquerda:', error));
    });
  
    // Enviar voto para o lado direito
    botaoDireita.addEventListener('click', () => {
      fetch('/votar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lado: 'direita' }),
      })
      .then(() => {
        atualizarVotos();
        exibirMensagem('Você votou na Direita!');
      })
      .catch(error => console.error('Erro ao votar na direita:', error));
    });
  
    // Atualizar a contagem de votos ao carregar a página
    atualizarVotos();
  });
  