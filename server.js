const { GraphQLServer } = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')
const Operacoes = require('./infraestrutura/operations')

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})

const Clientes = new Operacoes('cliente')
const Pets = new Operacoes('pet')
const Servicos = new Operacoes('servico')
const Atendimentos = new Operacoes('atendimento')

const resolvers = {
  Query: {
    status: () => 'Servidor rodando',
    clientes: () => Clientes.lista(),
    cliente: (root, { id }) => Clientes.buscaPorId(id),

    pets: () => Pets.lista(),
    pet: (root, { id }) => Pets.buscaPorId(id),

    servicos: () => Servicos.lista(),
    servico: (root, { id }) => Servicos.buscaPorId(id),

    atendimento: (root, { id }) => Atendimentos.buscaPorId(id)
  },
  Mutation: {
    adicionarCliente: (root, params) => Clientes.adiciona(params),
    atualizarCliente: (root, params) => Clientes.atualiza(params),
    deletarCliente: (root, { id }) => Clientes.deleta(id),

    adicionarPet: (root, params) => Pets.adiciona(params),
    atualizarPet: (root, params) => Pets.atualiza(params),
    deletarPet: (root, { id }) => Pets.deleta(id),

    adicionarServico: (root, params) => Servicos.adiciona(params),
    atualizarServico: (root, params) => Servicos.atualiza(params),
    deletarServico: (root, { id }) => Servicos.deleta(id),

    adicionarAtendimento: (root, params) => Atendimentos.adiciona(params),
    atualizarAtendimento: (root, params) => Atendimentos.atualiza(params),
    deletarAtendimento: (root, { id }) => Atendimentos.deleta(id)
  }
}

const servidor = new GraphQLServer({
  resolvers,
  typeDefs: './schema.graphql'
})

servidor.start(() => console.log("Servidor rodando"))