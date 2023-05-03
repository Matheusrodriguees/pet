export default class Precificacao {
    id
    nome
    porcentagem
    produto

    constructor(id, nome, porcentagem, produto) {
        this.id = id;
        this.nome = nome;
        this.porcentagem = porcentagem;
        this.produto = produto;
    }
}