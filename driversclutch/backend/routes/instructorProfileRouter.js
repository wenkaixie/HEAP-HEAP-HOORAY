const express = require("express");
// const multer = require('multer');
// const {storage} = require('../firebase/firebase.js')
const {getInfo, updateInfo, updateProfilePicture, getProfilePicture} = require("../controllers/instructorProfileController.js");

// const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get('/', getInfo);

router.put('/update', updateInfo);

router.post('/updatePicture', updateProfilePicture)

router.get('/getPicture', getProfilePicture)

module.exports = router;