import CONFIG_BANCO from "../constant/CONFIG_BANCO.js";
import mysql from "mysql2/promise";
import ProdutoCategoria from "../dominio/ProdutoCategoria.js";
import { Produto } from "../dominio/Produto.js";
import Estoque from "../dominio/Estoque.js";

class EstoqueDAO {
  /**
   * Obtem a lista de produtos do banco de dados
   */
  async listar() {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const [rows] = await conn.execute(`
            select p.id, p.nome, descricao, valor, c.id as categoria_id, c.nome as categoria_nome, e.quantidadeAtual, e.atualizado_em as estoque_atualizado_em
            from produtos p
                     join categorias c on c.id = p.categoria_id
                      left join estoques e on e.produto_id = p.id;
        `);
    // Converte o dado puro que foi recebido do banco de dado para uma entidade do dominioote,

    return rows.map((item) => {
      console.log(item);
      const produto = new Produto(
        item.id,
        item.nome,
        item.descricao,
        item.valor,
        new ProdutoCategoria(item.categoria_id, item.categoria_nome)
      );
      produto.estoque = {
        quantidadeAtual: item.quantidadeAtual,
        atualizadoEm: item.estoque_atualizado_em,
      };
      return produto;
    });
  }

  /**
   * Adicionar um novo produto ao banco de dados
   * @param {Produto} produto
   * @returns
   */
  async adicionar(produto) {
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

  async editar(dados) {
    console.log(parseInt(dados.quantidade));

    if (parseInt(dados.quantidade) > 0) {
      const conn = await mysql.createConnection(CONFIG_BANCO);
      const [precificacao] = await conn.execute(
        `SELECT * FROM precificacoes WHERE id =?`,
        [dados.precificacao]
      );

      var novoValor =
        (precificacao[0].porcentagem / 100) * parseInt(dados.custo) +
        parseInt(dados.custo);

      const sql = `UPDATE produtos
            SET valor = ?
            WHERE id = ?;`;
      const values = [novoValor.toFixed(2), dados.produto];
      await conn.execute(sql, values);

      const [rows] = await conn.execute(
        `SELECT *
                                         FROM estoques
                                         WHERE produto_id =?`,
        [dados.produto]
      );
      console.log(rows[0]);
      if (rows[0]?.id) {
        const newData = {
          id: rows[0]?.id,
          quantidadeAtual:
            parseInt(rows[0]?.quantidadeAtual) + parseInt(dados.quantidade),
          custo: dados.custo,
          dataEntrada: new Date(dados.data),
        };

        const conn = await mysql.createConnection(CONFIG_BANCO);
        const sql = `UPDATE estoques
                 SET quantidadeAtual = ?,
                     custo  = ?,
                     dataEntrada  = ?
                 WHERE id = ?;`;
        const values = [
          newData.quantidadeAtual,
          newData.custo,
          newData.dataEntrada,
          newData.id,
        ];
        await conn.execute(sql, values);
        return await conn.execute(sql, values);
      } else {
        const newData = {
          quantidadeAtual: parseInt(dados.quantidade),
          custo: dados.custo,
          dataEntrada: new Date(dados.data),
          produto_id: dados.produto,
        };
        const conn = await mysql.createConnection(CONFIG_BANCO);
        const sql = `INSERT INTO estoques(quantidadeAtual,custo,dataEntrada,produto_id)
            VALUES (?,?,?,?) `;
        const values = [
          newData.quantidadeAtual,
          newData.custo,
          newData.dataEntrada,
          newData.produto_id,
        ];
        return await conn.execute(sql, values);
      }
    } else if (parseInt(dados.quantidade) < 0) {
      const conn = await mysql.createConnection(CONFIG_BANCO);
      const [rows] = await conn.execute(
        `SELECT *
                                         FROM estoques
                                         WHERE produto_id =?`,
        [dados.produto]
      );

      console.log(rows[0]);
      if (rows[0]?.id) {
        const newData = {
          id: rows[0]?.id,
          quantidadeAtual:
            parseInt(rows[0]?.quantidadeAtual) + parseInt(dados.quantidade),
          motivo: dados.motivo,
          dataSaida: new Date(dados.data),
        };

        const conn = await mysql.createConnection(CONFIG_BANCO);
        const sql = `UPDATE estoques
                 SET quantidadeAtual = ?,
                     motivo  = ?,
                     dataSaida  = ?
                 WHERE id = ?;`;
        const values = [
          newData.quantidadeAtual,
          newData.motivo,
          newData.dataSaida,
          newData.id,
        ];
        await conn.execute(sql, values);
        return await conn.execute(sql, values);
      } else {
        const newData = {
          quantidadeAtual: parseInt(dados.quantidade),
          motivo: dados.motivo,
          dataSaida: new Date(dados.data),
          produto_id: dados.produto,
        };
        const conn = await mysql.createConnection(CONFIG_BANCO);
        const sql = `INSERT INTO estoques(quantidadeAtual,motivo,dataSaida,produto_id)
            VALUES (?,?,?,?) `;
        const values = [
          newData.quantidadeAtual,
          newData.motivo,
          newData.dataSaida,
          newData.produto_id,
        ];
        return await conn.execute(sql, values);
      }
    }

    return;
  }

  async baixaEstoque(dados) {
    const conn = await mysql.createConnection(CONFIG_BANCO);
      const [rows] = await conn.execute(
        `SELECT * FROM estoques WHERE produto_id =?`,
        [dados.produto]
      );
      console.log(rows[0]);
      if (rows[0]?.id) {
        const newData = {
          id: rows[0]?.id,
          quantidadeAtual:
            parseInt(rows[0]?.quantidadeAtual) - parseInt(dados.quantidade),
          motivo: "Venda",
          dataSaida: new Date(),
        };

        const conn = await mysql.createConnection(CONFIG_BANCO);
        const sql = `UPDATE estoques
                 SET quantidadeAtual = ?,
                     motivo  = ?,
                     dataSaida  = ?
                 WHERE id = ?;`;
        const values = [
          newData.quantidadeAtual,
          newData.motivo,
          newData.dataSaida,
          newData.id,
        ];
        await conn.execute(sql, values);
        return await conn.execute(sql, values);
      }

  }
}

export default EstoqueDAO;
