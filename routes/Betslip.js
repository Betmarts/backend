const express = require('express')
const router = express.Router()

const requireAuth = require('../middleware/requireAuth')

const {MultiSlip, BetSlip , Delete_Multi} = require('../controller/BetSlip')

// require auth for all route
router.use(requireAuth)

router.post('/slip', BetSlip)
router.post('/multi-slip', MultiSlip)
router.delete('/delete-slip', Delete_Multi)

module.exports = router