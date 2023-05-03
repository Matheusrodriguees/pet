import CONFIG_BANCO from "../constant/CONFIG_BANCO.js";
import mysql from 'mysql2/promise'
import ProdutoCategoria from "../dominio/ProdutoCategoria.js";


class ProdutoCategoriaDAO {

    /**
     * Obtem a lista de produtos do banco de dados
     */
    async listar() {
        const conn = await mysql.createConnection(CONFIG_BANCO);
        const [rows] = await conn.execute(`
            SELECT * FROM categorias
        `);

        // Converte o dado puro que foi recebido do banco de dado para uma entidade do dominio
        return Object.values(rows).map(rows => {
            return new ProdutoCategoria(rows.id, rows.nome)
        });
    }



}

export default ProdutoCategoriaDAO