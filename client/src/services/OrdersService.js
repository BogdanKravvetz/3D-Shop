import Api from '@/services/Api'

export default{
  getAllOrders () {
    return Api().get(`orders`)
  },
  getAllOrdersOfUser (userId) {
    return Api().get(`orders/user/${userId}`)
  },
  createOrder (order) {
    return Api().post('orders',order)
  },
  putOrder (order) {
    return Api().put(`orders/${order.id}`, order)
  },
  getOrder(orderId){
    return Api().get(`orders/${orderId}`)
  },
  deleteOrder(orderId){
    return Api().delete(`orders/${orderId}`)
  }

}
