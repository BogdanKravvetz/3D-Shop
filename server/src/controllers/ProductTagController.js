const { ProductTag } = require('../models')

module.exports = {
    async getAllProductTags(req, res) {
        try {
            const productTags = await ProductTag.findAll({
                // where: { isDeleted: false }
                limit: 100
            })
            res.send(productTags)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get all product tags'
                }
            )
        }
    },
    async getProductsWithTag(req, res) {
        try {
            const tagId = req.params.tagId
            const productTags = await ProductTag.findAll({
                where: { 
                    TagId: tagId
                 }
            })
            res.send(productTags)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get products with a tag relation'
                }
            )
        }
    },
    async createProductTags(req, res) {
        try {
            const productTag = await ProductTag.create(req.body)
            res.send(productTag)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot create product-tag relation'
                }
            )
        }
    },
    async getProductTags(req, res) {
        try {
            const productId = req.params.productId
            const tags = await ProductTag.findAll({
                where: { 
                    ProductId: productId
                 }
            })
            res.send(tags)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get Product Tags'
                }
            )
        }
    },
    async putProductTags(req, res) {
        try {
            await ProductTag.update(req.body, {
                where: {
                    id: req.params.productTagsId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot update productTag-relation'
                }
            )
        }
    }
}