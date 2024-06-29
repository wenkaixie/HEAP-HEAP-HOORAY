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
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://driversclutch.firebaseio.com'
});

const db = admin.firestore();

module.exports = { admin, db };


// const {initializeApp, cert} = require("firebase-admin/app")
// const {getFirestore} = require("firebase-admin/firestore")

// const serviceAccount = require('./creds.json')

// initializeApp( {
//     credential: cert(serviceAccount)
// })

// const db = getFirestore()

// module.exports = { db }