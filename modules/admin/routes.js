const router = require('express').Router()
const checkAuthentication = require("../../utils/CheckAuthentication")
const CheckAuthorizationRole = require("../../utils/CheckAuthorizationRole");
const { ROLES } = require("../../utils/roles")
const ProjectApiController = require('./controller')

router.use(checkAuthentication)
router.use(CheckAuthorizationRole(ROLES.admin))

router.post('/getallprojects',ProjectApiController.getAllProjects)
router.post('/createproject',ProjectApiController.createProject)
router.post('/getoeProject',ProjectApiController.getProject)
router.post('/getpeoplesfromprojects',ProjectApiController.getAllPeopleFromProject)
router.post('/getdocuments',ProjectApiController.getAllDocuments)
router.post('/getdocument',ProjectApiController.getoneDocument)
router.post('/getrequesteduserdetails',ProjectApiController.getuserDetails)


module.exports = router