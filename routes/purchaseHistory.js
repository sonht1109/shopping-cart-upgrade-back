const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()
const PurchaseHistory = require("../models/PurchaseHistory")

//create a purchase history
router.post("/purchase/:id", auth, async(req, res)=> {
    const userId = req.params.id
    try{
        const {products} = req.body
        const history = new PurchaseHistory({userId, products})
        await history.save()
        res.status(200).json({message: "Purchase successfully !"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//get history by user
router.get("/history/:id", auth, async(req, res)=> {
    const userId = req.body.params
    try{
        const userHistory = PurchaseHistory.find({userId})
        res.json(userHistory)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router