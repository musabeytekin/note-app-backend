const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);
    const token = generateToken(user._id);
    return res.status(200).json({ success: true, data: { user, token } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = generateToken(user._id);

    return res.status(200).json({ success: true, data: { user, token } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = {
  login,
  signUp
};
