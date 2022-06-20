import {ApiDashboard} from "./apiDashboard.js"
import {DasboardController} from "./dashboardController.js"

let myProdutos = await ApiDashboard.getMyProducts();
DasboardController.listaProdutos = myProdutos;

if (localStorage.getItem("token")==null){
    window.location.href = "../../login.html";
}


document.querySelector(".logo-kenzie-food").addEventListener("click",DasboardController.irParaHome);

document.querySelector(".avatarUsuarioDashboard").addEventListener("mouseover",DasboardController.exibirDivLogout)

document.querySelector(".avatarUsuarioDashboard").addEventListener("mouseout",DasboardController.esconderDivLogout)

document.querySelector(".button-logout-dashboard").addEventListener("click",DasboardController.dashboardLogoff)




DasboardController.templateListaProdutos(myProdutos);

document.getElementById("button-adicionar-produto").addEventListener("click",DasboardController.modalAdicionarProduto);

document.getElementById("modal-adicionar-produto-button-cadastrar").addEventListener("click",DasboardController.adicionarNovoProduto);

document.querySelector(".modal-adicionar-produto-div-categorias").addEventListener("click",DasboardController.setarCategoria);
document.querySelector(".modal-editar-produto-div-categorias").addEventListener("click",DasboardController.setarCategoria);




document.getElementById("dashboard-pesquisa").addEventListener("keyup",DasboardController.filtroPesquisar);

const filtros = document.querySelectorAll(".main-filtros button");
[...filtros].forEach(btn => btn.addEventListener("click",DasboardController.filtrarListaProdutos));





