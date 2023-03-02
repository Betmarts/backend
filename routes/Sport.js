const express = require('express')
const router = express.Router()

const {Country, League, Fixtures, Livescore, Match, Odds } = require('../controller/Soccer')

router.get('/country', Country)
router.post('/league', League)
router.post('/fixture', Fixtures)
router.get('/livescore', Livescore)
router.post('/match', Match)
router.post('/odd', Odds)

module.exports = router