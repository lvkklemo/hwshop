// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import '../src/components/reset.css'
import product_data from '../src/components/product.js'

Vue.use(Vuex)

Vue.config.productionTip = false
//路由的设置
// router.beforeEach((to,from,next)=>{
//   // alert('beforeEach')
//   next()
// })
// router.afterEach((to,from,next)=>{
//   // alert('afterEach')
// })

//vuex
const store = new Vuex.Store({
  state:{
    //商品列表数据
    productList:[],
    //购物车数据
    cartList:[]
  },
  //与计算属性相似
  getters:{

    brands:function (state) {
      const brands = state.productList.map(item=>item.brand)
      console.log(brands)
      console.log(getFilterArray(brands))
      return getFilterArray(brands)
    }
  },
  mutations:{
  //添加商品列表
    setProductList(state,data){
      state.productList = data;
    },
  //  加入购物车
    addCart:function (state,ID) {

      //先判断购物车是否已有,如果有count+1
      const isAdded = state.cartList.find(item=>item.id === ID)
      console.log(isAdded)
      if(isAdded){
        isAdded.count++;
      }else{
        state.cartList.push({
          id:ID,
          count:1,
          isSelect:true,
        })
      }
    },
  //
    saveProductList(state,params){
      //alert('saveProductList')
      state.productList = params;
    }
  },
  actions:{
    getProductList(context){
      //真实环境AJAX,这里异步模拟
      setTimeout(()=>{
        context.commit('setProductList',product_data)
      },500)
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  store:store,
  template: '<App/>',
  components: { App }
})

function getFilterArray(array) {

  const res = []
  const json={}
  for(let i=0;i<array.length;i++){
    const _self = array[i]
    if(!json[_self]){
      res.push(_self)
      json[_self]=1
    }
  }
  return res;
}


