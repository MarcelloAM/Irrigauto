let meuSegundoGraficoDeRosca = null; 

function criarOuAtualizarGraficoUmidade(valorUmidade) {
    // Garante que o valor seja um número
    const valorNumerico = parseInt(valorUmidade);
    const ctx2 = document.getElementById('meuSegundoGraficoDeRosca');
    

    const dataParaGrafico = {
        datasets: [{
            data: [valorNumerico, 100 - valorNumerico],
            backgroundColor: [
                'rgb(19, 51, 34)',
                'rgb(83, 117, 58)'  
            ],
           
        }]
    };

    if (!meuSegundoGraficoDeRosca) {
        meuSegundoGraficoDeRosca = new Chart(ctx2.getContext('2d'), {
            type: 'doughnut',
            data: dataParaGrafico,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false 
                    }
                }
            }
        });
    } else {
        // Se o gráfico já existe, apenas atualize os dados
        meuSegundoGraficoDeRosca.data.datasets[0].data = dataParaGrafico.datasets[0].data;
        meuSegundoGraficoDeRosca.update();
    }
}
