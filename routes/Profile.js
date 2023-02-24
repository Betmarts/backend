const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const { UserPro, SingleUser, UpdateUser} = require('../controller/profileController')

// require auth for all route
router.use(requireAuth)

router.get('/userprofile', UserPro)

router.get ('/singlepro', SingleUser)
//..added 
router.post('/update-profile', UpdateUser)

module.exports = router