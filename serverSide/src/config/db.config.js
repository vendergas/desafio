const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    HOST: config.env.DB_HOST,
    USER: config.env.DB_USER,
    PASSWORD: config.env.DB_PASSWORD,
    DB: config.env.DB_NAME,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  