
module.exports = app => {

    const { existsOrError, notExistOrError, validateCNPJ } =  app.src.config.validation


    const save = async (req, res) => {
        const user = { ...req.body }
    
        try {
            existsOrError(user.usuario, 'Usuario não informado')
            existsOrError(user.nomeFantasia, 'Nome Fantasia não informado')
            existsOrError(user.razaoSocial, 'Razão Social não informado')
            existsOrError(user.cnpj, 'CNPJ não informado')
            existsOrError(validateCNPJ(user.cnpj), 'CNPJ invalido')

            await app.db.transaction()
            .query('SELECT id_usuario FROM usuario where id_usuario = ?', [user.usuario])
            .query((r) => {existsOrError(r[0], "Usuario invalido!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar cnpj. " + err ))
            .commit()

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where cnpj = ?', [user.cnpj])
            .query((r) => {notExistOrError(r[0], "CNPJ ja cadastrado!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar cnpj. " + err ))
            .commit()

        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db.query(
            'INSERT INTO empresa (id_usuario, nomeFantasia, razaoSocial, cnpj) VALUES (?, ?, ?,?)',
            [user.usuario, user.nomeFantasia, user.razaoSocial, user.cnpj]
        )
        .then(_=> res.status(200).send("Cadastrado com sucesso"))
        .catch(err => res.status(502).send("Erro ao salvar informações " + err ))
    }




    const update = async (req, res) => {
        const user = { ...req.body }

        try {
            existsOrError(req.params.id, 'Erro ao indetificar empresa')
            existsOrError(user.usuario, 'Usuario não informado')
            existsOrError(user.nomeFantasia, 'Nome Fantasia não informado')
            existsOrError(user.razaoSocial, 'Razão Social não informado')
            existsOrError(user.cnpj, 'CNPJ não informado')
            existsOrError(validateCNPJ(user.cnpj), 'CNPJ invalido')

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where id_usuario = ? and id_empresa = ?', [user.usuario, req.params.id])
            .query((r) => {existsOrError(r[0], "Empresa não encontrada!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar empresa. " + err ))
            .commit()

        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db.query(
            'UPDATE empresa set nomeFantasia = ?, razaoSocial = ?, cnpj = ?  WHERE id_empresa = ?',
            [user.nomeFantasia, user.razaoSocial, user.cnpj, +req.params.id]
        )
        .then(_=> res.status(200).send("Atualizado com sucesso!!"))
        .catch(err => res.status(502).send("Erro ao atualizar informações " + err ))
    }




    const search = async (req, res) => {
        await app.db.query('select * from empresa where id_usuario = ? ',[+req.params.id])
        .then(result=> res.status(200).send(result))
        .catch(err => res.status(502).send("Erro ao buscar informações " + err ))
    }




    const remove = async (req, res) => {
        const user = { ...req.body }

        try {

            existsOrError(req.params.id, 'Erro ao indetificar empresa')
            existsOrError(user.usuario, 'Usuario não informado')

            await app.db.transaction()
            .query('SELECT cnpj FROM empresa where id_usuario = ? and id_empresa = ?', [user.usuario, req.params.id])
            .query((r) => {existsOrError(r[0], "Empresa não encontrada!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar empresa. " + err ))
            .commit()
    
        } catch(msg) {
            return res.status(400).send(msg)
        }
    
        await app.db.query(
            'DELETE FROM empresa WHERE id_empresa = ?',
            [+req.params.id]
        )
        .then(_=> res.status(200).send("Empresa deletada com sucesso!!"))
        .catch(err => res.status(502).send("Erro ao deletar informações "))
    }

    return { save, update, search, remove}
}