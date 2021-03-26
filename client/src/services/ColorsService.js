import Api from '@/services/Api'

export default{
  getAllColors () {
    return Api().get('colors')
  },
  createColor (color) {
    return Api().post('colors',color)
  },
  putColor (color) {
    return Api().put(`colors/${color.id}`, color)
  },
  getColor(colorId){
    return Api().get(`colors/${colorId}`)
  }
}
