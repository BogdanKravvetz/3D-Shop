const { Tag } = require('../models')

module.exports = {
    async getAllTags(req, res) {
        try {
            const tags = await Tag.findAll({
                where: { isDeleted: false }
                //limit: 30
            })
            res.send(tags)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get tags'
                }
            )
        }
    },
    async createTag(req, res) {
        try {
            const tag = await Tag.create(req.body)
            res.send(tag)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot create tag'
                }
            )
        }
    },
    async getTag(req, res) {
        try {
            const tag = await Tag.findByPk(req.params.tagId)
            res.send(tag)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get tag'
                }
            )
        }
    },
    async putTag(req, res) {
        try {
            await Tag.update(req.body, {
                where: {
                    id: req.params.tagId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot update tag'
                }
            )
        }
    },
}