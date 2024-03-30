const bcrypt = require('bcrypt');

async function generateHashedPassword(password) {
    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error generating hashed password');
    }
}

module.exports = generateHashedPassword;
