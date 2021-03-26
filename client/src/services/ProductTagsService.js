import Api from '@/services/Api'

export default{
  getAllProductTags () {
    return Api().get('productTags')
  },
  createProductTags (productTags) {
    return Api().post('productTags',productTags)
  },
  putProductTags (productTags) {
    return Api().put(`productTags/${productTags.id}`, productTags)
  },
  getProductTags(productId){
    return Api().get(`productTags/${productId}`)
  },
  getProductsWithTag(tagId){
    return Api().get(`productTags/${tagId}`)
  },
}
