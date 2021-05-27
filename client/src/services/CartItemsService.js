import Api from '@/services/Api'

export default{
  getAllCartItemsOfUser (userId) {
    return Api().get(`cartItems/user/${userId}`)
  },
  getAllCartItemsOfOrder (orderId) {
    return Api().get(`cartItems/order/${orderId}`)
  },
  createCartItem (cartItem) {
    return Api().post('cartItems',cartItem)
  },
  putCartItem (cartItem) {
    return Api().put(`cartItems/${cartItem.id}`, cartItem)
  },
  getCartItem(cartItemId){
    return Api().get(`cartItems/${cartItemId}`)
  },
  deleteCartItem(cartItemId){
    return Api().delete(`cartItems/${cartItemId}`)
  }

}
