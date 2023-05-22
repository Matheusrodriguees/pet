import CONFIG_BANCO from "../constant/CONFIG_BANCO.js";
import mysql from "mysql2/promise";
import ProdutoCategoria from "../dominio/ProdutoCategoria.js";
import { Produto } from "../dominio/Produto.js";

class ProdutoDAO {
  /**
   * Obtem a lista de produtos do banco de dados
   */
  async listar() {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const [rows] = await conn.execute(`
      SELECT 
          p.id,
          p.nome,
          descricao,
          valor,
          c.id AS categoria_id,
          c.nome AS categoria_nome,
          e.quantidadeAtual as quantidade_estoque
      FROM
          produtos p
              JOIN
          categorias c ON c.id = p.categoria_id
              JOIN 
          estoques e on e.produto_id = p.id
      WHERE
          e.quantidadeAtual > 0;
        `);
    // Converte o dado puro que foi recebido do banco de dado para uma entidade do dominio
    return rows.map((item) => {
      return new Produto(
        item.id,
        item.nome,
        item.descricao,
        item.valor,
        new ProdutoCategoria(item.categoria_id, item.categoria_nome),
        item.quantidade_estoque
      )
    });
  }

  /**
   * Adicionar um novo produto ao banco de dados
   * @param {Produto} produto
   * @returns
   */
  async adicionar(produto) {
    console.log("aquiii", produto);

    const conn = await mysql.createConnection(CONFIG_BANCO);
    const sql = `INSERT INTO produtos(NOME,descricao,valor,categoria_id) values (?,?,?,?) `;
    const values = [
      produto.nome,
      produto.descricao,
      produto.valor,
      produto.categoria.id,
    ];
    return await conn.execute(sql, values);
  }

  /**
   *
   * @param {number[]} produtos
   * @returns {Promise<{quantidade: number, data: Date, nome: string}[]>}
   */
  async getQuantidadeVendidaPorProduto(produtos, inicioPeriodo, terminoPeriodo){
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const query = `
        select SUM(quantidade) as quantidade, DATE(p.data) as data, p2.nome from itenspedido
                                                               join pedidos p on p.id = itenspedido.pedido_id
                                                               join produtos p2 on itenspedido.produto_id = p2.id
        where p2.id in (?) and DATE(p.data) BETWEEN DATE(?) AND DATE(?)
        group by p2.nome, DATE(p.data);
        `;

    console.log(query);
      const values = [produtos,inicioPeriodo,terminoPeriodo];

      const [rows] =  await conn.query(query, values);
    return rows;
  }
}

export default ProdutoDAO;
