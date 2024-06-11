module.exportes = (sequelize, Sequelize) => {
    const customerModel = sequelize.define("customer", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        senha: {
            type: Sequelize.STRING
        }
    });

    return customerModel;
};