<template>
    <div class="listitem">
      <router-link :to="'/product/' + info.id" class="product-main">
        <img :src="info.image">
        <h4>{{ info.name }}</h4>
        <div class="product-color" :style="{ background: colors[info.color]}"></div>
        <div class="product-cost">¥ {{ info.cost }}</div>
        <div class="product-add-cart" @click.prevent="handleMyCart(info.id)">加入购物车</div>
      </router-link>
    </div>
</template>

<script>
  import {prompts,notice,confirms,noticeHide,isConfirm_confirm} from '../../src/components/alterView/popup'
  export default {
    props: {
      info: Object
    },
    data () {
      return {
        colors: {
          '白色': '#ffffff',
          '金色': '#dac272',
          '蓝色': '#233472',
          '红色': '#f2352e'
        }
      }
    },
    methods: {
      handleMyCart (ID) {
//        alert(ID)
        notice('提交成功','提示','OK');
        document.getElementById("notice").onclick = function(){
          noticeHide()
        }
        this.$store.commit('addCart', this.info.id);
      }
    }
  };
</script>
<style scoped>

  @import "../../src/components/alterView/popup.css";
  .listitem{
    width: 25%;
    float: left;
    /*background: rebeccapurple;*/
  }
  .product-main{
    display: block;
    margin: 10px;
    padding: 10px;
    border: 1px solid #dddee1;
    border-radius: 6px;
    overflow: hidden;
    background: #fff;
    text-align: center;
    position: relative;
  }
  .product-main img{
    width: 100%;
  }
  h4{
    color: #222;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .product-main:hover h4{
    color: #0070c9;
  }
  .product-color{
    display: block;
    width: 16px;
    height: 16px;
    border: 1px solid #dddee1;
    border-radius: 50%;
    margin: 6px auto;
  }
  .product-cost{
    color: #de4037;
    margin-top: 6px;
  }
  .product-add-cart{
    display: none;
    padding: 4px 8px;
    background: #2d8cf0;
    color: #fff;
    font-size: 12px;
    border-radius: 3px;
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .product-main:hover .product-add-cart{
    display: inline-block;
  }
</style>
