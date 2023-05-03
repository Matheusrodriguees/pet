export class Produto {
  /**
   *
   * @param {number} id
   * @param {string} nome
   * @param {string} descricao
   * @param {number} valor
   * @param {ProdutoCategoria} categoria
   * @param {number} quantidade_estoque
   */
  constructor(id, nome, descricao, valor, categoria, quantidade_estoque) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.valor = valor;
    this.categoria = categoria;
    this.quantidade_estoque = quantidade_estoque;
  }
}
