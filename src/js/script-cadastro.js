const statusMsg = document.getElementById("status");
const kenzieFood = document.getElementById("kenzie");

class Usuario {
  static async cadastroNovoUsuario(usuario) {
    const response = await fetch(
      "https://kenzie-food-api.herokuapp.com/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      }
    );
    if (response.status === 201) {
      statusMsg.className = "successMsg";
      statusMsg.innerHTML = "";

      statusMsg.innerHTML =
        "Cadastro feito com sucesso, você será redirecionado em 5 segundos.";
      setTimeout(function () {
        window.location.href = "/login.html";
      }, 5000);
    } else if (response.status === 409) {
      statusMsg.className = "errorMsg";
      statusMsg.innerHTML = "Erro: Usuário ou Email já cadastrados";
    }
  }

  static async cadastroUsuariosWeb(e) {
    e.preventDefault();

    const inputNome = document.getElementById("nome").value;
    const inputEmail = document.getElementById("email").value;
    const inputSenha = document.getElementById("senha").value;

    const objUsuarioCriacao = {
      name: `${inputNome}`,
      email: `${inputEmail}`,
      password: `${inputSenha}`,
    };

    await Usuario.cadastroNovoUsuario(objUsuarioCriacao);
  }
}

const button = document.getElementById("button");
button.addEventListener("click", Usuario.cadastroUsuariosWeb);

kenzieFood.addEventListener("click", function () {
  window.location.href = "/index.html";
});
