const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { UserPro, SingleUser, UpdateUser, Wallet, defaultMatch} = require('../controller/profileController')

// require auth for all route
router.use(requireAuth)

router.get('/userprofile', UserPro)
router.get ('/singlepro', SingleUser)
router.get ('/wallet', Wallet)
router.post ('/default-match', defaultMatch)

//..added 
router.post('/update-profile', UpdateUser)
module.exports = router