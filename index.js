const app = require('express')()
const consign = require('consign')
const db = require('./src/config/db')

app.db = db

consign()
    .include('./src/config/passport.js')
    .then('./src/config/middlewares.js')
    .then('./src/config/validation.js')
    .then('./src/config/email.js')
    .then('./src/api')
    .then('./src/config/routes.js')
    .into(app)


app.listen(3000, () => {
    console.log('Backend excutando...')
})