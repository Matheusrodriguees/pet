export default class Pedido {
    id
    client
    data
    valor
    status
    frete
    endereco
    cupom
    pagamento

    /**
     *
     * @param {number} id
     * @param {PedidoItem[]} items
     * @param {Cliente} cliente
     * @param {Date} data
     * @param {number} valor
     * @param {Pedido} status
     * @param {number} frete
     * @param {Endereco} endereco
     * @param {Cupom} cupom
     */
    constructor(id, items, cliente, data, valor, status, frete, endereco, cupom, pagamento) {
        this.id = id;
        this.cliente = cliente;
        this.data = new Date(data);
        this.valor = items ? items.reduce(function(acumulador, valorAtual, indice, array) {
            return acumulador + (array[indice].produto.valor * array[indice].quantidade);
        }, 0) : 0;
        this.status = status;
        this.frete = frete;
        this.endereco = endereco;
        this.cupom = cupom;
        this.items = items;
        this.pagamento = pagamento
    }
}