const express = require('express')
const router = express.Router()


const { Leagues} = require('../controller/Sports')


router.get ('/league', Leagues)

module.exports = router