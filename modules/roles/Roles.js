const { successResponse } = require("../../utils/response");
const Role = require("../../mongodb/Schemas/RoleSchema");
const USerData = require('../../mongodb/Schemas/UserSchema')

class RolesController {
    async GetAllUsers(req, res, next) {
        try {
            const rolesData = await Role.find();
            successResponse(res, 200, rolesData, "Fetched successfully");
        } catch (error) {
            next(error);
        }
    }
    async GetMyRole(req, res, next) {
        try {
            console.log(req.user.role._id,'req.user.role._id')
            const rolesData = await Role.findOne({id:req.user.role._id});
            successResponse(res, 200, rolesData, "Fetched successfully");
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RolesController();
