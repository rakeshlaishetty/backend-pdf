const jwt = require('jsonwebtoken');

const GenerateToken = (userId) => {
    const payload = {
        userId: userId
    };
    return jwt.sign(payload, process.env.SECRET_KEY);
}


module.exports = GenerateToken