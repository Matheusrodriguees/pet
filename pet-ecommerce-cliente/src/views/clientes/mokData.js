//Array com dados clientes
const clientes = [
    {
        id: 1,
        nome: 'Usuário teste',
        genero: 'Feminino',
        dataNascimento: '11/09/2000',
        cpf: '123.456.789-0',
        dddTelefone: '11',
        telefone: '12345678',
        email: 'usuario@teste.com',
        senha: 'teste123',
        enderecos: [{
            endereco: {
                tpResidencia: 'Casa',
                tpLogradouro: 'Rua',
                logradouro: 'Teste de rua',
                numero: '123',
                nome: '',
                bairro: 'Parque teste',
                cep: '00000-000',
                cidade: 'Poá',
                estado: 'São Paulo',
                pais: 'BR',
                observacao: '',
                cobranca: true,
                entrega: true
            },
            endereco: {
                tpResidencia: 'Casa',
                tpLogradouro: 'Rua',
                logradouro: 'Teste de rua',
                numero: '123',
                nome: '',
                bairro: 'Parque teste',
                cep: '00000-000',
                cidade: 'Poá',
                estado: 'São Paulo',
                pais: 'BR',
                observacao: '',
                cobranca: true,
                entrega: true
            },
            endereco: {
                tpResidencia: 'Casa',
                tpLogradouro: 'Rua',
                logradouro: 'Teste de rua',
                numero: '123',
                nome: '',
                bairro: 'Parque teste',
                cep: '00000-000',
                cidade: 'Poá',
                estado: 'São Paulo',
                pais: 'BR',
                observacao: '',
                cobranca: true,
                entrega: true
            },
        }],
        cartoes: [{
            cartao: {
                numero: '0000 0000 0000 0000', 
                nome: 'TESTE TEST',
                bandeira : 'Visa',
                cvv: '000',
                principal: true, 
            }
        

        }],
        status: 'Ativo'  
    }
]
export default clientes
