import CONFIG_BANCO from "../constant/CONFIG_BANCO.js";
import mysql from 'mysql2/promise'
import Cupom from "../dominio/Cupom.js";
import Cliente from "../dominio/Cliente.js";

class CupomDAO {
    async buscarPorNome(nome) {
        const conn = await mysql.createConnection(CONFIG_BANCO);
        const sql = `SELECT * from statuspedido
                     WHERE nome = ?;`;
        const values = [nome];
        await conn.execute(sql, values);
        const [rows] = await conn.execute(sql, values);
        return rows
    }


}

export default CupomDAO;