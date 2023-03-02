const express = require('express')
const router = express.Router()


const { Booking, BookingCode} = require('../controller/AdminController')

router.post('/booking', Booking)
router.post('/get-slip', BookingCode)


module.exports = router