const productsController = require("../controllers/product.controller");
const express = require("express");

const router = express.Router();

router.post("/", productsController.create);
router.get("/", productsController.findAll);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.delete);

module.exports = router;