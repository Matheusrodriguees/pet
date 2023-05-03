class Endereco {
    id;
    tpResidencia;
    tpLogradouro;
    logradouro;
    numero;
    nome;
    bairro;
    cep;
    cidade;
    estado;
    pais;
    observacao;
    cobranca;
    entrega;
    status;
    cliente_id;


    constructor(id, tpResidencia, tpLogradouro, logradouro, numero, nome, bairro, cep, cidade, estado, pais, observacao, cobranca, entrega, status, cliente_id) {
        this.id = id;
        this.tpResidencia = tpResidencia;
        this.tpLogradouro = tpLogradouro;
        this.logradouro = logradouro;
        this.numero = numero;
        this.nome = nome;
        this.bairro = bairro;
        this.cep = cep;
        this.cidade = cidade;
        this.estado = estado;
        this.observacao = observacao;
        this.cobranca = cobranca;
        this.entrega = entrega;
        this.status = status;
        this.cliente_id = cliente_id;
        this.pais = pais;
    }
}

export default Endereco;