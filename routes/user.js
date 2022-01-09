const app = require('express')
const route = app.Router()
const User = require('../models/userModel')
const genert = require('../auth/password').genpassword
const validPassword = require('../auth/password').validPassword
const jwt=require('jsonwebtoken')
const authTestAdmin=require('./verifyToken').authTestAdmin
const authTest=require('./verifyToken').authTest
route.post('/register', async (req, res) => {
    const { name, password, email } = req.body

    try {
        const em = await User.findOne({ email })

        if (em) {
            return res.status(400).json({ success: false, data: "duplicate email", data: null })
        }
        const newpass = await genert(password)
        const user = new User({ name: name, email: email, password: newpass })

        const newuser = await user.save()

        return res.status(201).json({ success: true, msg: "registered successfully", data: newuser })

    }
    catch (e) {
        return res.status(500).json({ success: false, error: e })
    }

})
route.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, msg: "no such email", data: null })

        }
        else {
           const realpass=user.password

            const real = await validPassword(password, realpass)
            if (!real) {
                return res.status(400).json({ success: false, msg: "no such password", data: null })

            }
            else{
             const token = jwt.sign({ id: user._id ,isAdmin:user.isAdmin}, process.env.JWT_PASS,{expiresIn:"3d"})

             const {password,...others}=user._doc
            
             return res.status(201).json({ success: true, msg: "login success", data: {...others,token} })
            }   
        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, error:" error is " + e})

    }

})
route.put('/update/:id',authTest,async(req,res)=>{
    if(req.body.password){
        req.body.password=await genert(req.body.password)
    }
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        return res.status(201).json({success:true,msg:"update complete",data:updatedUser})
    }
    catch(e){
        return res.status(500).json({success:false,msg:"error on "+e})
    }

})
route.delete('/delete/:id',authTest,async (req,res)=>{
    try{

        const user=await User.findByIdAndDelete(req.params.id)
        return res.status(201).json({succsess:true,msg:"delted successfully"})
    }
    catch(e){
        return res.status(500).json({success:false,msg:"error on "+e})

    }
})
route.get('/find',authTestAdmin,async (req,res)=>{
        const query=req.query.new
        try{
            const user=query?await User.find().limit(5):await User.find()
            console.log(user)
            return res.status(201).json({succsess:true,msg:"loaded successfully",data:user})
        }
        catch(e){
            return res.status(500).json({success:false,msg:"error on "+e})
        }


})
route.get('/find/:id',authTest,async (req,res)=>{
    try{

        const user=await User.findById(req.params.id)
        if(!user){
            return res.status(401).json({success:false,msg:"no such user"})


        }
        const{password,...others}=user._doc
        return res.status(201).json({succsess:true,msg:"request completed successfully",data:others})
    }
    catch(e){
        return res.status(500).json({success:false,msg:"error on "+e})

    }
})
route.get('/status',authTest,async (req,res)=>{
    const date=new Date();
    const lastyear=new Date(date.setFullYear(date.getFullYear()-1))
    try{
        const data=await User.aggregate([
            {$match:{createdAt:{$gte:lastyear}}},
            {$project:{month:{$month:"$createdAt"}}},
            {$group:{_id:"$month",total:{$sum:1}}}
        ])
        return res.status(201).json(data)
    }
    catch(e){
        return res.status(500).json({success:false,msg:"errsdfasdfor on "+e})

    }

})
module.exports = route;