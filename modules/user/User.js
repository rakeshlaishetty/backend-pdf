const User = require("../../mongodb/Schemas/UserSchema");
const { successResponse,errorResponse } = require("../../utils/response");
const GenerateToken  = require('../../utils/generatejtwToken')
const bcrypt = require('bcrypt')

class UserData {
    async registerUser(req, res, next) {
        try {
            const { FirstName, lastName, nickName, email, mobile, role, password } = req.body;
            
            const newUser = new User({
                FirstName,
                lastName,
                nickName,
                email,
                mobile,
                role,
                password
            });
            await newUser.save();
            successResponse(res,201,newUser,"User registered successfully");
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).populate('role');

            if (!user) {
                errorResponse(res,404,'User not found');
                return
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                return res.status(401).json({ message: 'Incorrect password' });
            }
            const token = GenerateToken(user._id);
            return successResponse(res,200,{user,token},"Login successfully");
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserData;
