const express = require('express')
const { findProduct } = require('../controller/productController')
const auth = require('../middlewares/auth')
const router = express.Router()
const mongoose = require("mongoose")
const Product = require('../models/Product')
const multer = require('multer')

const upload = multer({dest: "./public/uploads"})

//add a new product
router.post("/product/add", auth, upload.single('img'), async (req, res)=> {
    const {name, category, inStock, price} = req.body
    const path = req.file.path
    const img = path.substring(path.indexOf('/')+1, path.length)
    try{
        const product = new Product({
            name, category, inStock: JSON.parse(inStock), price, img
        })
        await product.save()
        res.status(201).json({message: "Product added !"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//get a product
router.get("/product/:id", findProduct, async(req, res)=>{
    try{
        res.json(res.product)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//get all products
router.get("/products", async(req, res) => {
    try{
        const products = await Product.find()
        res.json(products)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//get product by category
router.get("/products/:cateId", async(req, res)=>{
    const cateId = req.params.cateId
    try{
        const products = await Product.find({category: mongoose.Types.ObjectId(cateId)})
        res.json(products)
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