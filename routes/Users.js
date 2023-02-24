const express = require('express')
const axios = require("axios");
const router = express.Router()

const {  loginUser,OTP, SigninCredentials, SigninLogins } = require('../controller/userController')

router.post ('/login', loginUser)
router.post ('/signup-logins', SigninLogins)
router.post ('/otp', OTP)
router.post ('/signin-credentials',SigninCredentials)

module.exports = router