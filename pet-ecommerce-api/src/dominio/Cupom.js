class Cupom {
  codigo;
  valor;
  tipo;
  pedido_origem_id;
  cliente_id;

  /**
   *
   * @param {string} codigo
   * @param {number} valor
   * @param {'Promocional'|'Troca'|'Troco'}tipo
   * @param {Cliente} cliente
   */
  constructor(codigo, valor, tipo, pedido_origem_id, cliente_id) {
    this.codigo = codigo;
    this.valor = valor;
    this.tipo = tipo;
    this.pedido_origem_id = pedido_origem_id;
    this.cliente_id = cliente_id;
  }
}

export default Cupom;
