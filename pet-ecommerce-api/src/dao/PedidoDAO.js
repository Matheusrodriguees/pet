import CONFIG_BANCO from "../constant/CONFIG_BANCO.js";
import mysql from "mysql2/promise";
import ProdutoCategoria from "../dominio/ProdutoCategoria.js";
import { Produto } from "../dominio/Produto.js";
import _ from "lodash";
import Pedido from "../dominio/Pedido.js";
import Frete from "../dominio/Frete.js";
import Endereco from "../dominio/Endereco.js";
import { PedidoStatus } from "../dominio/PedidoStatus.js";
import PedidoItem from "../dominio/PedidoItem.js";
import Cliente from "../dominio/Cliente.js";
import EstoqueDAO from "./EstoqueDAO.js";
class ProdutoDAO {
  /**
   * Obtem a lista de produtos do banco de dados
   */
  async listar() {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const [rows] = await conn.execute(`
    SELECT *,
    pedidos.id as id,
    i.id as item_id,
    i.status_id as status_item_id,
    si.nome as status_item_nome,
    p.nome             as produto_nome,
    p.descricao        as produto_descricao,
    p.valor            as produto_valor,
    c.id               as produto_categoria_id,
    c.nome             as produto_categoria_nome,
    pedidos.cliente_id as cliente_id,
     s.nome as status_nome
FROM pedidos
      JOIN statuspedido s on s.id = pedidos.status_pedido_id
      LEFT JOIN enderecos e on e.id = pedidos.enderecos_id
      LEFT JOIN fretes f on f.id = pedidos.frete_id
      LEFT JOIN itenspedido i on pedidos.id = i.pedido_id
      JOIN statuspedido si on si.id = i.status_id
      JOIN produtos p on i.produto_id = p.id
      LEFT JOIN categorias c on c.id = p.categoria_id
        `);

    const pedidosAgrupado = _.groupBy(rows, "pedido_id");
    // Converte o dado puro que foi recebido do banco de dado para uma entidade do dominio
    return Object.values(pedidosAgrupado).map((pedidoRaw) => {
      let item = pedidoRaw[0];

      const itemsPedido = pedidoRaw.map((item) => {
        console.log("item", item);
        const produto = new Produto(
          item.produto_id,
          item.produto_nome,
          item.produto_descricao,
          item.produto_valor,
          new ProdutoCategoria(
            item.produto_categoria_id,
            item.produto_categoria_nome
          ),
          0
        );
        return new PedidoItem(
          item.item_id,
          item.quantidade,
          produto,
          null,
          item.status_item_id,
          item.status_item_nome
        );
      });
      // console.log(itemsPedido);
      // const itens = item
      return new Pedido(
        item.id,
        itemsPedido,
        new Cliente(item.cliente_id),
        new Date(item.data),
        item.valor,
        new PedidoStatus(item.status_pedido_id, item.status_nome),
        new Frete(item.frete_id, item.valor, item.estado),
        new Endereco(
          item.enderecos_id,
          item.tpResidencia,
          item.tpLogradouro,
          item.logradouro,
          item.numero,
          item.nome,
          item.bairr,
          item.cep,
          item.cidade,
          item.pais,
          item.observacao,
          item.cobranca,
          item.entrega,
          item.status,
          item.cliente_id
        )
      );
    });
  }

  /**
   * Adicionar um novo produto ao banco de dados
   * @param {Pedido} produto
   * @returns
   */
  async adicionar(pedido) {
    console.log("DAO PEDIDO", pedido)
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const sql = `INSERT INTO pedidos(cliente_id, data, valor, status_pedido_id, frete_id, enderecos_id,
                                         cupom_codigo)
                     VALUES (?, ?, ?, ?, ?, ?, ?) `;
    const values = [
      pedido.cliente.id,
      pedido.data,
      pedido.valor,
      pedido.status.id,
      pedido.frete.id,
      pedido.endereco.id,
      pedido.cupom ? pedido.cupom.id : null,
    ];
    const result = await conn.execute(sql, values);
    pedido.id = result[0].insertId;

    for (const itemPedido of pedido.items) {
      console.log(itemPedido.quantidade,
        itemPedido.produto.id,
        pedido.id,
        pedido.status.id)
      const sql = `INSERT INTO itenspedido(quantidade, produto_id, pedido_id,status_id )
                         VALUES (?, ?, ?, ?) `;
      const values = [
        itemPedido.quantidade,
        itemPedido.produto.id,
        pedido.id,
        pedido.status.id,
      ];
      const result = await conn.execute(sql, values);
      itemPedido.id = result[0].insertId;

      let baixa = {
        produto: itemPedido.produto.id,
        quantidade: itemPedido.quantidade,
      }
      const estoqueDAO = new EstoqueDAO()
      await estoqueDAO.baixaEstoque(baixa)
    }

    for (const pag of pedido.pagamento) {
      if (pag.pagTipo == 'cupom') {
        const sql = `INSERT INTO cuponspedido(cupom_id, pedido_id)
                         VALUES (?, ?) `;
        const values = [pag.codigo, pedido.id];
        const result = await conn.execute(sql, values);

      } else if (pag.pagTipo == 'cartao') {
        const sql = `INSERT INTO cartoespedido(cartao_id, pedido_id)
                VALUES (?, ?) `;
        const values = [pag.id, pedido.id];
        const result = await conn.execute(sql, values);
      }
    }
    return pedido;
  }
  async editar(id, dados) {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    let sql, values;

    // if (dados.cupom_codigo) {
    //   sql = `UPDATE pedidos
    //         SET status_pedido_id = ?,
    //             cupom_codigo     = ?
    //         WHERE id = ?;`;
    //   values = [dados.status, dados.cupom_codigo, id];
    // } else {
    //   sql = `UPDATE pedidos
    //         SET status_pedido_id = ?
    //         WHERE id = ?;`;
    //   values = [dados.status, id];
    // }
    if (dados.cupom_codigo) {
      sql = `UPDATE pedidos
              SET cupom_codigo     = ?
              WHERE id = ?;`;
      values = [dados.cupom_codigo, id];

      await conn.execute(sql, values);
    }

    if (dados?.item_id) {
      sql = `UPDATE itenspedido
            SET status_id     = ?
            WHERE id = ?;`;
      values = [dados.status, dados.item_id];
    } else {
      sql = `UPDATE itenspedido
            SET status_id     = ?
            WHERE pedido_id = ?;`;
      values = [dados.status, id];
    }

    await conn.execute(sql, values);

    return;
  }
  
}

export default ProdutoDAO;
