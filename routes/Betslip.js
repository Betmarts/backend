const express = require('express')
const router = express.Router()

const requireAuth = require('../middleware/requireAuth')

const { MultiSlip, BetSlip , Delete_Multi, displayMulti} = require('../controller/BetSlip')

// require auth for all route
router.use(requireAuth)

router.post('/slip', BetSlip)
router.get('/get-multimarket', displayMulti)
router.post('/multi-slip', MultiSlip)
router.post('/delete-slip', Delete_Multi)

module.exports = router