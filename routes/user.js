const express = require("express");
const { login, signUp } = require("../controllers/userController");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);


module.exports = router;
