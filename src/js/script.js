import { ApiProdutos } from "./ApiProdutos.js";
import {Filtros} from "./filtros.js"
import {Busca} from "./Busca.js"
ApiProdutos.getProdutos()

const buttonTodos = document.querySelector('#btn-Todos') 
buttonTodos.addEventListener('click', Filtros.filtroTodos)


const buttonPanificadora = document.querySelector('#btn-Panificadora')
buttonPanificadora.addEventListener('click', Filtros.filtroPanificadora)


const buttonFrutas = document.querySelector('#btn-Frutas')
buttonFrutas.addEventListener('click',Filtros.filtroFrutas)


const buttonBebidas = document.querySelector('#btn-Bebidas')
buttonBebidas.addEventListener('click', Filtros.filtroBebidas)


const campoBusca = document.querySelector('#campoBusca')
const ul = document.querySelector('#Lista_Produtos')
campoBusca.addEventListener("keyup", async () => {
    const valueInput = campoBusca.value
    const buscaProduto = await Busca.pesquisa(valueInput)  
    ul.innerHTML = ''
    buscaProduto.forEach(produto => {
        const templateFiltrado =  ApiProdutos.template(produto)
        ul.appendChild(templateFiltrado)
    });
})

const buttonAdminPage = document.querySelector('#adminPage')

buttonAdminPage.addEventListener('click', ()=> {

    window.location.href = "../../dashboard.html";
})

const buttonLoginPage = document.querySelector('#btn_Login')

buttonLoginPage.addEventListener('click', ()=> {
    window.location.href = "../../login.html";

})