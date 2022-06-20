import { DasboardController } from "./dashboardController.js";

export class ApiDashboard {
    static urlBase = "https://kenzie-food-api.herokuapp.com/";

    static getMyProducts() {
        const url = ApiDashboard.urlBase + "my/products";

        const myProducts = fetch(url, {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))                
            }
        })
            .then(response => response.json())
            .then(r => r)
            .catch(err => console.error(err));
        return myProducts;
    }



    static postMyProduto(dadosProduto) {
        const url = ApiDashboard.urlBase + "my/products";

        const respostaPostMyProduto = fetch(url, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))                            
            },
            "body": JSON.stringify(dadosProduto)
        })
            .then(response => response)            
            .catch(err => console.error(err));

        return respostaPostMyProduto;
    }



    static async patchMyProduto(dadosProduto, idProduto) {
        const url = ApiDashboard.urlBase + "my/products/" + idProduto;

        const respostaPatch = fetch(url, {
            "method": "PATCH",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))                
            },
            "body": JSON.stringify(dadosProduto)
        })
            .then(response => response.json())
            .then(r => r)
            .catch(err => console.error(err));
        return respostaPatch;
    }



    static deleteMyProduto(idProduto) {
        const url = ApiDashboard.urlBase + "my/products/" + idProduto;

        const respostaDelete = fetch(url, {
            "method": "DELETE",
            "headers": {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        })
            .then(response => response)        
        return respostaDelete;
    }


}