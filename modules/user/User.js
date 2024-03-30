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
    async getuserData(req, res, next) {
        try {
            const userId = req.user._id
            const user = await User.findOne({ _id: userId }).populate('role');

            if (!user) {
                errorResponse(res,404,'User not found');
                return
            }
           
            return successResponse(res,200,user,"userData fetched successfully");
        } catch (error) {
            next(error);
        }
    }
    async updateProfileData(req, res, next) {
        try {
            const userId = req.user._id;
            const { firstName, lastName, nickName, password } = req.body; // Extract allowed fields
            
            // Check if at least one of the allowed fields is provided
            if (!firstName && !lastName && !nickName && !password) {
                return errorResponse(res, 400, "At least one field (FirstName, lastName, nickName, password) must be provided for update");
            }
    
            const updates = {};
            if (firstName) updates.FirstName = firstName;
            if (lastName) updates.lastName = lastName;
            if (nickName) updates.nickName = nickName;
            if (password) updates.password = password;
    
            const user = await User.findOneAndUpdate({ _id: userId }, updates, { new: true });
    
            if (!user) {
                return errorResponse(res, 404, 'User not found');
            }
    
            return successResponse(res, 200, user, "User data updated successfully");
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserData;
