const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config()

const schema = new mongoose.Schema({
    userId: { type:mongoose.Schema.ObjectId, ref:'users',required:true},
    products:[
        {
            productId:{
                type:mongoose.Schema.ObjectId,
                ref:'products'
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    amount:{type:Number},
    status:{type:String,default:"pending"},
    adress:{type:Object}


}, { timestamps: true });

const Order = mongoose.model('order', schema);

module.exports = Order;