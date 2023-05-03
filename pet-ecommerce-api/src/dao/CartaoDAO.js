import CONFIG_BANCO from "../constant/CONFIG_BANCO.js";
import mysql from 'mysql2/promise'

class CartaoDAO {

    async adicionar(cartao){
        const conn = await mysql.createConnection(CONFIG_BANCO)
        const sql = `INSERT INTO cartoes(numero,nome,bandeira_id,cvv,principal,status,cliente_id)
            VALUES (?,?,?,?,?,?,?) `;
        const values = [cartao.numero, cartao.nome, cartao.bandeira, cartao.cvv, cartao.principal, 
            cartao.status, cartao.cliente_id];
        return await conn.execute(sql, values);
    }

    async listar(){
        const conn =  await mysql.createConnection(CONFIG_BANCO);
        const [rows]  = await conn.execute(`select t1.*,t2.nome as cliente
            from cartoes t1 inner join clientes t2 on t2.id = t1.cliente_id;`);
        console.log('listar', rows)
        return rows;
    }

    async inativar(id){
        const conn =  await mysql.createConnection(CONFIG_BANCO);
        const sql = `UPDATE cartoes SET status = 0 WHERE id = ?`;
        const values = [id];
        return await conn.execute(sql, values);
    }

    async buscarId(id){
        const conn =  await mysql.createConnection(CONFIG_BANCO);
        const sql = `SELECT * FROM cartoes WHERE id =?`;
        const values = [id];
        return await conn.execute(sql, values);
    }
}
export default CartaoDAO 