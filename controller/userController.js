const User = require("../models/User")
const bcrypt = require('bcryptjs')

module.exports.findUser = async function (req, res, next){
    const {email, password} = req.body
    let user
    try{
        user = await User.findOne({email})
        if(user == null){
            return res.status(404).json("Invalid user !")
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(404).json("Wrong password !")
        }
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
    res.user = user;
    next()
}