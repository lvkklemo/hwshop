<template>
  <div>
    <div class="header">
      <router-link to="/list" class="left">电商网站实例</router-link>
      <div class="right">
        <router-link to="/cart" class="cart-box">
          <span class="text">购物车</span>
          <span class="num" v-if="true">{{cartCount}}</span>
        </router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import product_data from '../src/components/product'

export default {
    components:{

    },
    computed:{
        cartCount:function () {
          var count = this.$store.state.cartList.length;
          return count;
        }
    }
}
</script>

<style scoped>
  .header{
    height: 48px;
    line-height: 48px;
    background: rgba(0,0,0,0.8);
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
  }
  .left{
    color: #fff;
  }
  .right{

  }
  .cart-box{
    color: #fff;
    display: flex;
    align-items: center;
    height: 100%;
  }
  .cart-box .text{
    margin-right: 4px;
  }
  .cart-box .num{
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
    background: #ff5500;
    color: #fff;
    font-size: 12px;
  }
</style>
