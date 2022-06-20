import { ApiProdutos } from "./ApiProdutos.js"
export class Carrinho {
    
    static total = 0
    static totalRemover = 0
    static precoTotal = document.querySelector('.preco_total')
    static divCarrinho = document.querySelector('.produtos_Carrinho')
    static quantidadeProduto = document.querySelector('.quantidade_produto')
    
    static arrayCarrinho = []


    static atualizarPrecoCarrinho(event) {
        const btnComprarCarinho = event.target.closest('li').children[4].textContent
        
        Carrinho.precoTotal.innerHTML = 'Preco Total: R$'
        Carrinho.total += Number(btnComprarCarinho)
        
    
        Carrinho.precoTotal.innerText += Carrinho.total 
        
        
    }

    static desatualizarPrecoCarrinho(event) {
        const btnremoverCarinho = event.target.closest('li').children[3].textContent

        const subtraçaoPreco  = Carrinho.totalRemover -= Number(btnremoverCarinho)
        

        Carrinho.precoTotal.innerText = `Preco Total: R$${Carrinho.totalRemover + Carrinho.total}`

    }

    static async templateCarrinho(event) {
        let logado = JSON.parse(localStorage.getItem('token'))
        if(logado === null) {
            const mensagemLogin = document.createElement('p')
        
            mensagemLogin.innerHTML = 'Para adicionar produtos no carrinho você tem que estar logado'
            Carrinho.divCarrinho.appendChild(mensagemLogin)

        }else{

            const apiProdutos = await ApiProdutos.getProdutos()
            const btnComprar = event.target
            const carrinhoVazio = document.querySelector('#carrinho_vazio')
            carrinhoVazio.innerHTML = ''
            
            
            const produto = apiProdutos.find(produto => produto.id === parseInt(btnComprar.id))
            const encontrarProduto = Carrinho.arrayCarrinho.find(item => item.id === produto.id)
            if(encontrarProduto !== undefined) {
                Carrinho.arrayCarrinho.forEach(produto => {
                    if(produto.id === encontrarProduto.id) {
                        produto.quantidade += 1
                    }
                })
            }else {
                produto.quantidade = 1
                Carrinho.arrayCarrinho.push(produto)
            }
    
            
            Carrinho.templateCriarCarrinho(Carrinho.arrayCarrinho)
            Carrinho.atualizarPrecoCarrinho(event)
        }
    }

    
    static async removerProduto(event) {
        const btnRemover = event.target
        const carrinhoNovo = []

        Carrinho.arrayCarrinho.forEach(produto => {
            if(produto.id === parseInt(btnRemover.id)) {
                if(produto.quantidade > 1) {
                    produto.quantidade -= 1
                    carrinhoNovo.push(produto)
                }
                
            }else {
                
                carrinhoNovo.push(produto)
                
            }
        })
        Carrinho.arrayCarrinho = carrinhoNovo
        Carrinho.templateCriarCarrinho(Carrinho.arrayCarrinho)
        
        Carrinho.desatualizarPrecoCarrinho(event)
    }

    
    static templateCriarCarrinho(array) {
        const div = Carrinho.divCarrinho
        div.innerHTML = ''
        
        array.forEach(produto => {
            const li  = document.createElement('li')
            const removerItem = document.createElement('button')
            const { nome, imagem, categoria, preco, id, quantidade} = produto
            li.innerHTML = `
                    <img src="${imagem}" alt="${nome}" class="imagem_Carrinho">
                    <h3 class="nome_ProdutoCarrinho">${nome}</h3>
                    <p class="categoria_ProdutoCarrinho">${categoria}</p>
                    <p class="preco_Carrinho">${preco.toFixed(2)}</p>
                    <p>quantidade produto ${quantidade}</p>    
                `
                li.setAttribute('id', 'liCarrinho')
                removerItem.innerHTML = 'Remover'
                removerItem.id = id
                removerItem.addEventListener('click', Carrinho.removerProduto)
                removerItem.classList.add('button_remover')
                li.classList.add('li_Carrinho')
                Carrinho.precoTotal.classList.add('preco_total_Carrinho')
                //Carrinho.quantidadeProduto.classList.add('quantidade_produto_carrinho')
                //Carrinho.quantidadeProduto.innerHTML = `Quantidade Produto: ${quantidade}`
                
                li.appendChild(removerItem)
                Carrinho.divCarrinho.appendChild(li)
                localStorage.setItem("carrinho", JSON.stringify(Carrinho.arrayCarrinho));

        })
    }
}