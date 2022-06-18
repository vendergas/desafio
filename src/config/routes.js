module.exports = app => {

    app.post('/cadastro', app.src.api.user.save)
    app.post('/login', app.src.api.auth.signin)
    app.post('/recuperarSenha', app.src.api.user.recovery)




    app.route('/usuario/:id')
        .all(app.src.config.passport.authenticate())
        .put(app.src.api.user.update)
        .delete(app.src.api.user.remove)
        
    app.route('/usuario/atualizarSenha/:id')
        .all(app.src.config.passport.authenticate())
        .put(app.src.api.user.updatePassword)




    app.route('/empresa')
        .all(app.src.config.passport.authenticate())
        .post(app.src.api.company.save)

    app.route('/empresa/:id')
        .all(app.src.config.passport.authenticate())
        .put(app.src.api.company.update)
        .get(app.src.api.company.search)
        .delete(app.src.api.company.remove)



    
    app.route('/cliente')
        .all(app.src.config.passport.authenticate())
        .post(app.src.api.client.save)

    app.route('/cliente/:id')
        .all(app.src.config.passport.authenticate())
        .put(app.src.api.client.update)
        .get(app.src.api.client.search)
        .delete(app.src.api.client.remove)




    app.route('/produto')
        .all(app.src.config.passport.authenticate())
        .post(app.src.api.product.save)

    app.route('/produto/:id')
        .all(app.src.config.passport.authenticate())
        .put(app.src.api.product.update)
        .get(app.src.api.product.search)
        .delete(app.src.api.product.remove)




    app.route('/pedido')
        .all(app.src.config.passport.authenticate())
        .post(app.src.api.order.save)

    app.route('/pedido/:id')
        .all(app.src.config.passport.authenticate())
        .put(app.src.api.order.update)
        .get(app.src.api.order.search)
        .delete(app.src.api.order.remove)




    app.route('/pedidoProduto')
        .all(app.src.config.passport.authenticate())
        .post(app.src.api.productOrder.save)

    app.route('/pedidoProduto/:id')
        .all(app.src.config.passport.authenticate())
        .get(app.src.api.productOrder.search)
        .delete(app.src.api.productOrder.remove)


}