module.exports = (sequelize, Sequelize) => {
    const companyModel = sequelize.define("company", {
        nomeFantasia: {
            type: Sequelize.STRING
        },
        cnpj: {
            type: Sequelize.STRING
        },
        razaoSocial: {
            type: Sequelize.STRING
        }
    });

    return companyModel;
}