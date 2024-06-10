const companyController = require("../controllers/company.controller");
const express = require("express");

const router = express.Router();

router.get("/", companyController.create);
router.post("/", companyController.findAll);
router.put("/:id", companyController.update);
router.delete("/:id", companyController.delete);

module.exports = router;