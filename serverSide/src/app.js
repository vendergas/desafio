const express = require("express");
const bodyParser = require("bosy-parser");
const cors = require("cors")

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = required("./models");
db.sequeçize.sync();

const customerRout = require("./routes/customer.routes");
const companyRout = require("./routes/company.routes");
const productRout = require("./routes/product.routes");
const orderRout = require("./routes/order.routes");
const userRout = require("./routes/user.routes");
const authRout = require("./routes/auth.routes");

const apiUrl = "./api";

app.use(`${apiUrl}/router`, customerRout);
app.use(`${apiUrl}/cpmpany`,companyRout);
app.use(`${apiUrl}/product`,productRout);
app.use(`${apiUrl}/order`, orderRout);
app.use(`${apiUrl}/user`, userRout);
app.use(`${apiUrl}/auth`, authRout);

const port = 3000;
app.listen(port, () => {
    console.log("O servidor está rodando na porta 3000");
})