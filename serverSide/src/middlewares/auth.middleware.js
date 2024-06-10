const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

verifyToken = (req, res, next) => {
    let token = req.headers["X-access-token"];

    if(!token){
        return res.status(401).send({
            mensagem: "Falha ao gerar o toker."
        }) 
    };

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err){
            return res.status(403).send({
                mensagem: "Token inválido."
            });
        };

        req.userId = decoded.id;
        next();
    });
};

const authJWT = {
    verify: verifyToken
};

module.exports = authJWT;