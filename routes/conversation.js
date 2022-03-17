const app = require('express')
const route = app.Router()
const Conversation = require('../models/conversationModel')
const { authTest } = require('./verifyToken')

route.post('/newconvo/:id',authTest,async(req,res)=>{
    const newConvo= new Conversation({members:[req.body.senderId,req.body.recieverId]})
try{
    const convo=await newConvo.save()
    if(convo){
        // console.log(convo)
        return res.status(201).json({success:true,msg:"batch was created successfully",data:convo})
    }
    else{
        return res.status(409).json({success:false,msg:"something went wrong."})
    }

}
catch(e){
    return res.status(500).json({success:false,msg:"error occured on our part",error:e})

}

})

route.get('/:id',authTest,async(req,res)=>{
const uid=req.params.id
// console.log(uid)
    try{
        const foundconvo=await Conversation.find({members:{$in:[uid]}})
        if(foundconvo){
           return res.status(201).json({success:true,msg:"found conversations you were a part of",data:foundconvo})
        }
else{
return res.status(409).json({success:false,msg:"no convo found"})
}
    }
    catch(e){
        return res.status(500).json({success:false,msg:"error occured on our part",error:e})
    }
})

route.get('/:id/:else',authTest,async(req,res)=>{
    const uid=req.params.id
    const other=req.params.else
    // console.log(uid)
        try{
            const foundconvo=await Conversation.findOne({members:{$in:[uid]},_id:other})
            if(foundconvo){
               return res.status(201).json({success:true,msg:"found conversations you were a part of",data:foundconvo})
            }
    else{
    return res.status(409).json({success:false,msg:"no convo found"})
    }
        }
        catch(e){
            return res.status(500).json({success:false,msg:"error occured on our part",error:e})
        }
    })

module.exports = route;