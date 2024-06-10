const companyModel = require("../models/company.model");

exports.create = (req, res) => {
    if(!res.body.fantasyName || !res.body.cnpj || !res.body.corporateReason){
        return res.status(400).send({
            mensage: "Erro, falta de conteudo necessario."
        })
    }

    const company = {
        fantasyName: req.body.fantasyName,
        cnpj: req.body.cnpj,
        corporateReason: req.body.corporateReason
    };

    companyModel.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                mensage: `Erro ao cria a empresa. Erro: ${error}`
            });
        })
};

exports.findAll = (req, res) => {
    companyModel.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                mensage: `Erro ao mostrar as empresas. Erro: ${error}`
            })
        })
};

exports.update = (req, res) => {
    const id = req.params.id;
    companyModel.update({
        where: {id: id}
    })
        .then(num => {
            if(num === 1){
                res.send({
                    mensage: "Empresa atualizada com sucesso."
                })
            } else{
                res.send({
                    mensage: "Falha na atualização da empresa, pois não foi possivel encrontrá-la."
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                mensage: `Falha na atualização da empresa. Error: ${error}`
            })
        })
};

exports.delete = (req, res) => {
    const id = req.params.id;

    companyModel.destroy({
        where: {id: id}
    })
        .then(num => {
            if(num === 1){
                res.send({
                    mensage: `empresa excluida com sucesso.`
                })
            } else{
                res.send({
                    mensage: `Não possivel excluir o cadastro da empresa, pois ela não foi encontrada.`
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                mensage: `Erro ao exluir o cadastro da empresa. Error: ${error}`
            })
        })
};