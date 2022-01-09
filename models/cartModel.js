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
    ]

}, { timestamps: true });

const Cart = mongoose.model('cart', schema);

module.exports = Cart;