const express=require('express')
const app=express()
const route=express.Router()
const stripe=require('stripe')(process.env.STRIPEKEY)

route.post('/payment',(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd"
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            return res.status(500).json({success:false,error:"error "+ stripeErr})
        }
        else{
            return res.status(200).json({success:true,msg:"payment complete",data:stripeRes})
        }
    })


})
module.exports=route