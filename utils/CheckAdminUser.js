const Role = require("../mongodb/Schemas/RoleSchema");
const User = require("../mongodb/Schemas/UserSchema");
const generateHashedPassword = require("../utils/generateHashPassword")

const CheckAdminUser = async () => {
  const AdminRole = await Role.findOne({ roleName: "admin" });
  const isUserExist = await User.findOne({ role:AdminRole._id });
  
  // if (isUserExist) {
  //   // Delete existing admin user
  //   await User.findByIdAndDelete(isUserExist._id);
  //   console.log("Existing admin user deleted.");
  // }
  if(!isUserExist) {
    let password = await generateHashedPassword("admin123") 
    const userdata = {
        FirstName:"Admin",
        lastName:"Admin",
        nickName:"Admin",
        email:"admin@admin.com",
        mobile:"9033387907",
        role:AdminRole._id,
        password:password
    }
    const adminuser = new User(userdata);
    await adminuser.save()
  }
};
module.exports = CheckAdminUser;
