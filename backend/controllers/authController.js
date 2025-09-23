const jwt = require('jsonwebtoken');
const User = require('../models/User');

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

//register user
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //create user
    const user = await User.create({ fullName, email, password, profilePic });
    const token = generateToken(user._id);
    res.status(201).json({
      id: user._id,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      id: user._id,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//get user info
exports.getUserInfo = async (req, res) => {
  res.status(200).json(req.user);
};
