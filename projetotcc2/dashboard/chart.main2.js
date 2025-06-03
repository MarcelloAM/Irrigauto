setTimeout(() => {
    const ctx2 = document.getElementById('meuSegundoGraficoDeRosca').getContext('2d'); // Use um novo nome de variável (ctx2)
    var a = document.getElementById("saidaUmidade").textContent;
    console.log(a)
    const b = parseInt(a);
    const meuSegundoGraficoDeRosca = new Chart(ctx2, { // Use um novo nome de variável para a instância do gráfico
        type: 'doughnut',
        data: {
            datasets: [{
                data: [b, 100 - b],
                backgroundColor: [
                    'rgb(19, 51, 34)',
                    'rgb(83, 117, 58)'
                ]
            }]
        },
    });
}, 1500);

