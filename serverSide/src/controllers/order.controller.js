const orderModel = require("../models/order.model");

exports.create = (req, res) => {
    if(!numero || !data || !cliente || !empresa){
        return res.status(400).send({
            mensage: "Erro por conta de falta de dados."
        })
    }

    const order = {
        numero: req.body.numero,
        data: req.body.numero,
        cliente: req.body.cliente,
        empresa: req.body.empresa,
        observacao: req.body.empresa || undefined
    };

    orderModel.create(order)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                mensage: `Erro à criar a venda. Erro: ${error}`
            })
        });
};

exports.findAll = (req, res) => {
    orderModel.findAll()
        .then(data => {
            res.status(100).send(data);
        })
        .catch(error => {
            res.status(500).send({
                mensage: `Erro ao encontrar a venda. Erro: ${error}`
            })
        })
};

exports.update = (req, res) => {
    const id = req.params.id;

    orderModel.updaate({
        where: {id: id}
    })
        .then(num => {
            if(num === 1){
                res.send({
                    mensage: "Pedido atualizado com sucesso."
                })
            } else{
                res.send({
                    mensage: "Falha ao atualizar o pedido, pois não foi possivel encontra-lo."
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                mensage: `Falha ao atualizar o pedido. Erro: ${error}`
            })
        })
}