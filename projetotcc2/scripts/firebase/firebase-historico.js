import firebaseApp from './init/firebase-init.js';


var db = firebase.database();
var refTemperatura = db.ref("sensor/temperatura/");
var refUmidade = db.ref("sensor/umidade/");
var refHistorico = db.ref("historico/");

const listaHistoricoContainer = document.getElementById('lista-historico-container');
const itemTemplate = document.getElementById('historico-item-template');

refTemperatura.on("value", (snapshot) => {
    const data = snapshot.val();
    const numeros = Object.keys(data);
    const ultimaChave = numeros[numeros.length -1];
    const ultimoValor = data[ultimaChave];
    console.log("Dados recuperados:", data);
    
    // Exemplo de exibição no HTML
    document.getElementById("saidaTemperatura").textContent = ultimoValor;
    
});


refUmidade.on("value", (snapshot) => {
    const data = snapshot.val();
    const numeros = Object.keys(data);
    const ultimaChave = numeros[numeros.length -1];
    const ultimoValor = data[ultimaChave];

    console.log("Dados recuperados:", data);
    

    // Exemplo de exibição no HTML
    document.getElementById("saidaUmidade").textContent = ultimoValor;
});


function parseValorHistorico(valorString) {
    const partes = valorString.split(' ');

    // Caso 1: Formato exato de 5 partes (Status Data Hora Umidade Temperatura)
    if (partes.length === 5) {
        const status = partes[0];
        const dataString = partes[1];
        const horarioString = partes[2];
        const umidade = partes[3];
        const temperatura = partes[4];

        // Validação básica do formato da data e hora
        const isValidDate = dataString && dataString.includes('/') && dataString.length === 10;
        const isValidTime = horarioString && horarioString.includes(':') && horarioString.length === 8;

        return {
            data: isValidDate ? dataString : 'Data Inválida',
            hora: isValidTime ? horarioString : 'Hora Inválida',
            status: status || 'N/A',
            umidade: umidade || '--',
            temperatura: temperatura || '--'
        };
    } 
    // Caso 2: Mais de 5 partes (Status com espaços, Data, Hora, Umidade, Temperatura)
    else if (partes.length > 5) {
        // As últimas 4 partes são Data, Hora, Umidade, Temperatura
        const temperatura = partes[partes.length - 1];
        const umidade = partes[partes.length - 2];
        const horarioString = partes[partes.length - 3];
        const dataString = partes[partes.length - 4];
        // Todo o resto no início é o status
        const status = partes.slice(0, partes.length - 4).join(' ');

        const isValidDate = dataString && dataString.includes('/') && dataString.length === 10;
        const isValidTime = horarioString && horarioString.includes(':') && horarioString.length === 8;

        return {
            data: isValidDate ? dataString : 'Data Inválida',
            hora: isValidTime ? horarioString : 'Hora Inválida',
            status: status || 'N/A',
            umidade: umidade || '--',
            temperatura: temperatura || '--'
        };
    } 
    // Caso 3: Formato inesperado (poucas partes)
    else {
        console.warn("String de histórico com formato inesperado (partes insuficientes):", valorString);
        return {
            data: 'N/A',
            hora: 'N/A',
            status: `Formato Inválido (${valorString})`,
            umidade: '--',
            temperatura: '--'
        };
    }
}

refHistorico.orderByKey().limitToLast(20).on("value", (snapshot) => {
    listaHistoricoContainer.innerHTML = ''; // Limpa o container antes de adicionar novos itens

    if (!snapshot.exists()) {
        listaHistoricoContainer.textContent = 'Nenhum histórico encontrado.';
        console.log("Nenhum dado no snapshot.");
        return;
    }

    const itemsParaExibir = [];
    snapshot.forEach((childSnapshot) => {
        // childSnapshot.val() é a string "Mensagem! DD/MM/YYYY HH:MM:SS"
        itemsParaExibir.push(childSnapshot.val());
    });

    // O Firebase retorna em ordem ascendente com limitToLast, então revertemos para ter o mais novo primeiro
    itemsParaExibir.reverse();

    itemsParaExibir.forEach(valorString => {
        const dadosFormatados = parseValorHistorico(valorString);

        const templateClone = itemTemplate.content.cloneNode(true);

        templateClone.querySelector(".historicoOrderData").textContent = dadosFormatados.data;
        templateClone.querySelector(".historicoOrderHora").textContent = dadosFormatados.hora;
        templateClone.querySelector(".historicoOrderStatus").textContent = dadosFormatados.status;
        templateClone.querySelector(".saidaUmidade").textContent = dadosFormatados.umidade;
        templateClone.querySelector(".saidaTemperatura").textContent = dadosFormatados.temperatura;
        
        // Para Umidade e Temperatura:
        // Se você tiver esses dados em 'dadosFormatados', pode preenchê-los aqui.
        // Por enquanto, eles ficarão vazios ou você pode colocar um placeholder.
        templateClone.querySelector(".saidaUmidade").textContent = dadosFormatados.umidade || 'Umidade: --';
        templateClone.querySelector(".saidaTemperatura").textContent = dadosFormatados.temperatura || 'Temp.: --';

        listaHistoricoContainer.appendChild(templateClone);
    });

    console.log("Dados recuperados e exibidos.");

}, (error) => {
    console.error("Erro ao buscar dados do Firebase: ", error);
    listaHistoricoContainer.textContent = 'Erro ao carregar histórico.';
});