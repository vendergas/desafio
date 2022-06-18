
module.exports = app => {

    const { existsOrError  } = app.src.config.validation

    const save = async (req, res) => {
        const user = { ...req.body }
    
        try {
            existsOrError(user.usuario, 'Usuario não informado')
            existsOrError(user.empresa, 'Empresa não informado')
            existsOrError(user.nome, 'Nome não informado')
            existsOrError((typeof user.descricao == 'string'), 'Descrição não informado')
            existsOrError(user.valor, 'Valor não informado')
            existsOrError((!isNaN(user.valor)), 'Valor invalido')

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where id_empresa = ? and id_usuario = ?', [user.empresa, user.usuario])
            .query((r) => {existsOrError(r[0], "Empresa invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar empresa. " + err ))
            .commit()

        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db.query(
            'INSERT INTO produto (id_empresa, nome, valor, descricao) VALUES (?, ?, ?, ?)',
            [user.empresa, user.nome, user.valor, user.descricao]
        )
        .then(_=> res.status(200).send("Cadastrado com sucesso"))
        .catch(err => res.status(502).send("Erro ao salvar informações " + err ))
    }




    const update = async (req, res) => {
        const user = { ...req.body }

        try {
            existsOrError(req.params.id, 'Erro ao indetificar Produto')
            existsOrError(user.usuario, 'Usuario não informado')
            existsOrError(user.empresa, 'Empresa não informado')
            existsOrError(user.nome, 'Nome não informado')
            existsOrError((typeof user.descricao == 'string'), 'Descrição não informado')
            existsOrError(user.valor, 'Valor não informado')
            existsOrError((!isNaN(user.valor)), 'Email invalido')

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where id_empresa = ? and id_usuario = ?', [user.empresa, user.usuario])
            .query((r) => {existsOrError(r[0], "Empresa invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar empresa. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT nome FROM produto where id_empresa = ? and id_produto = ?', [user.empresa, +req.params.id])
            .query((r) => {existsOrError(r[0], "Produto invalido!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar produto. " + err ))
            .commit()

        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db.query(
            'UPDATE produto set nome = ?, valor = ?, descricao = ?  WHERE id_produto = ?',
            [user.nome, user.valor, user.descricao, +req.params.id]
        )
        .then(_=> res.status(200).send("Atualizado com sucesso!!"))
        .catch(err => res.status(502).send("Erro ao atualizar informações " + err ))
    }




    const search = async (req, res) => {
        await app.db.query('select * from produto where id_empresa = ? ', [+req.params.id])
        .then(result=> res.status(200).send(result))
        .catch(err => res.status(502).send("Erro ao buscar informações " + err ))
    }




    const remove = async (req, res) => {
        const user = { ...req.body }
        
        try {
            existsOrError(req.params.id, 'Erro ao indetificar Produto')
            existsOrError(user.usuario, 'Usuario não informado')
            existsOrError(user.empresa, 'Empresa não informado')

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where id_empresa = ? and id_usuario = ?', [user.empresa, user.usuario])
            .query((r) => {existsOrError(r[0], "Empresa invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar empresa. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT nome FROM produto where id_empresa = ? and id_produto = ?', [user.empresa, +req.params.id])
            .query((r) => {existsOrError(r[0], "Produto invalido!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar produto. " + err ))
            .commit()
    
        } catch(msg) {
            return res.status(400).send(msg)
        }
    
        await app.db.query(
            'DELETE FROM produto WHERE id_produto = ?',
            [+req.params.id]
        )
        .then(_=> res.status(200).send("Produto deletado com sucesso!!"))
        .catch(err => res.status(502).send("Erro ao deletar informações "))
    }

    return { save, update, search, remove }
}