const express = require("express")
const auth = require("../middlewares/auth")
const router = express.Router()
const Category = require("../models/Category")
const {findCate} = require('../controller/categorycontroller')

//get all
router.get('/categories', auth, async(req, res)=> {
    try{
        const cates = Category.find()
        res.json(cates)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//create
router.post('/category', auth, async(req, res)=> {
    try{
        const {name} = req.body
        const cate = new Category({name})
        await cate.save()
        res.status(200).json({message: "Category added !"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//update
router.put('/category/:id', auth, findCate, async(req, res) => {
    try{
        const cate = res.cate
        const {name} = req.body
        cate.name = name
        
        await cate.save()
        res.status(200).json({message: "Cate updated !"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//delete one
router.delete('/category/:id', auth, findCate, async(req, res)=> {
    try{
        const cate = res.cate
        await cate.remove()
        res.status(200).json({message: "Cate deleted !"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router