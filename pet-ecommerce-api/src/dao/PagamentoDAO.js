import CONFIG_BANCO from "../constant/CONFIG_BANCO.js";
import mysql from 'mysql2/promise'
import ProdutoCategoria from "../dominio/ProdutoCategoria.js";
import {Produto} from "../dominio/Produto.js";
import _ from "lodash";
import Pedido from "../dominio/Pedido.js";
import Frete from "../dominio/Frete.js";
import Endereco from "../dominio/Endereco.js";
import {PedidoStatus} from "../dominio/PedidoStatus.js";
import PedidoItem from "../dominio/PedidoItem.js";
import Cliente from "../dominio/Cliente.js";

class PagamentoDAO {
    async listarCupons(pedido_id) {
        const conn = await mysql.createConnection(CONFIG_BANCO);
        const [rows] = await conn.execute(`
        SELECT 
            t3.*
        FROM
            pedidos t1
                LEFT JOIN
                cuponspedido t2 ON t2.pedido_id = t1.id
                LEFT Join
            cupons t3 on t3.codigo = t2.cupom_id
        WHERE t1.id = ${pedido_id}`);
        
        return rows;
    }

    async listarCartoes(pedido_id) {
        const conn = await mysql.createConnection(CONFIG_BANCO);
        const [rows] = await conn.execute(`
        SELECT 
            t3.*
        FROM
            pedidos t1
                LEFT JOIN
                cartoespedido t2 ON t2.pedido_id = t1.id
                left join 
            cartoes t3 on t3.id = t2.cartao_id
        WHERE t1.id = ${pedido_id}`);
        
        return rows;
    }

    async listar(pedido_id){
        let cupons = await this.listarCupons(pedido_id);
        let cartoes = await this.listarCartoes(pedido_id)
        let response = {
            cupons: cupons, 
            cartoes: cartoes,
        }
        return response
    }

}

export default PagamentoDAO