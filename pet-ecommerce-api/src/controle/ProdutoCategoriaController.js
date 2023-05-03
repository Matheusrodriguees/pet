import ProdutoCategoriaDAO from "../dao/ProdutoCategoriaDAO.js";

class ProdutoCategoriaController {
    constructor() { }

    async listar() {
        const produtoCategoriaDAO = new ProdutoCategoriaDAO();
        return await produtoCategoriaDAO.listar();
    }


}
export default ProdutoCategoriaController