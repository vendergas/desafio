CREATE DATABASE IF NOT EXISTS vendergas;

USE DATABASE;

CREATE TABLE IF NOT EXISTS user(
    id CHAR(36) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    companyId CHAR(36),
    FOREING KEY (companyId) REFERENCES company(id)
);

CREATE TABLE IF NOT EXISTS company(
    id CHAR(36) PRIMARY KEY,
    nomeFantasia VARCHAR(255) NOT NULL,
    razaoSocial VARCHAR(255) NOT NULL,
    cnpj CHAR(18) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS client(
    id CHAR(36) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone CHAR(11) NOT NULL,
    companyId CHAR(36),
    FOREING KEY (companyId) REFERENCES company(id)
);

CREATE TABLE IF NOT EXISTS product(
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    descricao TEXT,
    companyId CHAR(36),
    FOREIGN KEY (companyId) REFERENCES company(id)
);

CREATE TABLE IF NOT EXISTS order(
    id CHAR(36) PRIMARY KEY,
    numero INT AUTO_INCREMENT,
    observacao TEXT,
    data DATETIME NOT NULL,
    clientId CHAR(36),
    companyId CHAR(36),
    FOREIGN KEY (clientId) REFERENCES client(id),
    FOREIGN KEY (companyId) REFERENCES company(id)
);

CREATE TABLE IF NOT EXISTS productOrder(
    id CHAR(36) PRIMARY KEY,
    quantidade DECIMAL(10, 2) NOT NULL,
    productId CHAR(36),
    orderId CHAR(36),
    FOREIGN KEY (productId) REFERENCES product(id),
    FOREIGN KEY (orderId) REFERENCES order(id)
);