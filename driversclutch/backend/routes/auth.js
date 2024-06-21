// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const admin = require('../firebase/firebase'); // Ensure the correct path to your firebase.js

// // User sign-up endpoint
// router.post('/signup', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userRecord = await admin.auth().createUser({
//       email: email,
//       password: password
//     });

//     res.status(201).json({
//       message: 'User created successfully',
//       user: userRecord
//     });
//   } catch (error) {
//     let errorMessage = '';
//     switch (error.code) {
//       case 'auth/weak-password':
//         errorMessage = 'The password is too weak.';
//         break;
//       case 'auth/email-already-exists':
//         errorMessage = 'This email address is already in use by another account.';
//         break;
//       case 'auth/invalid-email':
//         errorMessage = 'This email address is invalid.';
//         break;
//       case 'auth/operation-not-allowed':
//         errorMessage = 'Email/password accounts are not enabled.';
//         break;
//       default:
//         errorMessage = error.message;
//         break;
//     }
//     res.status(400).json({ message: errorMessage });
//   }
// });

// // User sign-in endpoint
// router.post('/screens/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await admin.auth().getUserByEmail(email);
//     // Here you should check the password using Firebase's custom token authentication or by your own means if you handle passwords
//     // Since Firebase Admin SDK does not provide password hash directly
//     // For demo, we assume passwords are not managed by Firebase, replace this with appropriate logic

//     // const passwordMatch = await bcrypt.compare(password, user.customClaims.passwordHash); // Adjust according to how you store password hashes
//     // if (!passwordMatch) throw new Error('auth/wrong-password');

//     res.status(200).json({
//       message: 'User signed in successfully',
//       user: user
//     });
//   } catch (error) {
//     let errorMessage = '';
//     switch (error.code) {
//       case 'auth/invalid-email':
//         errorMessage = 'This email address is invalid.';
//         break;
//       case 'auth/user-disabled':
//         errorMessage = 'This email address is disabled by the administrator.';
//         break;
//       case 'auth/user-not-found':
//         errorMessage = 'This email address is not registered.';
//         break;
//       case 'auth/wrong-password':
//         errorMessage = 'The password is invalid or the user does not have a password.';
//         break;
//       default:
//         errorMessage = error.message;
//         break;
//     }
//     return res.status(400).json({ message: errorMessage });
//   }
// });

// // User sign-out endpoint
// router.post('/signout', (req, res) => {
//   // Client-side should handle the sign-out by removing the user's token
//   res.status(200).json({ message: 'User signed out successfully' });
// });

// module.exports = router;

// backend/controllers/authController.js
// backend/routes/auth.js
const express = require('express');
const { signup, login, signout } = require('../controllers/authController');
const router = express.Router();

router.post('screens/signup', signup);
router.post('screens/login', login);
router.post('screens/signout', signout);

module.exports = router;


