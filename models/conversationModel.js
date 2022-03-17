const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config()

const schema = new mongoose.Schema({
    members:{type:Array}
   
}, { timestamps: true });

const conversations = mongoose.model('conversations', schema);

module.exports = conversations;