const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,
    },
    nickName:{
        type:String,
        default:"user"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"role",
        required:true
    },
    password:{
        type:String,
        required:true
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        default:null
    }]
});

const User = new mongoose.model('User',UserSchema)

module.exports = User;
