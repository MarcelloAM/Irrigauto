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
    const mensagemArray = [];
    let dataString = '';
    let horarioString = '';

    for (let i = 0; i < partes.length; i++) {
        if (partes[i].includes('/') && partes[i].length === 10) { // (DD/MM/YYYY)
            dataString = partes[i];
        } else if (partes[i].includes(':') && partes[i].length === 8) { //(HH:MM:SS)
            horarioString = partes[i];
        } else {
            mensagemArray.push(partes[i]);
        }
    }
    const mensagem = mensagemArray.join(' ');
    const cleanedMessage = mensagem.replace(dataString, '').replace(horarioString, '').trim();

    return {
        data: dataString || 'N/A',
        hora: horarioString || 'N/A',
        status: cleanedMessage || 'N/A',
        // Adicione aqui a lógica para umidade e temperatura se estiverem na string
        // umidade: '...',
        // temperatura: '...'
    };
}

refHistorico.orderByKey().limitToLast(5).on("value", (snapshot) => {
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