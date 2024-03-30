const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectStartDate: {
        type: Date,
        required: true
    },
    projectEndDate: {
        type: Date
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // This references the User model
    },
    documents: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Document",
        default:null
    }] 
});

module.exports = mongoose.model('Project', ProjectSchema);
