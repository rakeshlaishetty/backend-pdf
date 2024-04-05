const bcrypt = require('bcrypt');

async function generateHashedPassword(password) {
    console.log(password)
    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log(error)
        throw new Error('Error generating hashed password');
    }
}

module.exports = generateHashedPassword;
