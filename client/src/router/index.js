import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Shop from '@/components/Shop'
import CreateProduct from '@/components/CreateProduct'
import EditProduct from '@/components/EditProduct'
import TagsManager from '@/components/TagsManager'
import ColorManager from '@/components/ColorManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/shop/create',
      name: 'Product-Create',
      component: CreateProduct
    },
    {
      path: '/shop/:productId/edit',
      name: 'Product-Edit',
      component: EditProduct
    },
    {
      path: '/shop/tags',
      name: 'Tag-Edit',
      component: TagsManager
    }
    ,
    {
      path: '/shop/colors',
      name: 'Color-Edit',
      component: ColorManager
    }
  ]
})
