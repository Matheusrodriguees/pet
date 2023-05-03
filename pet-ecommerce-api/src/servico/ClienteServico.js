import Cliente from "../dominio/Cliente.js";
import ClienteDAO from "../dao/ClienteDAO.js";
import CryptoJS from "crypto-js";

class ClienteServico {
    clienteDAO

    constructor() {
        this.clienteDAO = new ClienteDAO();
    }

    criptografarSenha(senha){
        let senhaCriptografada = CryptoJS.AES.encrypt(senha, 'les2021').toString();
        return senhaCriptografada;
    }

    async adicionar(cliente){
       const result = await this.clienteDAO.adicionaCliente(cliente)
       console.log('result add', result)
    }

    async listar(){
        const result = await this.clienteDAO.listaClientes()
        console.log('result list', result)
    }

    async consultar(cliente){
        const result = await this.clienteDAO.listaCliente(cliente.id)
        console.log('result consult', result)
    }

    async alterar(cliente){
        const result = this.clienteDAO.alteraCliente(cliente)
        console.log('result alter', result)
    }

    async inativar(id){
        const result = clienteDAO.inativaCliente(cliente.id)
        console.log('result inactive', result)
    }




}
export default ClienteServico
