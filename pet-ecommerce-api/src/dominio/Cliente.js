class Cliente {
  id;
  nome;
  genero;
  dataNascimento;
  cpf;
  ddd;
  telefone;
  email;
  senha;
  status;
  enderecos;
  cartoes;

  constructor(
    id,
    nome,
    genero,
    dataNascimento,
    cpf,
    ddd,
    telefone,
    email,
    senha,
    enderecos,
    cartoes,
    status
  ) {
    this.id = id;
    this.nome = nome;
    this.genero = genero;
    if (dataNascimento) {
      this.dataNascimento = new Date(dataNascimento);
    }
    this.cpf = cpf;
    this.ddd = ddd;
    this.telefone = telefone;
    this.email = email;
    this.senha = senha;
    this.status = status;
    this.enderecos = enderecos;
    this.cartoes = cartoes;
  }
}

export default Cliente;
