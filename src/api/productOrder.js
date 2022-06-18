
module.exports = app => {

    const { existsOrError } = app.src.config.validation

    
    const save = async (req, res) => {
        const user = { ...req.body }
        
        try {
            existsOrError(user.usuario, 'Usuario não informado')
            existsOrError(user.empresa, 'Empresa não informado')
            existsOrError(user.pedido, 'Pedido não informado')
            existsOrError(user.produto, 'produto não informado')
            existsOrError(user.quantidade, 'Quantidade não informada')

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where id_empresa = ? and id_usuario = ?', [user.empresa, user.usuario])
            .query((r) => {existsOrError(r[0], "Empresa invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar empresa. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT id_pedido FROM pedido where id_empresa = ? and id_pedido = ?', [user.empresa, user.pedido])
            .query((r) => {existsOrError(r[0], "Pedido invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar pedido. " + err ))
            .commit()


        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db.query(
            'INSERT INTO pedido_produto (id_pedido, id_produto, quantidade) VALUES (?, ?, ?)',
            [user.pedido, user.produto, user.quantidade]
        )
        .then(_=> res.status(200).send("Cadastrado com sucesso"))
        .catch(err => res.status(502).send("Erro ao salvar informações " + err ))
    }




    const search = async (req, res) => {

        const value = (result) => {
            let value = 0

            result.map((obj) => {
                value += obj.valorUnidade * obj.quantidade
            }) 

            return value
        }

        await app.db.query(
            'select id_pedido_produto, nome as produto, quantidade, valor as valorUnidade ' +
            'from pedido_produto pp, produto p where pp.id_produto = p.id_produto and id_pedido = ? ', [+req.params.id]
        )
        .then(result=> {
            return {
                valorTotal: value(result),
                result
            }
        })
        .then(result=> res.status(200).send(result))
        .catch(err => res.status(502).send("Erro ao buscar informações " + err ))
    }




    const remove = async (req, res) => {
        const user = { ...req.body }

        try {
            existsOrError(req.params.id, 'Erro ao indetificar Produto do pedido')
            existsOrError(user.empresa, 'Empresa não informado')
            existsOrError(user.pedido, 'Pedido não informado')

            await app.db.transaction()
            .query('SELECT id_pedido FROM pedido where id_empresa = ? and id_pedido = ?', [user.empresa, user.pedido])
            .query((r) => {existsOrError(r[0], "Pedido invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar pedido. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT id_pedido_produto FROM pedido_produto where id_pedido = ? and id_pedido_produto = ?', [user.pedido, +req.params.id])
            .query((r) => {existsOrError(r[0], "Pedido invalido!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar pedido. " + err ))
            .commit()
    
        } catch(msg) {
            return res.status(400).send(msg)
        }
    
        await app.db.query(
            'DELETE FROM pedido_produto WHERE id_pedido_produto = ?',
            [+req.params.id]
        )
        .then(_=> res.status(200).send("Usuario deletado com sucesso!!"))
        .catch(err => res.status(502).send("Erro ao deletar informações "))
    }

    return { save, search, remove }
}