// const admin = require('firebase-admin');
// const path = require('path');

// // Directly use the resolved path for the require statement
// const serviceAccount = require(path.resolve(__dirname, './firebase/serviceAccountKey.json'));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore();
// const auth = admin.auth();

// module.exports = admin;

// firebase.js
require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://driversclutch.firebaseio.com",
	storageBucket: "gs://driversclutch.appspot.com",
});

const db = admin.firestore();
const storage = admin.storage();
const bucket = admin.storage().bucket();

module.exports = { admin, db, storage, bucket };
