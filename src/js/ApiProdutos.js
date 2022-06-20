import { Carrinho } from "./AdicionarCarrinho.js"
export class ApiProdutos {
    static urlApi = "https://kenzie-food-api.herokuapp.com/products"
    

    static async getProdutos() {
        
        const produtos = await fetch(`${this.urlApi}`)

        const produtosData = await produtos.json()
        const ul = document.querySelector('#Lista_Produtos')
        ul.innerHTML  =''
        produtosData.forEach(produto => {
            const templateProduto = this.template(produto)
            ul.appendChild(templateProduto)
        });
        
        return produtosData
    }

    static template(dadosProduto) {
        const {nome,imagem,categoria, preco,descricao,id} =  dadosProduto
        const li = document.createElement('li')
        const buttonCarrinho = document.createElement('button')
        const span = document.createElement('span')
        li.innerHTML = `
            <img src="${imagem}" alt="${nome}" class="imagem_li">
            <h2 class="nome_Produto">${nome}</h2>
            <p class="descricao_Produto">${descricao}</p>
            <p class="categoria_Produto">${categoria}</p>
        `
        span.innerHTML = `${preco.toFixed(2)}`
        buttonCarrinho.innerHTML = 'Carrinho'
        buttonCarrinho.id = id

        span.classList.add('preco_produto')
        buttonCarrinho.classList.add('btn_Carrinho')
        li.classList.add('li_Produtos')
        buttonCarrinho.addEventListener('click', Carrinho.templateCarrinho)
        li.appendChild(span)
        li.appendChild(buttonCarrinho)


        return li
    }
}