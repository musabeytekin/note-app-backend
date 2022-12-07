const jwt = require("jsonwebtoken");
const User = require("../models/User");
const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res
      .status(401)
      .json({ success: false, message: "401 unauthorized" });

  const token = authorization.split(" ")[1];
	//this comment for ubuntu git test
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findOne({ _id }).select("_id");
    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({
        success: false,
        message: "you have not access to this page, please login again"
      });
  }
};

module.exports = checkAuth;
