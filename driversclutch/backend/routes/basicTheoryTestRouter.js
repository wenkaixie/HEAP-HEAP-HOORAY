const express = require("express");

const {getBasicTheoryTestQuestion} = require("../controllers/basicTheoryTestController.js");

const router = express.Router();

router.post("/basicTheoryTest", getBasicTheoryTestQuestion);

module.exports = router;