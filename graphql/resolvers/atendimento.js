const Operacoes = require('../../infraestrutura/operations')
const Atendimentos = new Operacoes('atendimento')

const resolvers = {
    Query: {
        atendimento: (root, { id }) => Atendimentos.buscaPorId(id),
        atendimentos: () => Atendimentos.lista()
    },
    Mutation: {
        adicionarAtendimento: (root, params) => Atendimentos.adiciona(params),
        atualizarAtendimento: (root, params) => Atendimentos.atualiza(params),
        deletarAtendimento: (root, { id }) => Atendimentos.deleta(id)
    }
}

module.exports = resolvers;