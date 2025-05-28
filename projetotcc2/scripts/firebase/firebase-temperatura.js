import firebaseApp from './init/firebase-init.js';


var db = firebase.database();
var refTemperatura = db.ref("sensor/temperatura/");

const refUltimasTemperaturas = db.ref("sensor/temperatura/").orderByKey().limitToLast(10);

refTemperatura.on("value", (snapshot) => {
    const data = snapshot.val();
    const numeros = Object.keys(data);
    const ultimaChave = numeros[numeros.length -1];
    const ultimoValor = data[ultimaChave];
    console.log("Dados recuperados:", data);
    
    // Exemplo de exibição no HTML
    document.getElementById("saidaTemperatura").textContent = ultimoValor;
    
});

refUltimasTemperaturas.on("value", (snapshot) => {
    
    if (snapshot.exists()) {
        const temperaturasArray = [];
    
        snapshot.forEach((childSnapshot) => {
            temperaturasArray.push(childSnapshot.val());
        });

        let mediaTemperatura = 0.0;
        let somaTemperaturas = 0;

        if (temperaturasArray.length === 0) {
            console.log("Nenhum dado encontrado");
        } else {
            temperaturasArray.forEach((temperaturaValor) => {
                somaTemperaturas += temperaturaValor;
            });
        }
        
        mediaTemperatura =   somaTemperaturas / temperaturasArray.length;
        
        console.log("Leituras de umidade consideradas:", temperaturasArray);
        console.log(Math.round(mediaTemperatura));

        document.getElementById("mediaTemperatura").textContent = Math.round(mediaTemperatura)+"°C";

    }
    
});