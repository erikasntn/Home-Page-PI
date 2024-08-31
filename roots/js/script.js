
document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false; // Flag para garantir que a animação aconteça apenas uma vez

  // Função para animar os contadores
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const velocidadeContador = target / 100; //velocidade do contador
      const formatNumber = num => num.toLocaleString('pt-BR');

      const updateCount = () => {
        count = Math.min(count + velocidadeContador, target);
        counter.innerText = `+${formatNumber(Math.floor(count))}`;
        if (count < target) {
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = `+${formatNumber(target)}`;
        }
      };

      updateCount();
    });
  };

  // Configuração do IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        // Inicia a animação apenas quando a seção entra na viewport
        animateCounters();
        hasAnimated = true; // Marca a animação como já realizada
        observer.disconnect(); // Desconecta o observer após a animação iniciar
      }
    });
  }, {
    threshold: 0.5 // A seção deve estar pelo menos 50% visível para iniciar a animação
  });

  observer.observe(document.querySelector('#fourth-container'));
});

