
module.exports = app => {

    const { existsOrError, notExistOrError  } =  app.src.config.validation


    const save = async (req, res) => {
        const user = { ...req.body }
        
        try {
            existsOrError(user.usuario, 'Usuario não informado')
            existsOrError(user.empresa, 'Empresa não informado')
            existsOrError(user.cliente, 'Cliente não informado')
            existsOrError((typeof user.observacao == 'string'), 'Observação não informado')
            existsOrError(user.data, 'Valor não informado')
            notExistOrError(new Date(user.data) == "Invalid Date", 'Data Invalida, verifique se a data esta nesse formato (ano-mes-dia)')

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where id_empresa = ? and id_usuario = ?', [user.empresa, user.usuario])
            .query((r) => {existsOrError(r[0], "Empresa invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar cnpj. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT nome FROM cliente where id_empresa = ? and id_cliente = ?', [user.empresa, user.cliente])
            .query((r) => {existsOrError(r[0], "Cliente invalido!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar cliente. " + err ))
            .commit()


        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db.query(
            'INSERT INTO pedido (id_empresa, id_cliente, numero, observacao, data) VALUES (?, ?, ?, ?, ?)',
            [user.empresa, user.cliente, parseInt(Math.random() * 10000000), user.observacao, user.data]
        )
        .then(_=> res.status(200).send("Cadastrado com sucesso"))
        .catch(err => res.status(502).send("Erro ao salvar informações " + err ))
    }




    const update = async (req, res) => {
        const user = { ...req.body }

        try {
            existsOrError(req.params.id, 'Erro ao indetificar Pedido')
            existsOrError(user.usuario, 'Usuario não informado')
            existsOrError(user.empresa, 'Empresa não informado')
            existsOrError(user.cliente, 'Cliente não informado')
            existsOrError((typeof user.observacao == 'string'), 'Observação não informado')
            existsOrError(user.data, 'Valor não informado')
            notExistOrError(new Date(user.data) == "Invalid Date", 'Data de vencimento Invalida, verifique se a data esta nesse formato (ano-mes-dia)')

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where id_empresa = ? and id_usuario = ?', [user.empresa, user.usuario])
            .query((r) => {existsOrError(r[0], "Empresa invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar empresa. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT nome FROM cliente where id_empresa = ? and id_cliente = ?', [user.empresa, user.cliente])
            .query((r) => {existsOrError(r[0], "Cliente invalido!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar cliente. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT id_pedido FROM pedido where id_empresa = ? and id_pedido = ?', [user.empresa, +req.params.id])
            .query((r) => {existsOrError(r[0], "Pedido invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar pedido. " + err ))
            .commit()

        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db.query(
            'UPDATE pedido set id_cliente = ?, observacao = ?, data = ?  WHERE id_pedido = ?',
            [user.cliente, user.observacao, user.data, +req.params.id]
        )
        .then(_=> res.status(200).send("Atualizado com sucesso!!"))
        .catch(err => res.status(502).send("Erro ao atualizar informações " + err ))
    }




    const search = async (req, res) => {
        await app.db.query(
            'select id_pedido, nome as cliente, numero as numeroPedido, observacao, data ' +
            'from pedido p, cliente c where p.id_cliente = c.id_cliente and p.id_empresa = ? ', [+req.params.id]
        )
        .then(result=> res.status(200).send(result))
        .catch(err => res.status(502).send("Erro ao buscar informações " + err ))
    }




    const remove = async (req, res) => {
        const user = { ...req.body }

        try {
            existsOrError(req.params.id, 'Erro ao indetificar Pedido')
            existsOrError(user.usuario, 'Usuario não informado')
            existsOrError(user.empresa, 'Empresa não informado')
            existsOrError(user.cliente, 'Cliente não informado')

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where id_empresa = ? and id_usuario = ?', [user.empresa, user.usuario])
            .query((r) => {existsOrError(r[0], "Empresa invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar empresa. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT id_cliente FROM cliente where id_empresa = ? and id_cliente = ?', [user.empresa, user.cliente])
            .query((r) => {existsOrError(r[0], "Cliente invalido!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar cliente. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT id_pedido FROM pedido where id_empresa = ? and id_pedido = ?', [user.empresa, +req.params.id])
            .query((r) => {existsOrError(r[0], "Pedido invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar pedido. " + err ))
            .commit()
    
        } catch(msg) {
            return res.status(400).send(msg)
        }
    
        await app.db.query(
            'DELETE FROM pedido WHERE id_pedido = ?',
            [+req.params.id]
        )
        .then(_=> res.status(200).send("Pedido deletado com sucesso!!"))
        .catch(err => res.status(502).send("Erro ao deletar informações "))
    }

    return { save, update, search, remove }
}