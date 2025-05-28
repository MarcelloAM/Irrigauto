let data = new Date();

let dia = data.getDate();
let mes = data.getMonth() + 1; 
let ano = data.getFullYear();
let hora = data.getHours();
let minuto = data.getMinutes();
let segundo = data.getSeconds();


let horaAtual = hora + ":" + minuto + ":" + segundo;
let bombaAcionada = (dia + '/' + mes + '/' + ano) + ' ' + horaAtual;
console.log("Bomba acionada: " + bombaAcionada + horaAtual);

/*

if (nome-da-variavel-da-bomba == True) {
    let bombaAcionada = (dia + '/' + mes + '/' + ano) + ' ' + horaAtual;
    console.log("Bomba acionada: " + bombaAcionada);
}

*/


