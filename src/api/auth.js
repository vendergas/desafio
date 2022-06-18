const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const { authSecret } = require('../../.env')

module.exports = app => {

    const { existsOrError } = app.src.config.validation

    const signin = async (req, res) => {
        
        const signin = { ...req.body }
        existsOrError(signin.email, 'Email não informado')
        existsOrError(signin.password, 'Senha não informada')
        
        let user
        
        await app.db.transaction()
        .query('SELECT * FROM usuario where email = ?', [signin.email])
        .query((r) => user = r[0])
        .rollback(err => res.status(502).send("Erro ao encontrar email. " + err ))
        .commit()
        
        if(!user) return res.status(400).send('Usuário não encontrado!')
        
        const isMatch = bcrypt.compareSync(signin.password, user.senha)
        if (!isMatch) return res.status(401).send('Email/Senha invalidos!')
        
        const now = Math.floor(Date.now() / 1000)
    
        const payload = {
            id: user.id_usuario,
            email: user.email,
            name: user.nome,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }
    
        res.json({ 
            ...payload,
            token: jwt.encode(payload, authSecret)
         })
    }

    return { signin }
}