
module.exports = app => {

    const { existsOrError, notExistOrError, validateEmail  } =  app.src.config.validation

    const save = async (req, res) => {
        const user = { ...req.body }
    
        try {
            existsOrError(user.usuario, 'Usuario não informado')
            existsOrError(user.empresa, 'Empresa não informado')
            existsOrError(user.nome, 'Nome não informado')
            existsOrError(user.telefone, 'Telefone não informado')
            existsOrError(user.email, 'Email não informado')
            existsOrError(validateEmail(user.email), 'Email invalido')

            await app.db.transaction()
            .query('SELECT email FROM cliente where email = ?', [user.email])
            .query((r) => {notExistOrError(r[0], "Email ja cadastrado!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar Email. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where id_empresa = ? and id_usuario = ?', [user.empresa, user.usuario])
            .query((r) => {existsOrError(r[0], "Empresa invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar empresa. " + err ))
            .commit()

        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db.query(
            'INSERT INTO cliente (id_empresa, nome, email, telefone) VALUES (?, ?, ?, ?)',
            [user.empresa, user.nome, user.email, user.telefone]
        )
        .then(_=> res.status(200).send("Cadastrado com sucesso"))
        .catch(err => res.status(502).send("Erro ao salvar informações " + err ))
    }




    const update = async (req, res) => {
        const user = { ...req.body }

        try {
            existsOrError(req.params.id, 'Cliente não encontrado')
            existsOrError(user.usuario, 'Usuario não informado')
            existsOrError(user.empresa, 'Empresa não informado')
            existsOrError(user.nome, 'Nome não informado')
            existsOrError(user.telefone, 'Telefone não informado')
            existsOrError(user.email, 'Email não informado')
            existsOrError(validateEmail(user.email), 'Email invalido')

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where id_empresa = ? and id_usuario = ?', [user.empresa, user.usuario])
            .query((r) => {existsOrError(r[0], "Empresa invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar empresa. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT nome FROM cliente where id_empresa = ? and id_cliente = ?', [user.empresa, +req.params.id])
            .query((r) => {existsOrError(r[0], "Cliente invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar cliente. " + err ))
            .commit()

        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db.query(
            'UPDATE cliente set nome = ?, email = ?, telefone = ?  WHERE id_cliente = ?',
            [user.nome, user.email, user.telefone, +req.params.id]
        )
        .then(_=> res.status(200).send("Atualizado com sucesso!!"))
        .catch(err => res.status(502).send("Erro ao atualizar informações " + err ))
    }




    const search = async (req, res) => {
        await app.db.query('select * from cliente where id_empresa = ? ', [+req.params.id])
        .then(result=> res.status(200).send(result))
        .catch(err => res.status(502).send("Erro ao buscar informações " + err ))
    }




    const remove = async (req, res) => {
        const user = { ...req.body }
        
        try {

            existsOrError(req.params.id, 'Cliente não encontrado')
            existsOrError(user.usuario, 'Usuario não informado')
            existsOrError(user.empresa, 'Empresa não informado')

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where id_empresa = ? and id_usuario = ?', [user.empresa, user.usuario])
            .query((r) => {existsOrError(r[0], "Empresa invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar empresa. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT nome FROM cliente where id_empresa = ? and id_cliente = ?', [user.empresa, +req.params.id])
            .query((r) => {existsOrError(r[0], "Cliente invalida!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar cliente. " + err ))
            .commit()
    
        } catch(msg) {
            return res.status(400).send(msg)
        }
    
        await app.db.query(
            'DELETE FROM cliente WHERE id_cliente = ?',
            [+req.params.id]
        )
        .then(_=> res.status(200).send("Cliente deletado com sucesso!!"))
        .catch(err => res.status(502).send("Erro ao deletar informações "))
    }

    return { save, update, search, remove }
}