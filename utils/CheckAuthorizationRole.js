
const CheckAuthorizationRole =(...requiredRoles) => (req, res, next)  => {
    if (requiredRoles) {
        const userRole = req?.user?.role?.roleName || undefined;
        console.log(requiredRoles,'requiredRoless')
        console.log(req.user._id)
        const intersection = requiredRoles.filter(role => role == userRole);
        if (intersection.length === 0) {
            return res.status(403).json({ message: 'Insufficient permissions.' });
        }
        next()
    }

}

module.exports = CheckAuthorizationRole;