const executaQuery = require('../database/queries')
const { toDateTimeMysql } = require('../../utils/dateutils')

class Atendimento {
  lista() {
    const sql = 'SELECT * FROM Atendimentos'

    executaQuery(sql)
  }

  buscaPorId(id) {
    const sql = `SELECT
                  a.id,
                  a.data,
                  a.status,
                  a.observacoes,
                  c.id as donoId,  
                  c.nome as donoNome, 
                  c.cpf as donoCpf,
                  p.id as petId,
                  p.nome as petNome,
                  p.tipo as petTipo,
                  p.observacoes as petObservacoes,
                  s.id as servicoId,
                  s.nome as servicoNome,
                  s.descricao as servicoDescricao,
                  s.preco as servicoPreco
                FROM
                  Atendimentos a
                INNER JOIN
                  Clientes c ON a.clienteId = c.id
                INNER JOIN
                  Pets p on a.petId = p.id
                INNER JOIN
                  Servicos s on a.servicoId = s.id
                WHERE
                  a.id=${parseInt(id)}`

    return executaQuery(sql).then(atendimentos => {
      if (atendimentos[0]) {
        return ({
          id: atendimentos[0].id,
          data: atendimentos[0].data,
          status: atendimentos[0].status,
          observacoes: atendimentos[0].observacoes,
          cliente: {
            id: atendimentos[0].donoId,
            nome: atendimentos[0].donoNome,
            cpf: atendimentos[0].donoCpf
          },
          pet: {
            id: atendimentos[0].petId,
            nome: atendimentos[0].petNome,
            tipo: atendimentos[0].petTipo,
            observacoes: atendimentos[0].petObservacoes
          },
          servico: {
            id: atendimentos[0].servicoId,
            nome: atendimentos[0].servicoNome,
            descricao: atendimentos[0].servicoDescricao,
            preco: atendimentos[0].servicoPreco
          }
        })
      }
    })
  }

  adiciona(item) {
    const { cliente, pet, servico, status, observacoes } = item
    const data = toDateTimeMysql()

    const sql = `INSERT INTO Atendimentos(clienteId, petId, servicoId, data, status, observacoes) VALUES(${cliente}, ${pet}, ${servico}, '${data}', '${status}', '${observacoes}')`

    return executaQuery(sql).then(resposta => ({
      id: resposta.insertId,
      status: status,
      observacoes: observacoes,
      data: data
    }))
  }

  atualiza(item) {
    const { id, cliente, pet, servico, status, observacoes } = item
    const data = toDateTimeMysql()

    const sql = `UPDATE Atendimentos SET clienteId=${cliente}, petId=${pet}, servicoId=${servico}, data='${data}', status='${status}', observacoes='${observacoes}' WHERE id=${id};
                  SELECT * FROM Clientes WHERE id=${cliente};
                  SELECT * FROM Pets WHERE id=${pet};
                  SELECT * FROM Servicos WHERE id=${servico};`

    return executaQuery(sql).then(dados => {
      console.log(dados)
      const cliente = dados[1][0]
      const pet = dados[2][0]
      const servico = dados[3][0]
      return ({
        ...item,
        data,
        cliente,
        pet,
        servico
      })
    })
  }

  deleta(id) {
    const sql = `DELETE FROM Atendimentos WHERE id=${id}`

    return executaQuery(sql).then(() => id)
  }
}

module.exports = new Atendimento
