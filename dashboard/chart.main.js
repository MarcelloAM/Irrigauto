let meuGraficoDeRosca = null; 

function criarOuAtualizarGraficoTemperatura(valorTemperatura) {
    // Garante que o valor seja um número
    const valorNumerico = parseInt(valorTemperatura);
    const ctx2 = document.getElementById('meuGraficoDeRosca');
    

    const dataParaGrafico = {
        datasets: [{
            data: [valorNumerico, 100 - valorNumerico],
            backgroundColor: [
                'rgb(19, 51, 34)',
                'rgb(83, 117, 58)'  // Um cinza claro para o restante
            ],
           
        }]
    };

    // Se o gráfico ainda não foi criado, crie-o
    if (!meuGraficoDeRosca) {
        meuGraficoDeRosca = new Chart(ctx2.getContext('2d'), {
            type: 'doughnut',
            data: dataParaGrafico,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // Esconde a legenda
                    }
                }
            }
        });
    } else {
        // Se o gráfico já existe, apenas atualize os dados
        meuGraficoDeRosca.data.datasets[0].data = dataParaGrafico.datasets[0].data;
        meuGraficoDeRosca.update();
    }
}
