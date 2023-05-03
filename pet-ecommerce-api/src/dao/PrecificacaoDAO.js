import CONFIG_BANCO from "../constant/CONFIG_BANCO.js";
import mysql from "mysql2/promise";
import Precificacao from "../dominio/Precificacao.js";

class PrecificacaoDAO {
  /**
   * Obtem a lista de produtos do banco de dados
   */
  async listar() {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const [rows] = await conn.execute(`select * from precificacoes`);
    // Converte o dado puro que foi recebido do banco de dado para uma entidade do dominio
    return rows.map((item) => {
      return new Precificacao(
        item.id,
        item.nome,
        item.porcentagem,
        item.produto
      );
    });
  }
}

export default PrecificacaoDAO;
