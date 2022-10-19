require('./mongoose');
const express = require('express');
const mongoose = require('./mongoose');
const app = express();
const path=require('path')
const dotenv = require('dotenv')
// const io=require("socket.io")()

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const user=require('./routes/user')
const producs=require('./routes/product')
const cart=require('./routes/cart')
const order=require('./routes/order')
const pay=require('./routes/stripe')
const conversation=require('./routes/conversation')
const message=require('./routes/message')
const cors = require('cors')
 /// socket.io



////
app.use(cors({
    credentials:true,
    origin:true,
}))
    
app.get("/api/test",()=>{
    console.log("this shit worls")
})
app.use("/api/user",user)
app.use("/api/product",producs)
app.use("/api/cart",cart)
app.use("/api/order",order)
app.use("/api/stripe",pay)
app.use("/api/conversation",conversation)
app.use("/api/message",message)
// console.log(__dirname)
// app.use(express.static(path.join(__dirname, "/ecoclient/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/ecoclient/build', 'index.html'));
// });

app.listen(process.env.PORT, () => { console.log('port is running at ' + process.env.PORT) })
