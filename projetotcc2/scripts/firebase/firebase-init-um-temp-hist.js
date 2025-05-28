const firebaseConfig = {
        apiKey: "AIzaSyCnZwEWoH2mB7kP22VWpk6Yg0e1wSVM7nY",
        authDomain: "teste-eps32.firebaseapp.com",
        databaseURL: "https://teste-eps32-default-rtdb.firebaseio.com",
        projectId: "teste-eps32",
        storageBucket: "teste-eps32.firebasestorage.app",
        messagingSenderId: "305904811162",
        appId: "1:305904811162:web:8002a05558d53b68267323",
        measurementId: "G-KSGTZGKCDD"
};

firebase.initializeApp(firebaseConfig);


var db = firebase.database();
var refTemperatura = db.ref("sensor/temperatura/");
var refUmidade = db.ref("sensor/umidade/");
var refHistorico = db.ref("historico/");



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
    
    
});
