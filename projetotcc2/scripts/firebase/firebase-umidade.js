import firebaseApp from './init/firebase-init.js';


var db = firebase.database();
var refTemperatura = db.ref("sensor/temperatura/");
var refUmidade = db.ref("sensor/umidade/");
var refHistorico = db.ref("historico/");

const refUltimasUmidades = db.ref("sensor/umidade/").orderByKey().limitToLast(10);

refUmidade.on("value", (snapshot) => {
    const data = snapshot.val();
    const numeros = Object.keys(data);
    const ultimaChave = numeros[numeros.length -1];
    const ultimoValor = data[ultimaChave];

    console.log("Dados recuperados:", data);
    

    // Exemplo de exibição no HTML
    document.getElementById("saidaUmidade").textContent = ultimoValor + " %";
});

refUltimasUmidades.on("value", (snapshot) => {
    
    if (snapshot.exists()) {
        const umidadesArray = [];
    
        snapshot.forEach((childSnapshot) => {
            umidadesArray.push(childSnapshot.val());
        });

        let mediaUmidade = 0.0;
        let somaUmidades = 0;

        if (umidadesArray.length === 0) {
            console.log("Nenhum dado encontrado");
        } else {
            umidadesArray.forEach((umidadeValor) => {
                somaUmidades += umidadeValor;
            });
        }
        
        mediaUmidade =   somaUmidades / umidadesArray.length;
        
        console.log("Leituras de umidade consideradas:", umidadesArray);
        console.log(Math.round(mediaUmidade));

        document.getElementById("mediaUmidade").textContent = Math.round(mediaUmidade)+" %";

    }
    
});


const data = new Date();

const dia = data.getDate();
const mes = data.getMonth() + 1; 
const ano = data.getFullYear();
const hora = data.getHours();
const minuto = data.getMinutes();
const segundo = data.getSeconds();

const diaFormatado = String(dia).padStart(2, '0');
const mesFormatado = String(mes).padStart(2, '0');


const dataAtual = diaFormatado + "/" + mesFormatado + "/" + ano;
console.log(dataAtual);

document.getElementById("dataHoje").textContent = "Média de Hoje: "+ dataAtual;