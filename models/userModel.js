const mongoose = require('mongoose');
//const jwt=require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()
//require('../mongoose')
const schema = new mongoose.Schema({
    name: { type: String,  required:true},
    email: { type: String, unique: true,required: true  },
    password: { type: String, min: [8,"please enter more characters"], required: true },
    profilepic: { type: String, default: "" },
    isAdmin:{type:Boolean,default:false}

}, { timestamps: true });
/* schema.methods.getSignedToken = async () => {
    const user = this
    const token = jwt.sign({ _id: user._id }, 'one')
    user.token = token
    await user.save
    return token
} */
const User = mongoose.model('users', schema);

module.exports = User;