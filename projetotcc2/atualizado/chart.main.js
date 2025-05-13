const ctx = document.getElementById('meuGraficoDeRosca').getContext('2d');
const meuGraficoDeRosca = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
        data: [32, 68],
            backgroundColor: [
                'rgb(19, 51, 34)',
                'rgb(83, 117, 58)'
            ],
        }]
    },
});