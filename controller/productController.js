const Product = require("../models/Product")

module.exports.findProduct = async(req, res, next)=> {
    let product
    try{
        const id = req.params.id
        product = await Product.findById(id)
        if(!product){
            res.status(404).json({message: "Cannot find product !"})
        }
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
    res.product = product
    next()
}