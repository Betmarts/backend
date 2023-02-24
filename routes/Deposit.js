const express = require('express')
const router = express.Router()
const depositController = require('../controller/depositController')

//.. Create a new deposit 
router.post('/deposit', depositController.createDeposit)


//.. Get all deposits 
router.get('/deposits', depositController.getAllDeposits)

module.exports = router 
