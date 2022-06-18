Informações para usa da api

variaveis de ambiente

module.exports = {
    authSecret: 'chave jmt',
    db: {
        host : '',
        database: '',
        user: '',
        port: 12345,
        password: ''
    },
    email: {
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: 'gmail',
          pass: 'senha do gmail',
        },
        secure: true
    }
}

as configurações de email são especificas para gmail, caso use outro provedor, altere as configurações de acordo com o seu provedor.

***********************************
Docker

comando para criação do container

docker run --name desafio-mysql -e MYSQL_ROOT_PASSWORD=minha-senha -d --restart unless-stopped -p 12345:3306 mysql:5.7.32

**********************************
Arquivos

banco.spl -> arquivo onde ficar a estrutura do banco de dados em mysql.
teste_rotas.har -> arquivo que pode ser importado no postman ou insomnia para teste de rotas.

********************************

Estrutura da api

Dentro da pasta src esta as seguites pastas

1-api = onde fica todas as funções do crud da apicação.

2-config/email = configurações para envio de email.

3-config/db = configuração da base de dados.

4-cofing/passport = Validação do token de autenticação

5-config/routes = rotas da api usando as funções da pasta api

5-config/validation = algumas funções para validade dados expecificos

*******************************************

Detalhes das rotas

Body------------------------

{
	"usuario": (id_usuario),
	"empresa": (id_produto),
	"cliente": (id_cliente),
	"pedido": (id_pedido)
}

Esses dados que são pedidos no body representa os id de cada tabela específico de cada nome


---------------------------------------------------------------


http://localhost:3000/recuperarSenha/

recupera a senha atraves do email. Um email será enviado para o email solicitado com a nova senha.


http://localhost:3000/usuario/atualizarSenha/(id_usuario)

atualizar a senha do usuario que está logado.


empresa----------------------------------------------------

Put and DELETE - http://localhost:3000/empresa/(id_empresa)

GET - http://localhost:3000/empresa/(id_usuario)


cliente----------------------------------------------------

Put and DELETE - http://localhost:3000/empresa/(id_cliente)

GET - http://localhost:3000/empresa/(id_empresa)


Pedido----------------------------------------------------

Put and DELETE - http://localhost:3000/empresa/(id_pedido)

GET - http://localhost:3000/empresa/(id_empresa)


Produto----------------------------------------------------

Put and DELETE - http://localhost:3000/empresa/(id_produto)

GET - http://localhost:3000/empresa/(id_empresa)


Pedido_Produto----------------------------------------------------

Put and DELETE - http://localhost:3000/empresa/(id_pedido_produto)

GET - http://localhost:3000/empresa/(id_produto)





