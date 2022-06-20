import { ApiProdutos } from "./ApiProdutos.js";

export class Filtros {

    static arrayProdutos =  ApiProdutos.getProdutos()
    

    static filtroTodos() {
        const buttonPanificadora = document.querySelector('#btn-Panificadora')
        const buttonFrutas = document.querySelector('#btn-Frutas')
        const buttonTodos = document.querySelector('#btn-Todos')
        buttonTodos.classList.add('todos')
        buttonTodos.classList.remove('removerCor')
        buttonFrutas.classList.remove('buttonPanificadora')
        buttonPanificadora.classList.remove('buttonPanificadora')
        const buttonBebidas = document.querySelector('#btn-Bebidas')
        buttonBebidas.classList.remove('buttonPanificadora')
        return ApiProdutos.getProdutos()
    }


    static async filtroPanificadora() {
        const ul = document.querySelector('#Lista_Produtos')
        const buttonPanificadora = document.querySelector('#btn-Panificadora')
        const buttonFrutas = document.querySelector('#btn-Frutas')
        const buttonTodos = document.querySelector('#btn-Todos') 
        buttonFrutas.classList.remove('buttonPanificadora')
        const buttonBebidas = document.querySelector('#btn-Bebidas')
        buttonBebidas.classList.remove('buttonPanificadora')
        buttonTodos.classList.add('removerCor')
        const apiProdutos = await ApiProdutos.getProdutos()
        ul.innerHTML = ''
        buttonPanificadora.classList.add('buttonPanificadora')
        apiProdutos.filter(produto => {
            if(produto.categoria === 'Panificadora') {
                ul.appendChild(ApiProdutos.template(produto))
            }
            
        
        });
    }

    static async filtroFrutas() {
        const buttonTodos = document.querySelector('#btn-Todos') 
        const buttonPanificadora = document.querySelector('#btn-Panificadora')
        const ul = document.querySelector('#Lista_Produtos')
        const buttonFrutas = document.querySelector('#btn-Frutas')
        buttonFrutas.classList.add('buttonPanificadora')
        const buttonBebidas = document.querySelector('#btn-Bebidas')
        buttonBebidas.classList.remove('buttonPanificadora')
        buttonTodos.classList.add('removerCor')
        const apiProdutos = await ApiProdutos.getProdutos()
        ul.innerHTML = ''
        buttonPanificadora.classList.remove('buttonPanificadora')
        apiProdutos.filter(produto => {
            if(produto.categoria === 'Frutas') {
                ul.appendChild(ApiProdutos.template(produto))
            }
            
        });

    }

    static async filtroBebidas() {
        const buttonTodos = document.querySelector('#btn-Todos') 
        const buttonPanificadora = document.querySelector('#btn-Panificadora')
        const ul = document.querySelector('#Lista_Produtos')
        const buttonFrutas = document.querySelector('#btn-Frutas')
        buttonFrutas.classList.remove('buttonPanificadora')
        const buttonBebidas = document.querySelector('#btn-Bebidas')
        buttonTodos.classList.add('removerCor')
        buttonBebidas.classList.add('buttonPanificadora')
        const apiProdutos = await ApiProdutos.getProdutos()
        ul.innerHTML = ''
        buttonPanificadora.classList.remove('buttonPanificadora')
        apiProdutos.filter(produto => {
            if(produto.categoria === 'Bebidas') {
                ul.appendChild(ApiProdutos.template(produto))
            }
            
        });

    }
}