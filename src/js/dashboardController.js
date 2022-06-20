import { ApiDashboard } from "./apiDashboard.js";


export class DasboardController {

    static listaProdutos;

    static exibirDivLogout(e){
        document.querySelector(".div-logout-dashboard").style.display="block";
    }

    static esconderDivLogout(e){
        setTimeout(()=> document.querySelector(".div-logout-dashboard").style.display="none", 3000);      
    }

    static dashboardLogoff(){
        localStorage.removeItem("token");
        window.location.href = "../../login.html";
    }

    static templateListaProdutos(produtos) {
        const divListaProdutos = document.querySelector(".div-lista-produtos");

        divListaProdutos.innerHTML = '';        

        produtos.forEach((produto, i) => {

            const article = document.createElement("article");
            article.classList = "dashboard-article";

            article.innerHTML = `
            <div class="div-imagem-nome-produto">
                <img src="${produto.imagem}" alt="Imagem do Produto">
                <h3>${produto.nome}</h3>
            </div>            
            <button class="article-produto-categoria">${produto.categoria}</button>
            <p class="dashboard-descricao-produto">${produto.descricao}</p>
            <div class="acoes-produto">
                <button id="${produto.id}" class="button-editar-produto"></button>
                <button id="${produto.id}" class="button-excluir-produto"></button>
            </div>
            `
            divListaProdutos.appendChild(article);

            document.getElementsByClassName("button-editar-produto")[i].addEventListener("click", DasboardController.editarProduto);
            document.getElementsByClassName("button-excluir-produto")[i].addEventListener("click", DasboardController.excluirProduto);

        })
    }

    static irParaHome(){
        window.location.href = "../../index.html";
    }

    static filtrarListaProdutos(e) {
        
        const filtro = e.target.id;
        
        if (filtro != "todos"){
            const produtosFiltrados = DasboardController.listaProdutos.filter(produto => produto.categoria.toLowerCase() == filtro);
            DasboardController.templateListaProdutos(produtosFiltrados);
        }
        else{
            DasboardController.templateListaProdutos(DasboardController.listaProdutos); 
        }        
    }


    static filtroPesquisar(e){         
        const filtro = e.target.value.toLowerCase();
        const produtosFiltrados = DasboardController.listaProdutos.filter(produto => produto.nome.toLowerCase().indexOf(filtro) > -1);
        DasboardController.templateListaProdutos(produtosFiltrados);        
    }

    

    static modalAdicionarProduto() {
        var modal = document.getElementById("modalAdicionarProduto");
        modal.style.display = "block";

        document.getElementById("modal-adicionar-produto-nome").value = "";
        document.getElementById("modal-adicionar-produto-preco").value = 0;
        document.querySelector(".modal-adicionar-produto-div-categorias").id = "";
        document.getElementById("modal-adicionar-produto-link-imagem").value = "";
        document.getElementById("modal-adicionar-produto-descricao").value = "";

        var span = document.getElementsByClassName("close")[0];

        span.onclick = function () {
            modal.style.display = "none";
        }

    }

    static async adicionarNovoProduto() {
        const nome = document.getElementById("modal-adicionar-produto-nome").value;
        const preco = document.getElementById("modal-adicionar-produto-preco").value;
        const categoria = document.querySelector(".modal-adicionar-produto-div-categorias").id;
        const imagem = document.getElementById("modal-adicionar-produto-link-imagem").value;
        const descricao = document.getElementById("modal-adicionar-produto-descricao").value;

        const novoProduto = {
            "nome": nome,
            "preco": preco,
            "categoria": categoria,
            "imagem": imagem,
            "descricao": descricao
        }

        const respostaPostMyProduto = await ApiDashboard.postMyProduto(novoProduto);        

        var modal = document.getElementById("modalAdicionarProduto");
        modal.style.display = "none";

        if (respostaPostMyProduto.status === 201) {           
            DasboardController.listaProdutos = await ApiDashboard.getMyProducts();            
            DasboardController.templateListaProdutos(DasboardController.listaProdutos);
            DasboardController.notificaModal("Produto Adicionado");            
        }
        else {
            DasboardController.notificaModal("Ocorreu algum erro. O Produto não foi adicionado");
        }

    }

    static async notificaModal(mensagem) {
        
        const modalNotificao = document.getElementById("notificaDashboard");
        modalNotificao.innerText = mensagem;
        
        modalNotificao.className = "show";
        setTimeout(function () { modalNotificao.className = modalNotificao.className.replace("show", ""); }, 5000);        
    }


    

    static setarCategoria(e) {
        e.currentTarget.id = e.target.innerText;      

        

        if (e.target.classList.contains("button-categoria-especifica")){
            const buttons = e.currentTarget.getElementsByTagName("button");
            [...buttons].forEach(btn => btn.classList.remove("categoriaSelecionada"));
            e.target.classList.add("categoriaSelecionada");   
        }
             
    }



    static limparCategorias() {
        const buttonsCategorias = document.getElementsByClassName("button-categoria-especifica");
        [...buttonsCategorias].forEach(btn => btn.classList.remove("categoriaSelecionada"));
    }



    static async editarProduto(e) {
        DasboardController.listaProdutos = await ApiDashboard.getMyProducts();
        const produtoSelecionado = DasboardController.listaProdutos.find(produto => produto.id == e.target.id);
        
        document.querySelector(".modal-editar-produto-div-categorias").id = produtoSelecionado.categoria;

        DasboardController.limparCategorias();


        const modal = document.getElementById("modalEditarProduto");
        modal.style.display = "block";
        
        const span = document.getElementsByClassName("closeEditar")[0];
       
        span.onclick = function () {
            modal.style.display = "none";
        }

        
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }


        const nome = document.getElementById("modal-editar-produto-nome");
        const preco = document.getElementById("modal-editar-produto-preco");
        const categoria = document.querySelector(`#${produtoSelecionado.categoria.toLowerCase()}`);
        const imagem = document.getElementById("modal-editar-produto-link-imagem");
        const descricao = document.getElementById("modal-editar-produto-descricao");

        nome.value = produtoSelecionado.nome;
        preco.value = produtoSelecionado.preco.toFixed(2);
        categoria.classList.add("categoriaSelecionada");
        
        imagem.value = produtoSelecionado.imagem;
        descricao.value = produtoSelecionado.descricao;


        const salvarBtn = document.getElementById("modal-editar-produto-button-salvar");

        salvarBtn.onclick = async () => {
            const categoriaEscolhida = document.querySelector(".modal-editar-produto-div-categorias").id;
            const dadosProduto = {
                "nome": nome.value,
                "preco": preco.value,
                "categoria": categoriaEscolhida,
                "imagem": imagem.value,
                "descricao": descricao.value
            }

            
            modal.style.display = "none";

            const respostaPatch = await ApiDashboard.patchMyProduto(dadosProduto, produtoSelecionado.id);
            if (respostaPatch == "Produto Atualizado") {
                DasboardController.listaProdutos = await ApiDashboard.getMyProducts();
                DasboardController.templateListaProdutos(DasboardController.listaProdutos);
                DasboardController.notificaModal(respostaPatch);
            }
            else {
                DasboardController.notificaModal(respostaPatch);
            } 
            

        }

        const excluirBtn = document.querySelector(".modal-editar-produto-button-excluir");
        excluirBtn.id = produtoSelecionado.id;
        excluirBtn.addEventListener("click", DasboardController.excluirProduto);



    }

    static async excluirProduto(e) {       

        const modalEditar = document.getElementById("modalEditarProduto");
        modalEditar.style.display = "none";

        const modal = document.getElementById("modalExcluirProduto");
        modal.style.display = "block";

        
        const span = document.getElementsByClassName("closeExcluir")[0];

        
        span.onclick = function () {
            modal.style.display = "none";
        }

        
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        const btnExcluirSim = document.getElementById("excluir-sim");
        const btnExcluirNao = document.getElementById("excluir-nao");

        btnExcluirNao.onclick = () => modal.style.display = "none"; 

        btnExcluirSim.onclick = async () => {            
            const deleteResponse = await ApiDashboard.deleteMyProduto(e.target.id)
            modal.style.display = "none";
            if (deleteResponse.status === 204) {
                DasboardController.listaProdutos = await ApiDashboard.getMyProducts();
                DasboardController.templateListaProdutos(DasboardController.listaProdutos);
                DasboardController.notificaModal("Produto Excluído");
            }
            else {
                DasboardController.notificaModal("Ocorreu algum erro. O Produto não foi excluído");
            }          
            
        }

    }
}