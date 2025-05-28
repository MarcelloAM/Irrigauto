setTimeout(() => {
    const ctx = document.getElementById('meuGraficoDeRosca').getContext('2d');
    var a = document.getElementById("saidaTemperatura").textContent;
    console.log(a)
    const b = parseInt(a);
    const meuGraficoDeRosca = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
            data: [b, 60-b],
                backgroundColor: [
                    'rgb(19, 51, 34)',
                    'rgb(83, 117, 58)'
                ],
            }]
        },
    });
}, 1500);