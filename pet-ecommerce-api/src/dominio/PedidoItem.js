export default class PedidoItem {
  id;
  quantidade;
  produto;
  pedido;
  status;

  constructor(id, quantidade, produto, pedido, status, status_nome) {
    this.id = id;
    this.quantidade = quantidade;
    this.produto = produto;
    this.pedido = pedido;
    this.status_id = status;
    this.status_nome = status_nome;
  }
}
