import PedidoDAO from "../dao/PedidoDAO.js";
import Pedido from "../dominio/Pedido.js";

class PedidoController {
    constructor() {}

    async listar() {
        const pedidoDAO = new PedidoDAO();
        return await pedidoDAO.listar();
    }

    async adicionar(dados) {
        const pedidoDAO = new PedidoDAO();
        const pedido = new Pedido(
          null,
          dados.items,
          dados.cliente,
          dados.data,
          dados.valor,
          dados.status,
          dados.frete,
          dados.endereco,
          dados.cupom,
          dados.pagamento
        );
        let pedidoResult = await pedidoDAO.adicionar(pedido);
        return pedidoResult;
    }

    async editar(id, dados){
        const pedidoDAO = new PedidoDAO();
        const cupons = await pedidoDAO.editar(id, dados);
        return cupons;
    }

}
export default PedidoController