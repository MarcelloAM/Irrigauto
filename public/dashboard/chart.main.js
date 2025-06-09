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
                'rgb(83, 117, 58)'  
            ],
           
        }]
    };

    
    if (!meuGraficoDeRosca) {
        meuGraficoDeRosca = new Chart(ctx2.getContext('2d'), {
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
        meuGraficoDeRosca.data.datasets[0].data = dataParaGrafico.datasets[0].data;
        meuGraficoDeRosca.update();
    }
}
