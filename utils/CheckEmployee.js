const Role = require("../mongodb/Schemas/RoleSchema");
const User = require("../mongodb/Schemas/UserSchema");
const generateHashedPassword = require("./generateHashPassword")

const CheckEmployee = async () => {
  const Employee = await Role.findOne({ roleName: "employee" });
  const isUserExist = await User.findOne({ role:Employee._id });
 
  if(!isUserExist) {
    let password = await generateHashedPassword("employee123") 
    const userdata = {
        FirstName:"employee",
        lastName:"employee",
        nickName:"employee",
        email:"employee@employee.com",
        mobile:"6352119731",
        role:Employee._id,
        password:password
    }
    const employee = new User(userdata);
    await employee.save()
  }
};
module.exports = CheckEmployee;
