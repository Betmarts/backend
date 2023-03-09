const express = require('express')
const router = express.Router()

const {Country, League, Fixtures, Livescore, Match, Odds, defaultFixtures,  defaultFixtures_Cricket, defaultFixtures_Tennis, Cricket_league, Tennis_league, LiveTennis, LiveCricket, TodayFootball, TodayCricket, TodayTennis, TommorowCricket, TommorowFootball, TommorowTennis } = require('../controller/Soccer')

router.get('/country', Country)

router.get('/default-fixture', defaultFixtures)
router.get('/default/cricket', defaultFixtures_Cricket)
router.get('/default/tennis', defaultFixtures_Tennis)

router.post('/league', League)
router.get('/cricket/league', Cricket_league )
router.get('/tennis/league', Tennis_league )
router.post('/fixture', Fixtures)

router.get('/live-tennis',  LiveTennis)
router.get('/live-cricket',  LiveCricket)
router.get('/live-soccer', Livescore)

router.get('/today-football', TodayFootball)
router.get('/today-cricket', TodayCricket)
router.get('/today-tennis', TodayTennis)

router.get('/tomorow-cricket', TommorowCricket)
router.get('/tomorow-fooball', TommorowFootball)
router.get('/tomorow-tennis', TommorowTennis)

router.post('/match', Match)
router.post('/odd', Odds)

module.exports = router