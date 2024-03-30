const Roles = require("./Roles");


const rolesController = require("./Roles");

const GetAllUsers = async (req, res, next) => {
    try {
        await rolesController.GetAllUsers(req, res, next);
    } catch (error) {
        next(error);
    }
};

module.exports = { GetAllUsers };

