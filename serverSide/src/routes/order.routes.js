const orderController = require("../controllers/order.controller");
const express = require("express");

const router = express.Router();

router.post("/", orderController.create);
router.get("/", orderController.findAll);
router.put("/:id", orderController.update);

module.exports = router;