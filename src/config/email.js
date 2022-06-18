const nodemailer =  require('nodemailer')
const { email } = require('../../.env')

const transporter = nodemailer.createTransport({
    port: email.port,
    host: email.host,
    auth: {
      user: email.user,
      pass: email.pass,
    },
    secure: email.secure
})

const mailData = (email, newPass)  => {
    return {
        from: email.user,
        to: email,
        subject: 'Solicitação de recuperação de senha',
        html: ` <div>
                    <h1>Senha nova: ${newPass}</h1>
                    <h1>Essa é sua nova senha, de acesso. Caso queira altera-la depois, basta acessar sua conta na paga do seu perfil</h1><br/>
                </div>`
    }
}

module.exports = { transporter, mailData }