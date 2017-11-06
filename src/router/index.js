import Vue from 'vue'
import Router from 'vue-router'
import List from '../views/list.vue'
import Home from '../views/home.vue'
import ProductDetail from '../../src/views/product.vue'
import Cart from '../../src/views/cart.vue'

Vue.use(Router)

const routers = new Router({
  routes: [
    {
      path: '/list',
      name: 'listModule',
      meta:{title:'商品列表'},
      component: List
    },
    {
      path: '/cart',
      name: 'cartModule',
      meta:{title:'购物车'},
      component: Cart
    },
    {
      path: '/product/:id',
      name: 'productDetail',
      meta:{title:'商品详情'},
      component: ProductDetail
    },
    {
      path: '/home',
      name: 'homeModule',
      meta:{title:'首页列表'},
      component: Home
    },
    {
      path: '*',
      redirect: '/list'
    }
  ]
})

export default routers;
