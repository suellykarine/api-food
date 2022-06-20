const inputLogin = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const buttonLogin = document.getElementById("login");
const errorMessage = document.getElementById("error");
const kenzieFood = document.getElementById("kenzie");
class Adm {
  static API_URL = "https://kenzie-food-api.herokuapp.com/auth/";

  static async login(path, data) {
    const response = await fetch(`${this.API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const token = await response.json();
    if (response.status === 200) {
      window.location.href = "/index.html";
      localStorage.setItem("token", JSON.stringify(token));
    } else if (response.status === 401) {
      errorMessage.innerHTML = "Usuário ou Senha incorretos";
    }
  }
}

buttonLogin.addEventListener("click", function (event) {
  event.preventDefault();
  Adm.login("/login", {
    email: `${inputLogin.value}`,
    password: `${inputSenha.value}`,
  });
});

kenzieFood.addEventListener("click", function () {
  window.location.href = "/index.html";
});
