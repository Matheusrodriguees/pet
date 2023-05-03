import EstoqueDAO from "../dao/EstoqueDAO.js";

class EstoqueController {
    constructor() { }

    async listar() {
        const estoqueDAO = new EstoqueDAO();
        return await estoqueDAO.listar();
    }

    async editar(dados) {
        const estoqueDAO = new EstoqueDAO();
        return await estoqueDAO.editar(dados);
    }


}
export default EstoqueController