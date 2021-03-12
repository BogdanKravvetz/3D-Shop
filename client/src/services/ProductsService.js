import Api from '@/services/Api'

export default{
  getAllProducts () {
    return Api().get('products')
  },
  createProduct (product) {
    return Api().post('products',product)
  },
  putProduct (product) {
    return Api().put(`products/${product.id}`, product)
  },
  getProduct(productId){
    return Api().get(`products/${productId}`)
  },
  upload (formData){
    return Api().post('/upload', formData)
  },
  getProductModel (filename){
    return Api().get(`/products/${filename}`)
  }

}