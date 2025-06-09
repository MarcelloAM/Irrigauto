import { initFirebaseCompat } from './init/firebase-init.js';

await initFirebaseCompat();


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

    //Formato exato de 5 partes (Status Data Hora Umidade Temperatura)
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
    else if (partes.length > 5) {
        
        const temperatura = partes[partes.length - 1];
        const umidade = partes[partes.length - 2];
        const horarioString = partes[partes.length - 3];
        const dataString = partes[partes.length - 4];
        
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
    listaHistoricoContainer.innerHTML = ''; 

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

   
    itemsParaExibir.reverse();

    itemsParaExibir.forEach(valorString => {
        const dadosFormatados = parseValorHistorico(valorString);

        const templateClone = itemTemplate.content.cloneNode(true);

        templateClone.querySelector(".historicoOrderData").textContent = dadosFormatados.data;
        templateClone.querySelector(".historicoOrderHora").textContent = dadosFormatados.hora;
        templateClone.querySelector(".historicoOrderStatus").textContent = dadosFormatados.status;
        templateClone.querySelector(".saidaUmidade").textContent = dadosFormatados.umidade;
        templateClone.querySelector(".saidaTemperatura").textContent = dadosFormatados.temperatura;
        
        templateClone.querySelector(".saidaUmidade").textContent = dadosFormatados.umidade || 'Umidade: --';
        templateClone.querySelector(".saidaTemperatura").textContent = dadosFormatados.temperatura || 'Temp.: --';

        listaHistoricoContainer.appendChild(templateClone);
    });

    console.log("Dados recuperados e exibidos.");

}, (error) => {
    console.error("Erro ao buscar dados do Firebase: ", error);
    listaHistoricoContainer.textContent = 'Erro ao carregar histórico.';
});