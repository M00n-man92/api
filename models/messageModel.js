const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config()

const schema = new mongoose.Schema({
  conversationId:{type:mongoose.Schema.ObjectId,
    ref:'conversations'},
    sender:{type:mongoose.Schema.ObjectId,
        ref:'users'},
        text:{type:String}
   
}, { timestamps: true });

const Messages = mongoose.model('messages', schema);

module.exports = Messages;