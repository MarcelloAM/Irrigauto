import firebaseApp from './init/firebase-init.js';


var db = firebase.database();
var refTemperatura = db.ref("sensor/temperatura/");
var refUmidade = db.ref("sensor/umidade/");
var refHistorico = db.ref("historico/");

const listaHistoricoContainer = document.getElementById('historicoMain');
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


refHistorico.on("value", (snapshot) => {
    const data = snapshot.val();
    const numeros = Object.keys(data);
    const ultimaChave = numeros[numeros.length -1];
    const ultimoValor = data[ultimaChave];

    console.log("Dados recuperados:", data);
    
    const partes = ultimoValor.split(' '); 
    
    // "Mensagem! DD/MM/YYYY HH:MM:SS"
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

  
    document.getElementById("historicoOrderStatus").textContent = cleanedMessage;
    document.getElementById("historicoOrderData").textContent = dataString;
    document.getElementById("historicoOrderHora").textContent = horarioString;
});

















// let data = new Date();

// let dia = data.getDate();
// let mes = data.getMonth() + 1; 
// let ano = data.getFullYear();
// let hora = data.getHours();
// let minuto = data.getMinutes();
// let segundo = data.getSeconds();


// let horaAtual = hora + ":" + minuto + ":" + segundo;
// let bombaAcionada = (dia + '/' + mes + '/' + ano) + ' ' + horaAtual;
// console.log("Bomba acionada: " + bombaAcionada + horaAtual);

/*

if (nome-da-variavel-da-bomba == True) {
    let bombaAcionada = (dia + '/' + mes + '/' + ano) + ' ' + horaAtual;
    console.log("Bomba acionada: " + bombaAcionada);
}

*/


