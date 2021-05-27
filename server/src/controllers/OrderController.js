const { Order } = require('../models')

module.exports = {
    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll({
                where: { 
                    isDeleted: false
                }               
            })            
            res.send(orders)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get Orders of User'
                }
            )
        }
    },
    async getAllOrdersOfUser(req, res) {
        try {
            const orders = await Order.findAll({
                where: { 
                    UserId: req.params.userId
                }               
            })            
            res.send(orders)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get Orders of User'
                }
            )
        }
    },
    async createOrder(req, res) {
        try {
            const order = await Order.create(req.body)
            res.send(order)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot create order'
                }
            )
        }
    },
    async getOrder(req, res) {
        try {
            const order = await Order.findByPk(req.params.orderId)
            res.send(order)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get order'
                }
            )
        }
    },
    async putOrder(req, res) {
        try {
            await Order.update(req.body, {
                where: {
                    id: req.params.orderId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot update order'
                }
            )
        }
    },
    // async deleteCartItem(req,res){
    //     try {
    //         const cartItem = await CartItem.findByPk(req.params.cartItemId)
    //         await cartItem.destroy()
    //         res.send(cartItem)
    //     } catch (err) {
    //         res.status(500).send(
    //             {
    //                 error: 'Cannot delete cart item'
    //             }
    //         )
    //     }    
    // }
}