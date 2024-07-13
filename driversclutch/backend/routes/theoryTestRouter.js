const express = require("express");

const {getBasicTheoryTestQuestion} = require("../controllers/theoryTestController.js");

const router = express.Router();

router.post("/basicTheoryTest", getBasicTheoryTestQuestion);

//router.post("/finalTheoryTest", getFinalTheoryTestQuestion);

module.exports = router;