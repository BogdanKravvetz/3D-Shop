const { Color } = require('../models')

module.exports = {
    async getAllColors(req, res) {
        try {
            const colors = await Color.findAll({
                where: { isDeleted: false }
                //limit: 30
            })
            res.send(colors)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get colors'
                }
            )
        }
    },
    async createColor(req, res) {
        try {
            const color = await Color.create(req.body)
            res.send(color)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot create color'
                }
            )
        }
    },
    async getColor(req, res) {
        try {
            const color = await Color.findByPk(req.params.colorId)
            res.send(color)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get color'
                }
            )
        }
    },
    async putColor(req, res) {
        try {
            await Color.update(req.body, {
                where: {
                    id: req.params.colorId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot update color'
                }
            )
        }
    },
}