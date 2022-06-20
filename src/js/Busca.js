import { ApiProdutos } from "./ApiProdutos.js"
export class Busca {

    static async pesquisa(nomeProduto) {
        const apiProdutos = await ApiProdutos.getProdutos()
        const produtoFiltrado = apiProdutos.filter(produto => {

            const {nome} = produto

            const nomeMinusculo = nomeProduto.toLowerCase().trim()
            const nomeProdutoMinusculo = nome.toLowerCase()

            if(nomeProdutoMinusculo.includes(nomeMinusculo)) {
                return produto
            }
        })
        
        return produtoFiltrado
    }
}