const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const {findUser} = require("../controller/userController")
const auth = require("../middlewares/auth")

// get all user
router.get('/users', auth, async(req, res) => {
    try{
        const users = await User.find()
        // res.header("Access-Control-Allow-Origin", "*")
        res.json(users)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//sign up
router.post('/user/signup', async (req, res) => {
    const {body} = req;
    try {
        const user = new User({
            email: body.email,
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
router.patch('/user/me', auth, findUser, async(req, res)=> {
    const {body} = req
    try {
        const user = res.user
        if(body.newPassword) user.password = body.newPassword
        await user.save()
        res.status(200).json({message: "User updated !"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete users
router.delete('/user/delete', auth, async(req, res)=> {
    const data = req.body;
    try{
        await Promise.all(data.map(async item => {
            await User.deleteOne({_id: item})
        }))
        .then(()=>res.status(200).json({message: "Users deleted !"}))
        .catch((err) => res.status(404).json({message: err.message}))
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//auth login
router.post('/user/login', findUser, async (req, res)=> {
    try{
        const user = res.user
        if(user == null){
            res.status(401).json({message: "Invalid user !"})
        }
        const token = genToken(user, process.env.KEY)
        user.token = token
        await user.save()
        res.json({user: user, token: token})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//get info
router.get('/user/me', auth, async (req, res) => {
    try{
        const {user} = req;
        res.json({
            email: user.email,
            role: user.role,
            id: user._id
        })
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


//generate jwt
const genToken = (user, key) => {
    return jwt.sign({email: user.email}, key)
}

module.exports = router