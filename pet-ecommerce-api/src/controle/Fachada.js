// -------------- Controllers --------------
import BandeiraController from "./BandeiraController.js";
import CartaoController from "./CartaoController.js";
import ClienteController from "./ClienteController.js";
import CupomController from "./CupomController.js";
import EnderecoController from "./EnderecoController.js";
import EstoqueController from "./EstoqueController.js";
import FreteController from "./FreteController.js";
import PagamentoController from "./PagamentoController.js";
import PedidoController from "./PedidoController.js";
import PrecificacaoController from "./PrecificacaoController.js";
import ProdutoCategoriaController from "./ProdutoCategoriaController.js";
import ProdutoController from "./ProdutoController.js";
import StatusController from "./StatusController.js";

class Fachada {
  constructor() {}

  async cadastrar(dados, entidade) {
    console.log("dados", dados);
    switch (entidade) {
      case "cliente":
        const clienteController = new ClienteController()
        await clienteController.adicionar(dados)
        break;
      case "endereco":
        const enderecoController = new EnderecoController()
        return await enderecoController.adicionar(dados)
      case "cartao":
        const cartaoController = new CartaoController();
        await cartaoController.adicionar(dados)
        break;
      case "produto":
        const produtoController = new ProdutoController()
        await produtoController.adicionar(dados)
        break;
      case "pedido":
        const pedidoController = new PedidoController()
        let pedidos = await pedidoController.adicionar(dados);
        return pedidos;
      case "cupom":
        const cupomController = new CupomController()
        return await cupomController.adicionar(dados)
      default:
        throw new Error("Entidade não encontrada");
    }
  }

  async listar(entidade) {
    switch (entidade) {
      case "cliente":
        const clienteController = new ClienteController()
        return await clienteController.listar();
      case "endereco":
        const enderecoController = new EnderecoController();
        const enderecos = await enderecoController.listar();
        return enderecos;
      case "cartao":
        const cartaoController = new CartaoController();
        const cartoes = await cartaoController.listar();
        return cartoes;
      case "bandeira":
        const bandeiraController = new BandeiraController()
        return await bandeiraController.listar();
      case "produto":
        const produtoController = new ProdutoController()
        return await produtoController.listar();
      case "pedido":
        const pedidoController = new PedidoController()
        return await pedidoController.listar();
      case "produtoCategoria":
        const produtoCategoriaController = new ProdutoCategoriaController
        return await produtoCategoriaController.listar();
      case "cupom":
        const cupomController = new CupomController()
        const cupons = await cupomController.listar();
        return cupons;
      case "frete":
        const freteController = new FreteController();
        const fretes = await freteController.listar();
        return fretes;
      case "estoque":
        const estoqueController = new EstoqueController();
        return await estoqueController.listar();
      case "precificacao":
        const precificaoController = new PrecificacaoController
        return await precificaoController.listar();
    }
  }

  async inativar(id, entidade) {
    switch (entidade) {
      case "cliente":
        const clienteController = new ClienteController()
        const clientes = await clienteController.inativar(id);
        return clientes;
      case "endereco":
        const enderecoController = new EnderecoController();
        const enderecos = await enderecoController.inativar(id);
        return enderecos;
      case "cartao":
        const cartaoController = new CartaoController();
        const cartoes = await cartaoController.inativar(id);
        return cartoes;
      case "cupom":
        const cupomController = new CupomController()
        return await cupomController.inativar(id);
    }
  }

  async buscarId(id, entidade) {
    switch (entidade) {
      case "cliente":
        const clienteController = new ClienteController()
        const clientes = await clienteController.buscarId(id);
        return clientes;
      case "endereco":
        const enderecoController = new EnderecoController();
        const enderecos = await enderecoController.buscarId(id);
        return enderecos;
      case "cartao":
        const cartaoController = new CartaoController();
        await cartaoController.buscarId(id);
        return await cartaoController.listar()
      case "pagamento":
        const pagamentoController = new PagamentoController();
        const pagamentos = await pagamentoController.listar(id);
        return pagamentos;
    }
  }

  async listarPorCliente(id, entidade) {
    switch (entidade) {
      case "cupom":
        const cupomController = new CupomController()
        const cupons = await cupomController.listarPorCliente(id);
        return cupons;
    }
  }

  async editar(id, dados, entidade) {
    console.log(dados);
    console.log("entidade", entidade);
    switch (entidade) {
      case "pedido":
        const pedidoController = new PedidoController()
        const pedidos = await pedidoController.editar(id, dados);
        return pedidos;
      case "cupom":
        const cupomController = new CupomController()
        return await cupomController.editar(dados);
      case "cliente":
        const clienteController = new ClienteController()
        return await clienteController.editar(dados);
      case "estoque":
        const estoqueController = new EstoqueController();
        return await estoqueController.editar(dados);
    }
  }

  async buscarPorNome(nome, entidade) {
    switch (entidade) {
      case "status":
        const statusController = new StatusController();
        const status = await statusController.buscarPorNome(nome);
        return status;
    }
  }

  async obterResumoVendas(produtos,inicio,fim){
    const produtoController = new ProdutoController()
    const valores = produtoController.obterResumoVendas(produtos,inicio,fim)
    return valores;
  }

}

export default Fachada;
