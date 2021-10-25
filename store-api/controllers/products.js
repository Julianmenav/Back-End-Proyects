const Product = require('../models/products')


const getAllProductsStatic = async (req,res) => {
    const search = "w"
    const products = await Product.find({
        name: {$regex: search, $options: 'i'}
    })
    res.status(200).json({nbhits: products.length, products})
}

const getAllProducts = async (req,res) => {
    const {featured, company, name} = req.query
    const queryObj = {}
    if (featured) {
        queryObj.featured = featured === "true" ? true : false
    }
    if (company) {
        queryObj.company = company
    }
    if (name) {
        queryObj.name = {$regex: name, $options: 'i'}
    }
    const products = await Product.find(queryObj)
    res.status(200).json({nbhits: products.length, products})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}