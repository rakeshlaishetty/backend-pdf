const User = require("./User");

const user = new User();

const Registration = async (req, res, next) => {
    console.log("Reached")
  try {
    await user.registerUser(req, res, next);
  } catch (error) {
    next(error);
  }
};
const Login = async (req, res, next) => {
  try {
    await user.login(req, res, next);
  } catch (error) {
    next(error);
  }
};

const USerData = { Registration,Login }
module.exports = USerData;
