

const key = "0fa0f840559914285be969c0cbcb8a3d"

function colocarDadosNaTela(dados){
    document.querySelector(".city").innerHTML = "Tempo em " + dados.name
    document.querySelector(".city-temp").innerHTML = "Temperatura: " + Math.floor(dados.main.temp) + "ºC"
    document.querySelector(".text-weather").innerHTML = dados.weather[0].description
    document.querySelector(".city-humidity").innerHTML = "Umidade: " + dados.main.humidity + "%"
    document.querySelector(".img-weather").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`

}   

const city = "manaus"
buscarCidade(city)

async function buscarCidade(city){

    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`).then( resposta => resposta.json())
    
    colocarDadosNaTela(dados);
}


function clickButton(){
    const city = document.querySelector(".input-city").value

    buscarCidade(city)
}