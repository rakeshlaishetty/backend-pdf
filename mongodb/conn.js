const mongoose = require("mongoose");
const CheckRoleAndInsert = require("../utils/roles")
const CheckAdminUser = require("../utils/CheckAdminUser");
const CheckAnalystUser = require("../utils/checkAnalystUser");
const CheckEmployee = require("../utils/CheckEmployee");
const username = process.env.MONGO_USERNAME;
const cluster = process.env.MONGO_CLUSTER;
const password = process.env.MONGO_PASSWORD;
const url = `mongodb+srv://${username}:${password}@${cluster}.n4fv4yn.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('debug', true);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', async () => {
    console.log("Connected to MongoDB Atlas");
    try {

        await CheckRoleAndInsert()
        await CheckAdminUser()
        await CheckAnalystUser()
        await CheckEmployee()
    }catch(err){
        console.log(err)
    }
});

db.on('error', (error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
});
