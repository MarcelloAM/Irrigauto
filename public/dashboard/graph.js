const ctxBarra = document.getElementById('meuGraficoDeBarras').getContext('2d'); 
const meuGraficoDeBarras = new Chart(ctxBarra, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], 
        datasets: [{
            label: 'Umidade ( % )', 
            data: [62, 45, 37, 77, 83, 21], 
            backgroundColor: [
                'rgb(19, 51, 34)' 
            ],
            borderColor: [
                'rgb(19, 51, 34)'
            ],
            borderWidth: 1
        },{
            label: 'Temperatura ( °C )', 
            data: [27, 31, 34, 29, 32, 37], 
            backgroundColor: [
                'rgb(83, 117, 58)'
            ],
            borderColor: [
                'rgb(83, 117, 58)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                responsive: false,
                beginAtZero: true, 
                max: 100 
                
            }
        }
    }
});