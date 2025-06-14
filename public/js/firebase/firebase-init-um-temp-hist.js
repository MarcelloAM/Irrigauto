import { initFirebaseCompat } from './init/firebase-init.js';

await initFirebaseCompat();

var db = firebase.database();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("Usuário logado encontrado. UID:", user.uid);

        const uid = user.uid;
        const refTemperatura = db.ref('users/' + uid + '/sensor/temperatura');
        
        refTemperatura.on("value", (snapshot) => {
            const data = snapshot.val();
            const numeros = Object.keys(data);
            const ultimaChave = numeros[numeros.length -1];
            const ultimoValor = data[ultimaChave];
            console.log("Dados recuperados:", data);
            
            // Exemplo de exibição no HTML
            if(ultimoValor !=null){
                document.getElementById("saidaTemperatura").textContent = Math.round(ultimoValor);
            }else{
                document.getElementById("saidaTemperatura").textContent = '0';
            }

            criarOuAtualizarGraficoTemperatura(ultimoValor);
            
        });
    }
});


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("Usuário logado encontrado. UID:", user.uid);

        const uid = user.uid;
        const refUmidade = db.ref('users/' + uid + '/sensor/umidade');

        refUmidade.on("value", (snapshot) => {
            const data = snapshot.val();
            const numeros = Object.keys(data);
            const ultimaChave = numeros[numeros.length -1];
            const ultimoValor = data[ultimaChave];

            console.log("Dados recuperados:", data);
            

            if(ultimoValor!=null){
                document.getElementById("saidaUmidade").textContent = ultimoValor;
            }else{
                document.getElementById("saidaUmidade").textContent = "0";
            }

            criarOuAtualizarGraficoUmidade(ultimoValor);
        });
    }
});