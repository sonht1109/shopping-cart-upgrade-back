const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()
const Product = require('../models/Product')
const productController = require("../controller/productController")
const { Error } = require('mongoose')

//add a new product
router.post("/product/add", async (req, res)=> {
    const {name, category, inStock, price, img} = req.body
    try{
        const product = new Product({
            name, category, inStock, price, img
        })
        await product.save()
        res.status(201).json({message: "Add successful"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//get all products
router.get("/products", auth, async(req, res) => {
    try{
        const collections = await Product.find({})
        res.json(collections)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//delete
router.delete("/product/delete", auth, async(req, res) => {
    try {
        const idArr = req.body.data
        await Promise.all(idArr.map(async item => {
            let product = await Product.findById(item)
            await product.remove()
        }))
        .then(()=> res.status(200).json({message: "Deleted !"}))
        .catch(err => res.status(404).json({message: "Cannot find product !"}))
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router