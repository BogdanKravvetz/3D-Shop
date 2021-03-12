import Api from '@/services/Api'

export default{
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  }
}

// AuthentificationService.register({
//     email: 'bobo@bobo.com',
//     passwork: '123'
// })
