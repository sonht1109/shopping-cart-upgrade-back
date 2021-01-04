const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const verifyData = jwt.verify(token, process.env.KEY)
    try {
        const user = await User.findOne({email: verifyData.email, token: token})
        if(user == null){
            res.status(404).json({message: "Cannot find user !"})
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).json({message: error.message})
    }
}

module.exports = auth