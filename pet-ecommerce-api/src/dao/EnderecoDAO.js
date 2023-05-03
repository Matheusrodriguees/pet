
import CONFIG_BANCO from "../constant/CONFIG_BANCO.js";
import mysql from 'mysql2/promise'
class EnderecoDAO {

    async adicionar(endereco){
        const conn = await mysql.createConnection(CONFIG_BANCO)
        const sql = `INSERT INTO enderecos(tpResidencia, tpLogradouro, logradouro, numero, nome, bairro, cep, 
            cidade, estado, observacao,cobranca,entrega,status,cliente_id)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?) `;
        const values = [endereco.tpResidencia, endereco.tpLogradouro, endereco.logradouro, endereco.numero, endereco.nome, 
            endereco.bairro, endereco.cep, endereco.cidade, endereco.estado, endereco.observacao, endereco.cobranca, endereco.entrega,
            endereco.status, endereco.cliente_id];
        return await conn.execute(sql, values);
    }

    async listar(){
        const conn =  await mysql.createConnection(CONFIG_BANCO);
        const [rows]  = await conn.execute(`select t1.*,t2.nome as cliente
            from enderecos t1 inner join clientes t2 on t2.id = t1.cliente_id;`);
        return rows;
    }

    async alterar(endereco){
        const conn =  await mysql.createConnection(CONFIG_BANCO);
        const sql = `UPDATE enderecos SET tpResidencia=?, tpLogradouro=?, logradouro=?,
        numero=?, nome=?, bairro=?, cep=?, cidade=? estado=?, observacao=?, cobranca=?, entrega=?
        WHERE id=?`;
        const values = [endereco.tpResidencia, endereco.tpLogradouro, endereco.logradouro, 
            endereco.numero, endereco.nome, endereco.bairro, endereco.cep, endereco.cidade, endereco.estado, 
            endereco.observacao, endereco.cobranca, endereco.entrega, endereco.id];
        return await conn.execute(sql, values);
    }

    async inativar(id){
        const conn =  await mysql.createConnection(CONFIG_BANCO);
        const sql = `UPDATE enderecos SET status = 0 WHERE id = ?;`;
        const values = [id];
        return await conn.execute(sql, values);
    }

    async buscarId(id){
        const conn =  await mysql.createConnection(CONFIG_BANCO);
        const sql = `SELECT * FROM enderecos WHERE id =?`;
        const values = [id];
        return await conn.execute(sql, values);
    }
}
export default EnderecoDAO