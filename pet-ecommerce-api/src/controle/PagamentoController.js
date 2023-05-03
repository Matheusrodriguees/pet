import PagamentoDAO from "../dao/PagamentoDAO.js";


class PagamentoController {
    constructor() { }

    async listar(id) {
        const pagamentoDAO = new PagamentoDAO();
        const pagamentos = await pagamentoDAO.listar(id);
        return pagamentos;
    }


}
export default PagamentoController