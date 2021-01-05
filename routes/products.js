const express = require('express')
const { findProduct } = require('../controller/productController')
const auth = require('../middlewares/auth')
const router = express.Router()
const Product = require('../models/Product')

//add a new product
router.post("/product/add", async (req, res)=> {
    const {name, category, inStock, price, img} = req.body
    try{
        const product = new Product({
            name, category, inStock, price, img
        })
        await product.save()
        res.status(201).json({message: "Product added !"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//get all products
router.get("/products", auth, async(req, res) => {
    try{
        const collections = await Product.find()
        res.json(collections)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//delete
router.delete("/product/delete", auth, async(req, res) => {
    try {
        const idArr = req.body
        await Promise.all(idArr.map(async item => {
            await Product.deleteOne({_id: item})
        }))
        .then(()=> res.status(200).json({message: "Products deleted !"}))
        .catch(err => res.status(404).json({message: err.message}))
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update a part
router.patch("/product/:id", auth, findProduct, async(req, res)=>{
    const {body} = req
    try{
        let product = res.product
        // product = {...product, name, category, inStock, price, img}
        if(body.name) product.name = body.name
        if(body.category) product.category = body.category
        if(body.inStock) product.inStock = body.inStock
        if(body.price) product.price = body.price
        if(body.img) product.img = body.img
        await product.save()
        res.status(201).json({message: "Product updated !"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router