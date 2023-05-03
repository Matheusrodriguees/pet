import Cliente from "../dominio/Cliente.js";
import CONFIG_BANCO from "../constant/CONFIG_BANCO.js";
import mysql from "mysql2/promise";

class ClienteDAO {
  async adicionaCliente(cliente) {
    console.log("adicionaCliente", cliente);
    const conn = await mysql.createConnection(CONFIG_BANCO);

    const sql = `INSERT INTO clientes(nome,genero,dataNascimento,cpf,ddd,telefone, email, senha)
        VALUES (?,?,?,?,?,?,?,?)`;
    const values = [
      cliente.nome,
      cliente.genero,
      cliente.dataNascimento,
      cliente.cpf,
      cliente.ddd || cliente.dddTelefone,
      cliente.telefone,
      cliente.email,
      cliente.senha,
    ];
    console.log(values);
    const result = await conn.execute(sql, values);
    return result[0].insertId;
  }

  async listaClientes() {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const [rows] = await conn.execute("SELECT * FROM clientes");
    return rows;
  }

  async listaCliente(id) {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const row = await conn.query("SELECT * FROM clientes where id = ?;");
    const values = [id];
    return await conn.execute(sql, values);
  }

  async editar(cliente) {
    console.log(cliente);
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const sql = `UPDATE clientes SET nome=?, genero=?, dataNascimento=?,
         cpf=?, ddd=?, telefone=?, email=?, senha=? WHERE id=?`;
    const values = [
      cliente.nome,
      cliente.genero,
      new Date(cliente.dataNascimento),
      cliente.cpf,
      cliente.ddd,
      cliente.telefone,
      cliente.email,
      cliente.senha,
      cliente.id,
    ];
    const [rows, fields] = await conn.execute(sql, values);

    const enderecosIdsTokeep = cliente.enderecos.map((item) => {
      if (item.id) {
        return item.id;
      }
    });
    const cartoesIdsTokeep = cliente.cartoes.map((item) => {
      if (item.id) {
        return item.id;
      }
    });
    console.log(cartoesIdsTokeep);

    const sqlToDeleteEnderecos = `Delete from enderecos where id not in (?) and cliente_id = ?`;
    const sqlToDeleteCartoes = `Delete from cartoes where id not in (?) and cliente_id = ?`;

    await conn.execute(sqlToDeleteEnderecos, [
      enderecosIdsTokeep.join(", "),
      cliente.id,
    ]);
    await conn.execute(sqlToDeleteCartoes, [
      cartoesIdsTokeep.join(", "),
      cliente.id,
    ]);

    cliente.enderecos.forEach((endereco) => {
      if (endereco.id) {
        const sql = `UPDATE enderecos SET tpResidencia=?, tpLogradouro=?, logradouro=?,
            numero=?, nome=?, bairro=?, cep=?, cidade=?, estado=?, observacao=?, cobranca=?, entrega=?
            WHERE id=?`;
        const values = [
          endereco.tpResidencia,
          endereco.tpLogradouro,
          endereco.logradouro,
          endereco.numero,
          endereco.nome,
          endereco.bairro,
          endereco.cep,
          endereco.cidade,
          endereco.estado,
          endereco.observacao,
          endereco.cobranca,
          endereco.entrega,
          endereco.id,
        ];
        conn.execute(sql, values);
      } else {
        const sql = `INSERT INTO enderecos(tpResidencia, tpLogradouro, logradouro, numero, nome, bairro, cep, 
            cidade, estado, observacao,cobranca,entrega,status,cliente_id)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?) `;
        const values = [
          endereco.tpResidencia,
          endereco.tpLogradouro,
          endereco.logradouro,
          endereco.numero,
          endereco.nome,
          endereco.bairro,
          endereco.cep,
          endereco.cidade,
          endereco.estado,
          endereco.observacao,
          endereco.cobranca,
          endereco.entrega,
          endereco.status,
          cliente.id,
        ];
        conn.execute(sql, values);
      }
    });
    cliente.cartoes.forEach((cartao) => {
      if (cartao.id) {
        const sql = `UPDATE cartoes SET numero=?, nome=?, bandeira_id=?,
            cvv=?, principal=?, status=?, cliente_id=?
            WHERE id=?`;
        const values = [
          cartao.numero,
          cartao.nome,
          cartao.bandeira_id,
          cartao.cvv,
          cartao.principal,
          cartao.status,
          cliente.id,
          cartao.id,
        ];
        conn.execute(sql, values);
      } else {
        const sql = `INSERT INTO cartoes(numero,nome,bandeira_id,cvv,principal,status,cliente_id)
            VALUES (?,?,?,?,?,?,?) `;
        const values = [
          cartao.numero,
          cartao.nome,
          cartao.bandeira_id,
          cartao.cvv,
          cartao.principal,
          cartao.status,
          cliente.id,
        ];
        conn.execute(sql, values);
      }
    });

    return rows[0];
  }

  async inativaCliente(id) {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const sql = `UPDATE clientes SET status = 0 WHERE id = ?;`;
    const values = [id];
    await conn.execute(sql, values);
    const sql2 = `UPDATE cartoes SET status = 0 WHERE cliente_id = ?`;
    await conn.execute(sql2, values);
    const sql3 = `UPDATE enderecos SET status = 0 WHERE cliente_id = ?`;
    return await conn.execute(sql3, values);
  }

  async buscarId(id) {
    const conn = await mysql.createConnection(CONFIG_BANCO);
    const values = [id];
    const sqlClientes = `SELECT * FROM clientes WHERE id =?`;
    const sqlEnderecos = `SELECT * FROM enderecos WHERE cliente_id =?`;
    const sqlCartoes = `SELECT cartoes.*, b.nome as bandeira_nome FROM cartoes left join bandeiras b on cartoes.bandeira_id = b.id WHERE cliente_id =?  `;
    let cliente = await conn.execute(sqlClientes, values);
    const enderecos = await conn.execute(sqlEnderecos, values);
    const cartoes = await conn.execute(sqlCartoes, values);

    return {
      ...cliente[0][0],
      enderecos: enderecos[0],
      cartoes: cartoes[0],
    };
  }
}
export default ClienteDAO;
