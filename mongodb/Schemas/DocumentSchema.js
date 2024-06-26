const mongoose = require('mongoose');
const Status = require('../../utils/DocumentStatus')

const Documentshema = new mongoose.Schema({
    documentName: {
        type:String,
        required:true
    },
    isAccess: {
        type: 'boolean',
        default: false,
        enum: [false, true]
    },
    downloadable: {
        type: 'boolean',
        default: false,
        enum: [false, true]
    },
    status: {
        type:String,
        default:Status['Pending'],
        enum: [Status.Pending, Status.StandBy, Status.Processed]
    },
    Project : {
        type: mongoose.Types.ObjectId,
        required:true,
        ref:'Project'
    },
    Assigned: {
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null
    },
    documentUrl : {
        type:String,
        default:null
    }
});

const Document = new mongoose.model('Document',Documentshema)

module.exports = Document