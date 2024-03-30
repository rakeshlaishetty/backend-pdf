const router = require('express').Router()
const checkAuthentication = require('../../utils/CheckAuthentication')
const USerData = require('./index')

router.post('/register',USerData.Registration)
router.post('/login',USerData.Login)
router.post('/me',checkAuthentication, USerData.getProfileData)
router.post('/updateprofile',checkAuthentication,USerData.updateProfileData)

module.exports = router