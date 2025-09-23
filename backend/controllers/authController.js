const jwt = require('jsonwebtoken');

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

//register user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
};

//login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
};

//get user info
exports.getUserInfo = async (req, res) => {
  res.status(200).json(req.user);
};
