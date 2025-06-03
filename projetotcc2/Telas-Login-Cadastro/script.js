document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const manterConectado = document.getElementById("manter-conectado");

  // recuperar estado do checkbox do localStorage
  if (localStorage.getItem("manter-conectado") === "true") {
    manterConectado.checked = true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // evita o envio real do formulário

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // salvar estado do checkbox
    localStorage.setItem("manterConectado", manterConectado.checked);

    login(email,senha);
  });

  function login(email,senha){
    firebase.auth().signInWithEmailAndPassword(email,senha).then(response => {
        window.location.href = "../dashboard/index.html"; //tem que mudar essa referencia quando colocarem a tela principal no repositorio
    }).catch(error => {
        alert(error.code)
        console.log('error',response)
    });
    
  }

});
  

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const primeironomeInput = document.getElementById("primeiro-nome");
  const ultimonomeInput = document.getElementById("ultimo-nome");
  const emailInput = document.getElementById("email-cadastro");
  const senhaInput = document.getElementById("senha-cadastro");
  const confirmarSenhaInput = document.getElementById("confirmar-senha");


  form.addEventListener("submit", function (e) {
    e.preventDefault(); // evita o envio real do formulário

    const primeironome = primeironomeInput.value.trim();
    const ultimonome = ultimonomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();
    const confirmarSenha = confirmarSenhaInput.value.trim();

    if (!primeironome || !email || !senha || !confirmarSenha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    
    register(email,confirmarSenha);
  });

  function register(email,confirmarSenha){
    firebase.auth().createUserWithEmailAndPassword(email,confirmarSenha).then(() =>{
      window.location.href = 'login.html';
    }).catch(error => {
      alert(error.code)
      console.log('error',response)
    });
  }

});
