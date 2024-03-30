const router = require('express').Router()
const USerData = require('./index')

router.post('/register',USerData.Registration)
router.post('/login',USerData.Login)

module.exports = router