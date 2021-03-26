import Api from '@/services/Api'

export default{
  getAllTags () {
    return Api().get('tags')
  },
  createTag (tag) {
    return Api().post('tags',tag)
  },
  putTag (tag) {
    return Api().put(`tags/${tag.id}`, tag)
  },
  getTag(tagId){
    return Api().get(`tags/${tagId}`)
  }
}
