const change_password_btn = document.querySelector("#change-password-btn");

// Função de Alteração de Senha com Loader
function changePassword() {
  const currentPassword = document.querySelector("#current-password").value;
  const newPassword = document.querySelector("#new-password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  // Verificar se as senhas coincidem
  if (newPassword !== confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }

  const user = firebase.auth().currentUser;

  if (user) {
    // Reautenticar o usuário com a senha atual
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);

    user.reauthenticateWithCredential(credentials)
      .then(() => {
        // Atualizar a senha do usuário
        user.updatePassword(newPassword)
          .then(() => {
            alert("Senha alterada com sucesso!");
            window.location.href = "../perfil/perfil.html"; // Redireciona para a página de perfil
          })
          .catch(error => {
            alert(getErrorMessage(error));
          })
      })
      .catch(error => {
        alert("Erro na autenticação: " + getErrorMessage(error));
      })
      .finally(() => {
      });
  } else {
    alert("Usuário não autenticado.");
    // window.location.href = "../../index.html"; // Redireciona para a página de perfil
  }
}
// Captura o clique do botão de alterar senha
change_password_btn.addEventListener("click", changePassword);

// Função de Captura de Erros
function getErrorMessage(error) {
  switch (error.code) {
      case "auth/weak-password":
          return "A nova senha deve ter pelo menos 6 caracteres.";
      case "auth/invalid-email":
          return "O email inserido é inválido.";
      case "auth/user-not-found":
          return "Usuário não encontrado.";
      case "auth/wrong-password":
          return "Senha incorreta.";
      case "auth/requires-recent-login":
          return "Você precisa fazer login novamente para alterar a senha.";
      default:
          return "Ocorreu um erro. Tente novamente.";
  }
}
