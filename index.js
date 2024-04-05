require('dotenv').config()
const UserRoutes = require('./modules/user/routes');
const adminRoutes = require('./modules/admin/routes')
const RoleRoutes = require('./modules/roles/routes');
const checkAuthentication = require("./utils/CheckAuthentication")
const  CheckAuthorizationRole = require("./utils/CheckAuthorizationRole")
const errorHandler = require('./utils/errorHandler');
const express = require('express');
const cors = require('cors')

const app = express();
require("./mongodb/conn")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const Port = process.env.PORT || 8080;

// Define GET route for retrieving user data
app.use("/user", UserRoutes);
app.use("/roles", RoleRoutes);
app.use("/admin",adminRoutes);

// Middleware for handling errors
app.use(errorHandler);

app.listen(Port, () => {
    console.log(`Listening On ${Port}`)
});
