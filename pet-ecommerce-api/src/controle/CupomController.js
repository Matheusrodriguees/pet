import CupomDAO from "../dao/CupomDAO.js";
import Cupom from "../dominio/Cupom.js";

class CupomController {
    constructor() { }

    async listar() {
        const cupomDAO = new CupomDAO();
        const cupons = await cupomDAO.listar();
        return cupons;
    }

    async adicionar(cupom) {
        const cupomDAO = new CupomDAO();
        const newcupom = new Cupom(
            cupom.codigo,
            cupom.valor,
            cupom.tipo,
            cupom.pedido_origem_id,
            43
        );

        cupomDAO.adicionar(newcupom);
    }

    async buscarId(id) {
        const cupomDAO = new CupomDAO();
        const cupons = await cupomDAO.listar();
        return cupons;
    }

    async inativar(id) {
        const cupomDAO = new CupomDAO();
        return await cupomDAO.deletar(id);
    }

    async editar(cupom) {
        const cupomDAO = new CupomDAO();
        return await cupomDAO.editar(cupom);
    }

    async listarPorCliente(id) {
        const cupomDao = new CupomDAO();
        const cupons = await cupomDao.listarPorCliente(id);
        return cupons;

    }

}
export default CupomController