const productModel = require("../models/product.model");

exports.create = (req, res) => {
    if(!res.nome || !res.valor || !res.descricao, !res.empresa){
        return res.status(400).send({
            mensage: "Error, falta de conteudo necessario."
        })
    }

    const product = {
        nome: req.nome,
        valor: req.valor,
        descricao: req.descricao,
        empresa: req.empresa
    };

    productModel.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                mensage: `Erro ao criar o produto. Erro: ${error}`
            })
        });
}

exports.findAll = (req, res) => {
    productModel.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                mensage: `Erro ao encontrar as empresas. Erro: ${error}`
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.is;

    productModel.update({
        where: {id: id}
    })
        .then(num => {
            if(num === 1){
                res.send({
                    mensage: "Produto editado com sucesso."
                })
            } else{
                res.send({
                    mensage: "Não foi possivel encontrar o enproduto."
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                mensage: `Falha na atualização do produto. Erro: ${error}`
            })
        })
};

exports.delete = (req, res) => {
    const id = req.params.id;

    productModel.destroy({
        where: {id:id}
    })
        .then(num => {
            if(num === 1){
                res.send({
                    mensage: "Produto removido com sucesso."
                })
            } else{
                res.send({
                    mensage: "Erro ao encontrar o produto para excluir."
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                mensage: `Erro ao excluir o produto. Erro: ${error}`
            })
        })
}