import ClienteServico from "../servico/ClienteServico.js";
import Cliente from "../dominio/Cliente.js";
import ClienteDAO from "../dao/ClienteDAO.js";
import EnderecoDAO from "../dao/EnderecoDAO.js";
import Endereco from "../dominio/Endereco.js";
import CartaoDAO from "../dao/CartaoDAO.js";
import Cartao from "../dominio/Cartao.js";

class ClienteController {
    constructor() {}

    async listar() {
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.listaClientes();
    }

    async adicionar(cliente) {
        const clienteServico = new ClienteServico();
        const clienteDAO = new ClienteDAO();
        const enderecoDAO = new EnderecoDAO();
        const cartaoDAO = new CartaoDAO();

        cliente.senha = clienteServico.criptografarSenha(cliente.senha);

        const cli = new Cliente(
          null,
          cliente.nome,
          cliente.genero,
          cliente.dataNascimento,
          cliente.cpf,
          cliente.ddd || cliente.dddTelefone,
          cliente.telefone,
          cliente.email,
          cliente.senha,
          cliente.enderecos,
          cliente.cartoes,
          cliente.status
        );

        const cliente_id = await clienteDAO.adicionaCliente(cli);

        for (const endereco of cliente.enderecos) {
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
              cliente_id
            );
            await enderecoDAO.adicionar(end);
          }
  
          for (const cartao of cliente.cartoes) {
            const car = new Cartao(
              null,
              cartao.numero,
              cartao.nome,
              1,
              cartao.cvv,
              cartao.principal,
              cartao.status,
              cliente_id
            );
            if (cartao.numero) {
              await cartaoDAO.adicionar(car);
            }
          }
    }

    async buscarId(id){
        const clienteDAO = new ClienteDAO();
        const clientes = await clienteDAO.buscarId(id);
        return clientes;
    }

    async inativar(id){
        const clienteDAO = new ClienteDAO();
        const clientes = await clienteDAO.inativaCliente(id);
        return clientes;
    }

    async editar (cliente){
        const clienteDAO = new ClienteDAO();
        return await clienteDAO.editar(cliente);
    }

}
export default ClienteController