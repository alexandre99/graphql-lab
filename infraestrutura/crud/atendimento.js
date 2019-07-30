const executaQuery = require('../database/queries')
const { toDateTimeMysql } = require('../../utils/dateutils')

class Atendimento {
  lista() {
    const sql = 'SELECT * FROM Atendimentos'

    executaQuery(sql)
  }

  buscaPorId(id) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${parseInt(id)}`

    executaQuery(sql)
  }

  adiciona(item) {
    const { cliente, pet, servico, status, observacoes } = item
    const data = toDateTimeMysql()

    const sql = `INSERT INTO Atendimentos(clienteId, petId, servicoId, data, status, observacoes) VALUES(${cliente}, ${pet}, ${servico}, '${data}', '${status}', '${observacoes}')`

    return executaQuery(sql).then(resposta => resposta.insertId)
  }

  atualiza(item) {
    const {id, cliente, pet, servico, status, observacoes } = item
    const data = toDateTimeMysql()

    const sql = `UPDATE Atendimentos SET clienteId=${cliente}, petId=${pet}, servicoId=${servico}, data='${data}', status='${status}', observacoes='${observacoes}' WHERE id=${id}`

    return executaQuery(sql).then(resposta => resposta.insertId)
  }

  deleta(id) {
    const sql = `DELETE FROM Atendimentos WHERE id=${id}`

    return executaQuery(sql).then(() => id)
  }
}

module.exports = new Atendimento
