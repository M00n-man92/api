const crypto=require('bcrypt')
const genpassword=(password)=>{
    const genpassword =  crypto.hash(password, 8)
    return genpassword
    
}
 const validPassword=(password,userPassword)=>{
    const genpassword = crypto.compare(password, userPassword)

    return genpassword
}
module.exports.genpassword=genpassword
module.exports.validPassword=validPassword