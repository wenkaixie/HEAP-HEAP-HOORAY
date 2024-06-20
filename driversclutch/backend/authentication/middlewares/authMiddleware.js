// const { admin } = require('../firebase/firebase');

// const authenticateUser = async (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// module.exports = authenticateUser;

// middlewares/authMiddleware.js
const admin = require('../../firebase/firebase');

const authenticate = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};

module.exports = authenticate;
