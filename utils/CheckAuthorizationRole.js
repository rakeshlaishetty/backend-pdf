const CheckAuthorizationRole = (...requiredRoles) => {
    return (req, res, next) => {
        if (requiredRoles) {
            const userRole = req.user?.role?.roleName || undefined;
            console.log(requiredRoles, 'requiredRoles');
            console.log(req.user._id);

            if (!userRole || !requiredRoles.includes(userRole)) {
                return res.status(403).json({ message: 'Insufficient permissions.' });
            }
        }
        next();
    };
};

module.exports = CheckAuthorizationRole;
