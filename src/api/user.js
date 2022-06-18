const uniqid =  require('uniqid')
const bcrypt = require('bcrypt-nodejs')



module.exports = app => {

    const { transporter, mailData } = app.src.config.email
    const { existsOrError, notExistOrError, equalsOrError, validateEmail } = app.src.config.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }




    const save = async (req, res) => {
        const user = { ...req.body }
    
        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'Email não informado')
            existsOrError(validateEmail(user.email), 'Email invalido')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.password.length > 3, 'Senha muito pequena')
            existsOrError(user.confirmPassword, 'Confirmação da senha não informada')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            await app.db.transaction()
            .query('SELECT email FROM usuario where email = ?', [user.email])
            .query((r) => {notExistOrError(r[0], "Email ja cadastrado!!")})
            .rollback(err => res.status(502).send("Erro ao encontrar email. " + err ))
            .commit()

            user.password = encryptPassword(user.password)

        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db.query(
            'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
            [user.name, user.email, user.password]
        )
        .then(_=> res.status(200).send("Cadastrado com sucesso"))
        .catch(err => res.status(502).send("Erro ao salvar informações " + err ))
    }




    const update = async (req, res) => {
        const user = { ...req.body }

        try {
            existsOrError(req.params.id, 'Erro ao indetificar usuario')
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'Email não informado')

        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db.query(
            'UPDATE usuario set nome = ?, email = ? WHERE id_usuario = ?',
            [user.name, user.email, +req.params.id]
        )
        .then(_=> res.status(200).send("Atualizado com sucesso!!"))
        .catch(err => res.status(502).send("Erro ao atualizar informações " + err ))
    }




    const updatePassword = async (req, res) => {
        const user = { ...req.body }

        try {
            existsOrError(req.params.id, 'Erro ao indetificar usuario')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.newPassword, 'Senha nova não informada')
            existsOrError(user.confirmNewPassword, 'Confirmação da senha nova não informada')
            equalsOrError(user.newPassword, user.confirmNewPassword, 'Senhas não conferem')

            const pw = await app.db.transaction()
            .query('SELECT * FROM usuario where id_usuario = ?', [+req.params.id])
            .query((r) => {existsOrError(r[0], "Erro ao indetificar usuario")})
            .rollback(err => res.status(502).send("Erro ao encontrar email. " + err ))
            .commit()

            const isMatch = bcrypt.compareSync(user.password, pw[0][0].senha)
            if (!isMatch) return res.status(401).send('Senha invalida!!')

            user.newPassword = encryptPassword(user.newPassword)

        } catch(msg) {
            return res.status(400).send(msg)
        }

        await app.db.query(
            'UPDATE usuario set senha = ? WHERE id_usuario = ?',
            [user.newPassword, +req.params.id]
        )
        .then(_=> res.status(200).send("Atualizado com sucesso!!"))
        .catch(err => res.status(502).send("Erro ao atualizar informações " + err ))
    }




    const remove = async (req, res) => {
        const user = { ...req.body }

        try {

            existsOrError(req.params.id, 'Erro ao indetificar usuario')
            existsOrError(user.password, 'Senha não informada')

            const pw = await app.db.transaction()
            .query('SELECT * FROM usuario where id_usuario = ?', [+req.params.id])
            .query((r) => {existsOrError(r[0], "Erro ao indetificar usuario")})
            .rollback(err => res.status(502).send("Erro ao encontrar email. " + err ))
            .commit()

            const isMatch = bcrypt.compareSync(user.password, pw[0][0].senha)
            if (!isMatch) return res.status(401).send('Senha invalida!!')
    
        } catch(msg) {
            return res.status(400).send(msg)
        }
    
        await app.db.query(
            'DELETE FROM usuario WHERE id_usuario = ?',
            [+req.params.id]
        )
        .then(_=> res.status(200).send("Usuario deletado com sucesso!!"))
        .catch(err => res.status(502).send("Erro ao deletar informações "))
    }




    const recovery = async (req, res) => {
        try {
            const data = {...req.body}
    
            await app.db.transaction()
            .query('SELECT * FROM usuario where email = ? ', [data.email])
            .query((r) => {existsOrError(r[0], 'usuário não encontrado. Verifique seus dados de acesso')})
            .rollback(err => res.status(502).send("Erro ao encontrar usuário. " + err ))
            .commit()
    
            const newPass = uniqid.time()
            const newPassword = encryptPassword(newPass)
    
    
    
            await app.db.transaction()
            .query('UPDATE usuario set senha = ? where email = ?', [newPassword, data.email])
            .rollback(err => res.status(502).send("Erro ao encontrar usuário. " + err ))
            .commit()
    
            transporter.sendMail(mailData(data.email, newPass), function (err, info) {
            if(err)
                res.status(400).send("Erro ao enviar")
            else
            res.status(200).send(`Enviamos sua nova senha para email (${data.email})`)
            })
    
        } catch(msg) {
            return res.status(400).send(msg)
        }
    }

    return { save, update, updatePassword, remove, recovery }
}