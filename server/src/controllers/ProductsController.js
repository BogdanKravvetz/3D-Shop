const { Product } = require('../models')

module.exports = {
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll({
                where: { isDeleted: false }
                //limit: 30
            })
            res.send(products)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get products'
                }
            )
        }
    },
    async createProduct(req, res) {
        try {
            const product = await Product.create(req.body)
            res.send(product)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot create product'
                }
            )
        }
    },
    async getProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.productId)
            res.send(product)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get Product'
                }
            )
        }
    },
    async putProduct(req, res) {
        try {
            await Product.update(req.body, {
                where: {
                    id: req.params.productId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot update product'
                }
            )
        }
    },
    adminUpload(req, res) {
        try {
           res.json({file: req.file})
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot upload file'
                }
            )
        }
    },
    uploadError(err,req,res,next) { // eslint-disable-line no-unused-vars
        if(err.code === "LIMIT_FILE_TYPES"){
            res.status(422).json({error: "Only glb/gltf files"})
            return
        }
        if(err.code === "LIMIT_FILE_SIZE"){
            res.status(422).json({error: `File is too big`})
            return
        }
    }
}