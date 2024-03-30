const Role = require("../mongodb/Schemas/RoleSchema");
const User = require("../mongodb/Schemas/UserSchema");
const generateHashedPassword = require("./generateHashPassword")

const CheckAnalystUser = async () => {
  const Analyst = await Role.findOne({ roleName: "analyst" });
  const isUserExist = await User.findOne({ role:Analyst._id });
 
  if(!isUserExist) {
    let password = await generateHashedPassword("analyst123") 
    const userdata = {
        FirstName:"Analyst",
        lastName:"analyst",
        nickName:"analyst",
        email:"analyst@analyst.com",
        mobile:"8200512315",
        role:Analyst._id,
        password:password
    }
    const analyst = new User(userdata);
    await analyst.save()
  }
};
module.exports = CheckAnalystUser;
