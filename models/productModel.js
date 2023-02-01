const mongoose = require('mongoose');

const dotenv = require('dotenv')
dotenv.config()

const schema = new mongoose.Schema({
    title: { type: String, required:true},
    discription: { type: String, required:true},
    img: { type: Array,required:true},
    catagory: { type:Array,required:true },
    size: { type: Array,required:true },
    color:{type:String,required:true},
    associate_color: [{id:{type: mongoose.Schema.ObjectId, ref:'products'},coloring:{type:String},img:{type:String}}],
    price: { type: Number ,required:true},
    inStock:{type:Boolean,default:true},
    link:{type:String}

}, { timestamps: true });

const Products = mongoose.model('products', schema);

module.exports = Products;