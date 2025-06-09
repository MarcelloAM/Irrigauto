import appPrincipal from '../init/firebase-init.js';

document.addEventListener("DOMContentLoaded", function() {
    const nomeUsuarioLogadoElement = document.getElementById("nomeUsuarioLogado");

    if (!nomeUsuarioLogadoElement) {
        console.error("Elemento com ID 'nomeUsuarioLogado' não encontrado no HTML.");
        // return; // Você pode decidir parar aqui ou continuar sem exibir o nome
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Usuário está logado
            console.log("Usuário logado no dashboard:", user.uid, user.email);
            
            if (nomeUsuarioLogadoElement) {
                nomeUsuarioLogadoElement.textContent = "Buscando nome..."; // Feedback visual
            }

            const uid = user.uid;
            const db = firebase.database(); // Inicializa o acesso ao DB aqui

            // Buscar os dados do usuário no Realtime Database
            db.ref('users/' + uid).once('value')
                .then((snapshot) => {
                    let nomeExibicao = user.displayName || user.email; // Fallback inicial

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
                        nomeUsuarioLogadoElement.textContent = user.displayName || user.email || "Usuário"; // Fallback em caso de erro no DB
                    }
                });

        } else {
            // Usuário não está logado
            console.log("Nenhum usuário logado. Redirecionando para login...");
            if (nomeUsuarioLogadoElement) {
                nomeUsuarioLogadoElement.textContent = "Visitante";
            }
            // Redirecionar para a página de login se não estiver logado e esta página for protegida
            // Certifique-se de que o caminho para login.html está correto e que você não está
            // criando um loop de redirecionamento se esta já for uma página acessível sem login.
            // Exemplo: window.location.href = '../login/login.html'; 
        }
    });
});