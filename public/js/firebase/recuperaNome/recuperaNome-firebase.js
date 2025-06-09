import { initFirebaseCompat } from '../init/firebase-init.js';

await initFirebaseCompat();


const nomeUsuarioLogadoElement = document.getElementById("nomeUsuarioLogado");

if (!nomeUsuarioLogadoElement) {
    console.error("Elemento com ID 'nomeUsuarioLogado' não encontrado no HTML.");
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Usuário está logado
        console.log("Usuário logado no dashboard:", user.uid, user.email);
        
        if (nomeUsuarioLogadoElement) {
            nomeUsuarioLogadoElement.textContent = "Buscando nome..."; 
        }

        const uid = user.uid;
        const db = firebase.database(); 

       
        db.ref('users/' + uid).once('value')
            .then((snapshot) => {
                let nomeExibicao = user.displayName || user.email; 

                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    console.log("Dados do perfil recuperados do DB:", userData);
                    
                    if (userData.primeiroNome) {
                        nomeExibicao = userData.primeiroNome;
                        if (userData.sobrenome) {
                            nomeExibicao += " " + userData.sobrenome;
                        }
                    }

                } else {
                    console.log("Nenhum dado de perfil adicional encontrado no Realtime Database. Usando fallback.");
                }

                if (nomeUsuarioLogadoElement) {
                    nomeUsuarioLogadoElement.textContent = nomeExibicao;
                }

            })
            .catch((error) => {
                console.error("Erro ao buscar dados do perfil do usuário:", error);
                if (nomeUsuarioLogadoElement) {
                    nomeUsuarioLogadoElement.textContent = user.displayName || user.email || "Usuário"; 
                }
            });

    } else {
       
        console.log("Nenhum usuário logado. Redirecionando para login...");
        if (nomeUsuarioLogadoElement) {
            nomeUsuarioLogadoElement.textContent = "Visitante";
        }
        
    }
});
