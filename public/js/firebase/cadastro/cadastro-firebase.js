import { initFirebaseCompat } from '../init/firebase-init.js';

await initFirebaseCompat();
    
const form = document.querySelector("form");
const primeironomeInput = document.getElementById("primeiro-nome");
const ultimonomeInput = document.getElementById("ultimo-nome");
const emailInput = document.getElementById("email-cadastro");
const senhaInput = document.getElementById("senha-cadastro");
const confirmarSenhaInput = document.getElementById("confirmar-senha");


form.addEventListener("submit", function (e) {
  e.preventDefault(); 

  const primeironome = primeironomeInput.value.trim();
  const ultimonome = ultimonomeInput.value.trim();
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();
  const confirmarSenha = confirmarSenhaInput.value.trim();

  if (!primeironome || !email || !senha || !confirmarSenha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem. Por favor, verifique.");
    return;
  }
  
  register(email,confirmarSenha,primeironome,ultimonome);
});

function register(email,confirmarSenha, primeiroNome, ultimoNome){
  firebase.auth().createUserWithEmailAndPassword(email,confirmarSenha).then((userCredential) =>{

    const user = userCredential.user;
    const uid = user.uid;
    console.log("Usuário criado no Auth com UID:", uid);

    return user.updateProfile({
        displayName: `${primeiroNome} ${ultimoNome}`
    }).then(() => {
        console.log("DisplayName atualizado no perfil do Auth.");
        
        const db = firebase.database();
        return db.ref('users/' + uid).set({
          primeiroNome: primeiroNome,
          sobrenome: ultimoNome,
          email: email, 
          dataCadastro: new Date().toISOString()
      });
    });
  }).then(() => {
      // esse .then() e executado apos o updateProfile e o set no realtime serem derem certo
      console.log("Dados do usuário salvos no Realtime Database!");
      window.location.href = '../index.html'; 
      
  }).catch((error) => {
      console.error("Erro detalhado ao cadastrar usuário:", error);
      
      let mensagemErro = "Ocorreu um erro durante o cadastro. Tente novamente.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          mensagemErro = "Este endereço de e-mail já está em uso por outra conta.";
          break;
        case 'auth/invalid-email':
          mensagemErro = "O endereço de e-mail fornecido não é válido.";
          break;
        case 'auth/weak-password':
          mensagemErro = "A senha fornecida é muito fraca. Por favor, use uma senha com pelo menos 6 caracteres.";
          break;
        default:
          mensagemErro = `Erro: ${error.message}`; 
      }
      alert(mensagemErro);
    });
}
