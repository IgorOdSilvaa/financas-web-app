const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const loader = document.getElementById("loader"); // Referência ao loader

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

document.addEventListener('DOMContentLoaded', function() {
  loader.classList.add("hidden");
});

// Verifica se o usuário já está autenticado
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location.href = "pages/home/home.html";
    } 
});

// Função de Login com Loader
function login() {
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;

  loader.classList.remove("hidden"); // Exibe o loader

  firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
          window.location.href = "pages/home/home.html";
      })
      .catch(error => {
          alert(getErrorMessage(error));
      })
      .finally(() => {
          loader.classList.add("hidden"); // Esconde o loader após o processo
      });
}

// Função de Cadastro com Loader
function register() {
  const email = document.querySelector("#register-email").value;
  const nome = document.querySelector("#register-nome").value;
  const password = document.querySelector("#register-password").value;

  loader.classList.remove("hidden"); // Exibe o loader

  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
          const user = userCredential.user;
          return user.updateProfile({
              displayName: nome
          });
      })
      .then(() => {
          alert('Bem-vindo, Pechincheiro ' + nome);
          window.location.href = "pages/home/home.html";
      })
      .catch(error => {
          alert(getErrorMessage(error));
      })
      .finally(() => {
          loader.classList.add("hidden"); // Esconde o loader
      });
}

// Função de Recuperação de Senha com Loader
function recoverPassword() {
  const email = document.querySelector("#login-email").value;

  if (!email) {
      alert("Digite seu e-mail para recuperar a senha!");
      return;
  }

  loader.classList.remove("hidden"); // Exibe o loader

  firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
          alert('Email enviado com sucesso!');
      })
      .catch((error) => {
          alert("Erro ao enviar email: " + error.message);
      })
      .finally(() => {
          loader.classList.add("hidden"); // Esconde o loader
      });
}

// Função de Logout
function logout() {

    firebase.auth().signOut()
        .then(() => {
            alert("Logout realizado com sucesso!");
            window.location.href = "../../index.html"; // Redireciona para a tela de login
        })
        .catch(error => {
            alert("Erro ao fazer logout: " + error.message);
        });
}

// Função de Captura de Erros
function getErrorMessage(error) {
  switch (error.code) {
      case "auth/invalid-email":
          return "O email inserido é inválido.";
      case "auth/user-disabled":
          return "Esta conta foi desativada.";
      case "auth/user-not-found":
          return "Usuário não encontrado.";
      case "auth/wrong-password":
          return "Senha incorreta.";
      default:
          return "Ocorreu um erro. Tente novamente.";
  }
}
