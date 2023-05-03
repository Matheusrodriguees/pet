import EnderecoDAO from "../dao/EnderecoDAO.js";
import Endereco from "../dominio/Endereco.js";

class EnderecoController {
    constructor() { }

    async listar() {
        const enderecoDAO = new EnderecoDAO();
        const enderecos = await enderecoDAO.listar();
        return enderecos;
    }

    async adicionar(endereco) {
        const endDAO = new EnderecoDAO();
        const end = new Endereco(
          null,
          endereco.tpResidencia,
          endereco.tpLogradouro,
          endereco.logradouro,
          endereco.numero,
          endereco.bairro,
          endereco.nome,
          endereco.cep,
          endereco.cidade,
          endereco.estado,
          endereco.pais,
          endereco.observacao,
          endereco.cobranca,
          endereco.entrega,
          endereco.status,
          endereco.cliente_id
        );
        const result = await endDAO.adicionar(end);
        end.id = result[0].insertId;
        return end;
    }

    async buscarId(id) {
        const enderecoDAO = new EnderecoDAO();
        const enderecos = await enderecoDAO.buscarId(id);
        return enderecos;
    }

    async inativar(id) {
        const enderecoDAO = new EnderecoDAO();
        await enderecoDAO.inativar(id);
        const enderecos = await enderecoDAO.listar();
        return enderecos;
    }


}
export default EnderecoController