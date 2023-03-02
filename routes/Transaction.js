const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { Deposit, depositHistory, Withdraw } = require('../controller/Transaction')

router.use(requireAuth)

//.. Create a new deposit 
router.post('/deposit', Deposit)
router.post('/withdraw', Withdraw)

//.. Get all deposits 
router.get('/history', depositHistory)


module.exports = router 
