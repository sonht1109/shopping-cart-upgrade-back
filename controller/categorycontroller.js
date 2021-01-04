const Category = require('../models/Category')

module.exports.findCate = async(req, res, next)=> {
    let cate
    try{
        const {id} = req.params
        cate = await Category.findById(id)
        if(!cate){
            res.status(404).json({message: "Cannot find category !"})
        }
        console.log(cate);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
    res.cate = cate;
    next()
}