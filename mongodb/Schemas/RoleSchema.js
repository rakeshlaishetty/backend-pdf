const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    roleName: {
        type:String,
        required:true
    }
});

const Role = new mongoose.model('role',RoleSchema)

module.exports = Role;
