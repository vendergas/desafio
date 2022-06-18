const serverlessMysql = require('serverless-mysql')
const { db } = require('../../.env')


const mysql = serverlessMysql({
    config: {
        host: db.host,
        user: db.user,
        port: db.port,
        password: db.password,
        database: db.database
    }
})

module.exports = mysql