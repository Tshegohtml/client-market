const express = require("express");
const { SignUp, Login, resetPassword } = require("../controllers/auth"); 
const router = express.Router();



// User authentication routes
router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/resetpassword", resetPassword);

module.exports = router;