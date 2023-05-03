import CONFIG_BANCO from "../constant/CONFIG_BANCO.js";
import mysql from "mysql2/promise";
import Cupom from "../dominio/Cupom.js";
import Cliente from "../dominio/Cliente.js";

class CupomDAO {
  async listar() {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const [rows] = await conn.execute(
      `select cupons.codigo,cupons.valor,cupons.tipo,cupons.pedido_origem_id as pedido_id ,IF(cuponspedido.pedido_id IS NOT NULL, 'Utilizado','Disponível') as status  
      from cupons left outer join cuponspedido on cupons.codigo = cuponspedido.cupom_id;`
    );
    console.log("listar", rows);
    return rows;
  }

  async listarPorCliente(clienteId) {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const [rows] = await conn.execute(
      `SELECT cupons.codigo,
        cupons.valor,
        cupons.tipo,
        cupons.pedido_origem_id as pedido_id,
        IF(cuponspedido.pedido_id IS NOT NULL, 'Utilizado','Disponível') as status  
      FROM cupons 
        left outer join cuponspedido on cupons.codigo = cuponspedido.cupom_id
      WHERE cliente_id = ?`
      ,
      [clienteId]
    );

    return rows;

    // return rows.map((item) => {
    //   const cliente = new Cliente();
    //   cliente.id = item.cliente_id;
    //   return new Cupom(item.codigo, item.valor, item.tipo, cliente);
    // });
  }

  async adicionar(cupom) {
    console.log("------------------");
    console.log(cupom);
    console.log("-------------------");

    const conn = await mysql.createConnection(CONFIG_BANCO);

    let result;
    if (cupom?.pedido_origem_id && cupom?.cliente_id) {
      const sql = `INSERT INTO cupons(codigo, valor, tipo,pedido_origem_id, cliente_id)
              VALUES (?, ?, ?,?,?)`;
      const values = [
        cupom.codigo,
        cupom.valor,
        cupom.tipo,
        cupom.pedido_origem_id,
        cupom.cliente_id,
      ];
      result = await conn.execute(sql, values);
    } else {
      const sql = `INSERT INTO cupons(codigo, valor, tipo)
      VALUES (?, ?, ?)`;
      const values = [cupom.codigo, cupom.valor, cupom.tipo];
      result = await conn.execute(sql, values);
    }

    return result;
  }

  async deletar(codigo) {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const result = await conn.execute(`DELETE
                                           FROM cupons
                                           WHERE codigo = '${codigo}';`);
    console.log(`DELETE
                     FROM cupons
                     WHERE codigo = '${codigo}';`);
    console.log(result);
    return result;
  }

  async editar(editCupom) {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const sql = `UPDATE cupons
                     SET valor = ?,
                         tipo  = ?
                     WHERE codigo = ?;`;
    const values = [editCupom.valor, editCupom.tipo, editCupom.codigo];
    await conn.execute(sql, values);
    return await conn.execute(sql, values);
  }
}

export default CupomDAO;
