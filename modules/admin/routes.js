const router = require('express').Router()
const checkAuthentication = require("../../utils/CheckAuthentication")
const CheckAuthorizationRole = require("../../utils/CheckAuthorizationRole");
const { ROLES } = require("../../utils/roles")
const ProjectApiController = require('./controller')
const FileUpload = require("../../utils/UploadOneDocument")
const uploadToS3 = require('../../utils/UploadTos3')

const uploadFile = FileUpload('uploads/');
router.use(checkAuthentication)
router.use(CheckAuthorizationRole(ROLES.admin))

router.post('/getallprojects',ProjectApiController.getAllProjects)
router.post('/createproject',ProjectApiController.createProject)
router.post('/getoeProject',ProjectApiController.getProject)
router.post('/getpeoplesfromprojects',ProjectApiController.getAllPeopleFromProject)
router.post('/getdocuments',ProjectApiController.getAllDocuments)
router.post('/getdocumentsfromprojects',ProjectApiController.getAllDocumentsFromProject)
router.post('/getdocument',ProjectApiController.getoneDocument)
router.post('/createdocument',uploadFile,uploadToS3,ProjectApiController.createDocument)
router.post('/getrequesteduserdetails',ProjectApiController.getuserDetails)
router.post('/getclients',ProjectApiController.getClients)
router.post('/getallemployees',ProjectApiController.getAllEmployees)


module.exports = router