const customerModel = require("../models/customer.model");

exports.update = (req, res) => {
    const id = req.params.id;

    customerModel.update({
        where: {id: id}
    })
    .then(num => {
        if(num === 1){
            res.send({
                mensage: "Alteração efetuada com sucesso."
            })
        } else{
            res.send({
                mensage: "Falha ao efecuar a altação, pois o usuario não foi encontrado."
            })
        }
    })
    .catch(error => {
        req.send({
            mensage: `Falha ao efecuar a altação. Erro: ${error}`
        })
    })
}