<template>
    <div class="product-box"v-if="product">
      <div class="product">
          <div class="product-img" >
            <img :src="product.image">
          </div>
          <div class="product-info" >
            <h1>{{product.name}}{{product.id}}</h1>
            <div class="cost">{{product.cost}}</div>
            <div class="addcartAct" @click="addToCart(product.id)">{{'加入购物车'}}</div>
          </div>
      </div>
      <!--产品介绍-->
      <div class="product-desc">
        <h2>产品介绍</h2>
        <img v-for="n in 10" :src="'http://ordfm6aah.bkt.clouddn.com/shop/'+n+'.jpeg'" >
      </div>
    </div>
</template>

<script>

  import p_data from '../../src/components/product'
  export default{
      data:function () {
        return{
            product:null,
            id:parseInt(this.$route.params.id),
            colors:{
              '白色':'#ffffff',
              '金色':'#dac272',
              '蓝色':'#233472',
              '红色':'#f2352e'
            }
        }
      },
      props:{
          info:{
              type:Object
          }
      },
      methods:{
          //http://localhost:8082/#/product/3
         getProduct:function () {
           setTimeout(()=>{
               this.product = p_data.find(item => item.id === this.id);
               console.log(this.product.id);
           },500)
         },
          addToCart:function (ID) {
            alert(ID)
            this.$store.commit('addCart',ID)
            console.log(this.$store.state.cartList)
          }
      },
     mounted:function () {
      //初始化时 请求数据
       this.getProduct();
     }
  }
</script>

<style scoped>
.product{
  margin:16px;
  padding: 32px;
  background:#fff;
  border:1px solid #dddee1;
  border-radius: 10px;
  overflow: hidden;

}
.product-img{
  position: relative;
  width: 50%;
  height: 0;
  padding-top: 50%;
  transform-origin: top;
  float: left;
  background: red;

}
.product-img img{
  width: 100%;
  height: 100%;
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.product-info{
  width: 50%;
  height: 100%;
  float: left;
  text-align:center;
  margin-top:60px;
}

.product-info .cost{
  color: #f2352e;
  margin:8px 0;
}
.product-info .addcartAct{
  display:inline-block;
  padding: 8px 20px;
  margin: 8px 0;
  width: 120px;
  /*height: 25px;*/
  /*line-height: 25px;*/
  background:#2d8cf0;
  color: #ffffff;
  border-radius: 4px;
  cursor:pointer;
}
/*//  产品介绍*/
  .product-desc{
    background:#fff;
    margin: 16px;
    padding: 32px;
    border:1px solid #dddee1;
    text-align:center;
  }
.product-desc img{
  /*display:block;*/
  width: 50%;
  margin:32px auto;
  padding: 32px;
  border-bottom:1px solid #dddee1;
}
</style>
