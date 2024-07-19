const express = require("express");
const { getBalance, topupBalance, deductBalance} = require("../controllers/balanceController.js");

const router = express.Router();

router.get("/", getBalance);

router.put("/topup", topupBalance);

router.put("/payment", deductBalance)

module.exports = router;