const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const userController = require("../controller/userController")
const auth = require("../middlewares/auth")

// get all user
router.get('/users', async(req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//create a user
router.post('/user/signup', async (req, res) => {
    const {body} = req;
    try {
        const user = new User({
            email: body.email,
            phone: body.phone,
            password: body.password
        })

        const token = genToken(user, process.env.KEY)
        user.token = token
        await user.save()
        
        res.status(201).json({message: "Signed up"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update a part
// router.patch('/user/')

//auth login
router.post('/user/login', userController.findUser, async (req, res)=> {
    try{
        const user = res.user
        if(user == null){
            res.status(401).send({message: "Invalid user !"})
        }
        const token = genToken(user, process.env.KEY)
        user.token = token
        await user.save()
        res.send(token)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//get info
router.get('/user/me', auth, async (req, res) => {
    res.send(req.user)
})


//generate jwt
const genToken = (user, key) => {
    return jwt.sign({email: user.email}, key)
}

module.exports = router