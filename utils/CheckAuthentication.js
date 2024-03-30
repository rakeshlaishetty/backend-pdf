const jwt = require('jsonwebtoken');
const { errorResponse } = require("./response");
const User = require('../mongodb/Schemas/UserSchema')

const checkAuthentication = async (req, res, next) => {

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return errorResponse(res,401, 'Authentication failed. No token provided.');
    }
    
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            return errorResponse(res,401, 'Failed to authenticate token.');
        } else {
            console.log(decoded,'decoded')
            const user = await User.findOne({ _id:decoded.userId }).populate('role');
            if(user) {
                console.log(user,"USER")
                req.user = user;
                next();
            }else {
                return errorResponse(res,401, 'Authentication failed. No User Found on the Token.');
            }
        }
    });
};

module.exports = checkAuthentication;
