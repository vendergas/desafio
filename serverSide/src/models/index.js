const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize);
db.customer = require("./customer.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.orderProduct = require("./orderProduct.model.js")(sequelize, Sequelize);

db.company.hasMany(db.user);
db.user.belongsTo(db.company);

db.company.hasMany(db.customer);
db.customer.belongsTo(db.company);

db.company.hasMany(db.product);
db.product.belongsTo(db.company);

db.company.hasMany(db.order);
db.order.belongsTo(db.company);

db.customer.hasMany(db.order);
db.order.belongsTo(db.customer);

db.order.belongsToMany(db.product, { through: db.orderProduct });
db.product.belongsToMany(db.order, { through: db.orderProduct });

module.exports = db;