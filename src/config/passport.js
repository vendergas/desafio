const passport = require('passport')
const passportJwt = require('passport-jwt')
const { authSecret } = require('../../.env')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {

    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, async (payload, done) => {
        await app.db.transaction()
        .query('SELECT id_usuario FROM usuario where id_usuario = ?', [payload.id])
        .query((r) => done(null, r[0] ? { ...payload } : false ))
        .rollback(err => done(err, false))
        .commit()
    })

    passport.use(strategy)

    return { authenticate: () => passport.authenticate('jwt', { session: false }) }
}
