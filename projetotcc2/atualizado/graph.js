const ctxBarra = document.getElementById('meuGraficoDeBarras').getContext('2d'); // Use um novo ID para o canvas
const meuGraficoDeBarras = new Chart(ctxBarra, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], // Adicione os rótulos para o eixo x
        datasets: [{
            label: 'Umidade ( % )', // Adicione um rótulo para o conjunto de dados
            data: [62, 45, 37, 77, 83, 21], // Mantenha ou ajuste os valores
            backgroundColor: [
                'rgb(19, 51, 34)' // Adapte as cores se desejar
            ],
            borderColor: [
                'rgb(19, 51, 34)'
            ],
            borderWidth: 1
        },{
            label: 'Temperatura ( °C )', // Adicione um rótulo para o conjunto de dados
            data: [27, 31, 34, 29, 32, 37], // Mantenha ou ajuste os valores
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
                beginAtZero: true, // Começar o eixo y em 0 é comum em gráficos de barra
                max: 100 // Se você quiser manter o eixo Y até 100
                
            }
        }
    }
});