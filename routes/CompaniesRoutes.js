const express = require("express");
const { enrichCompanyData } = require("../controllers/CompaniesController");
const router = express.Router();

router.route("/enrich").post(enrichCompanyData);
module.exports = router;
