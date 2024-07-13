const express = require("express");

const {getBasicTheoryTestQuestion} = require("../controllers/theoryTestController.js");

const router = express.Router();

router.get("/basicTheoryTest", getBasicTheoryTestQuestion);

//router.get("/finalTheoryTest", getFinalTheoryTestQuestion);

module.exports = router;