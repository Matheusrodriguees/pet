class Cartao {
    id;
    numero;
    nome;
    bandeira;
    cvv;
    principal;
    status;
    cliente_id;
    criado_em;
    atualizado_em;

    constructor (id, numero, nome, bandeira, cvv, principal, status, cliente_id, criado_em, atualizado_em) {
        this.id = id;
        this.numero = numero;
        this.nome = nome;
        this.bandeira = bandeira;
        this.cvv = cvv;
        this.principal = principal;
        this.status = status;
        this.cliente_id = cliente_id;
        this.criado_em = criado_em;
        this.atualizado_em = atualizado_em;
    }
}

export default Cartao;