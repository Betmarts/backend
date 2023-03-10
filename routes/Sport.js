const express = require('express')
const router = express.Router()

const {Country, League, Fixtures, Livescore, 
    Match,  defaultFixtures, Cricket_league, 
    Tennis_league, LiveTennis, LiveCricket, TodayFootball, TodayCricket, TodayTennis, TommorowCricket, 
    TommorowFootball, TommorowTennis, Cricket_fixtures,  Tennis_fixtures } = require('../controller/Soccer')

router.get('/country', Country)

// Sport leagues
router.post('/league', League)
router.get('/cricket/league', Cricket_league )
router.get('/tennis/league', Tennis_league )

router.post('/fixture', Fixtures)

// Default fixture
router.get('/default-fixture', defaultFixtures)
router.get('/cricket-fixture', Cricket_fixtures)
router.get('/tennis-fixture', Tennis_fixtures)

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

module.exports = router