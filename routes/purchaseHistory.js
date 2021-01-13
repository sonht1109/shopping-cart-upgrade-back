const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()
const PurchaseHistory = require("../models/PurchaseHistory")

//create a purchase history
router.post("/purchase", auth, async(req, res)=> {
    try{
        const userId = req.user._id
        const products = req.body
        const history = new PurchaseHistory({userId, products})
        await history.save()
        res.status(200).json({message: "Purchase successfully !"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//get history by user
router.get("/purchase-history", auth, async(req, res)=> {
    try{
        const userId = req.user._id
        const userHistory = PurchaseHistory.find({userId})
        res.json(userHistory)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router