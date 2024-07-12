const express = require("express");
const { getBalance, topupBalance} = require("../controllers/balanceController.js");

const router = express.Router();

router.get("/", getBalance);

router.put("/topup", topupBalance);

module.exports = router;