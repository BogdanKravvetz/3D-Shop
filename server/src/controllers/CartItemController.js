const { CartItem } = require('../models')

module.exports = {
    async getAllCartItemsOfUser(req, res) {
        try {
            const cartItems = await CartItem.findAll({
                where: { 
                    UserId: req.params.userId, 
                    OrderId: null
                }
                
            })            
            res.send(cartItems)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get Cart Items of User'
                }
            )
        }
    },
    async getAllCartItemsOfOrder(req, res) {
        try {
            const cartItems = await CartItem.findAll({
                where: { 
                    OrderId: req.params.orderId
                }
                
            })            
            res.send(cartItems)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get Cart Items of User'
                }
            )
        }
    },
    async createCartItem(req, res) {
        try {
            const cartItem = await CartItem.create(req.body)
            res.send(cartItem)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot create cart item'
                }
            )
        }
    },
    async getCartItem(req, res) {
        try {
            const cartItem = await CartItem.findByPk(req.params.cartItemId)
            res.send(cartItem)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot get cart item'
                }
            )
        }
    },
    async putCartItem(req, res) {
        try {
            await CartItem.update(req.body, {
                where: {
                    id: req.params.cartItemId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot update cart item'
                }
            )
        }
    },
    async deleteCartItem(req,res){
        try {
            const cartItem = await CartItem.findByPk(req.params.cartItemId)
            await cartItem.destroy()
            res.send(cartItem)
        } catch (err) {
            res.status(500).send(
                {
                    error: 'Cannot delete cart item'
                }
            )
        }

        
    }
}