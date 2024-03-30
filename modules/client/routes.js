const router = require('express').Router()
const checkAuthentication = require("../../utils/CheckAuthentication")
const CheckAuthorizationRole = require("../../utils/CheckAuthorizationRole");
const { ROLES } = require("../../utils/roles")


router.use(checkAuthentication)
router.use(CheckAuthorizationRole(ROLES.client))

router.post('/get',(req,res)=> {
    res.send("SUCCESS")
})


module.exports = router