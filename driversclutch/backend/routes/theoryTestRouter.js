const express = require("express");

const {getBasicTheoryTestQuestion, getFinalTheoryTestQuestion, getTotalBTTQuestions, getTotalFTTQuestions} = require("../controllers/theoryTestController.js");

const router = express.Router();

router.get("/basicTheoryTest", getBasicTheoryTestQuestion);

router.get("/finalTheoryTest", getFinalTheoryTestQuestion);

router.get("/totalBTTQuestions", getTotalBTTQuestions);

router.get("/totalFTTQuestions", getTotalFTTQuestions);

module.exports = router;