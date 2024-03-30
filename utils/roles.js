const Roles = require("../mongodb/Schemas/RoleSchema");

const ROLES = {
    analyst: "analyst",
    admin: "admin",
    client: "client",
    employee: "employee"
};

module.exports ={ ROLES }

const CheckRoleAndInsert = async () => {
    try {
        const rolesData = await Roles.find();
        for (const role of Object.values(ROLES)) {
            const existingRole = rolesData.find(r => r.roleName === role);
            if (!existingRole) {
                const newRole = new Roles({roleName:role})
                await newRole.save()
            }
        }
    } catch (error) {
        console.error("Error while checking and inserting roles:", error);
    }
};

module.exports = CheckRoleAndInsert;
