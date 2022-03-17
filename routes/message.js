const app = require('express')
const route = app.Router()
const Message = require('../models/messageModel')
const { authTest } = require('./verifyToken')

route.post('/newmessage/:id',authTest, async (req, res) => {
    try {
        const messafe = new Message(req.body)
        const newmessage = await messafe.save()
        if (newmessage) {
            return res.status(201).json({ success: true, msg: "your message was sent successfully", data: newmessage })

        }
        else {
            return res.status(401).json({ success: false, msg: "your message was not sent successfully" })
        }
    }
    catch (e) {
        return res.status(500).json({ success: false, msg: "error occured on our part", error: e })
    }

})

route.get("/:id/:conversationId",authTest,async(req,res)=>{
const conversationId =req.params.conversationId

    try{
        const foundone=await Message.find({conversationId})
        if(foundone){
            return res.status(201).json({ success: true, msg: "your message was loaded successfully", data: foundone })
        }
        else{
            return res.status(404).json({ success: false, msg: "no message was recorded" })
        }

    }
    catch(e){
        return res.status(500).json({ success: false, msg: "error occured on our part", error: e })

    }
})


module.exports = route;