const { admin } = require('../../firebase/firebase');

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password
    });

    res.status(201).json({
      message: 'User created successfully',
      user: userRecord
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    // Assume you have a method to validate the password if needed
    const user = await admin.auth().verifyIdToken(userRecord.uid);

    res.status(200).json({
      message: 'User signed in successfully',
      user: user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const signout = (req, res) => {
  res.status(200).json({ message: 'User signed out successfully' });
};

module.exports = { signup, login, signout };
