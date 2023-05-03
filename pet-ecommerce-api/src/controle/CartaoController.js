import CartaoDAO from "../dao/CartaoDAO.js";
import Cartao from "../dominio/Cartao.js";

class CartaoController {
    constructor() {}

    async listar() {
        const cartaoDAO = new CartaoDAO();
        return await cartaoDAO.listar();
    }

    async adicionar(cartao) {
        const cartaoDAO = new CartaoDAO();
        const car = new Cartao(
            null,
            cartao.numero,
            cartao.nome,
            cartao.bandeira,
            cartao.cvv,
            cartao.principal,
            cartao.status,
            cartao.cliente_id
          );
        return await cartaoDAO.adicionar(car);
    }

    async buscarId(id){
        const cartaoDAO = new CartaoDAO();
        const cartoes = cartaoDAO.buscarId(id);
        return cartoes
    }

    async inativar(id){
        const cartaoDAO = new CartaoDAO();
        const cartoes = cartaoDAO.inativar(id);
        return cartoes;
    }

}
export default CartaoController