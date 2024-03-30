const router = require('express').Router()
const Roles = require('./Roles')
const checkAuthentication = require('../../utils/CheckAuthentication')

router.get('/getroles',checkAuthentication,Roles.GetAllUsers)
router.get('/getmyrole',checkAuthentication,Roles.GetMyRole)

module.exports = router