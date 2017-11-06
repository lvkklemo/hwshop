<template>
    <div class="list">

      <!--选择控制器-->
      <div v-show="list.length">

        <div class="list-control">

          <div class="list-control-filter">
            <span>品牌:</span>
            <span
              v-for="item in brands"
              class="list-control-order-item"
              :class="{on:item===filterBrand}"
              @click="handleBrandAction(item)">{{item}}</span>
          </div>

          <div class="list-control-filter">
            <span>颜色:</span>
            <span
              v-for="item in colors"
              class="list-control-order-item"
              :class="{on:item===filterColor}"
              @click="handleColorAction(item)">{{item}}</span>
          </div>

          <div class="list-control-filter">
            <span>排序:</span>
            <span
              class="list-control-order-item"
              :class="{on:order===''}"
              @click="handleOrderDefault">默认</span>
            <span
              class="list-control-order-item"
              :class="{on:this.order==='sales'}"
              @click="handleSalesDefault">
            销量
             <template v-if="order==='sales'">↓</template>
          </span>
            <span
              class="list-control-order-item"
              :class="{on:order.indexOf('prices')>-1}"
              @click="handlePricesDefault">
            价格
            <template v-if="order==='prices-down'">↓</template>
            <template v-if="order==='prices-up'">↑</template>
          </span>
          </div>


        </div>

        <list-item v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></list-item>

      </div>

    </div>
</template>

<script>
  import product_data from '../../src/components/product'
  import listItem from '../../src/views/listItem.vue'

  export default {
    data:function () {
      return {
        order:'',
        filterBrand:'',
        filterColor:''
      }
    },
    mounted:function () {
      this.getProductData();
    },
    methods:{
      getProductData:function () {
        var self = this;
        setTimeout(()=>{
          //alert(product_data)
          self.$store.commit('saveProductList',product_data);

        },1000)
      },
      handleOrderDefault:function () {
        this.order = ''
      },
      handleSalesDefault:function () {
        this.order = 'sales'
      },
      handlePricesDefault:function () {

        if(this.order === 'prices-down'){
          this.order = 'prices-up'
        }else {
          this.order = 'prices-down'
        }
      },
      handleBrandAction:function (brand) {
        if(this.filterBrand === brand){
          this.filterBrand = ''
        }else {
          this.filterBrand = brand;
        }
      },
      handleColorAction:function (color) {

        if(this.filterColor === color){
          this.filterColor = ''
        }else {
          this.filterColor = color;
        }

      }
    },
    computed:{
      list:function () {
        //从vuex获取商品列表数据
        return this.$store.state.productList;
      },
      cartList:function () {
        //从vuex获取商品列表数据
        return this.$store.state.cartList;
      },
      brands:function () {
        return this.$store.getters.brands;
      },
      colors:function () {
        //alert(this.list)
        const color=this.$store.state.productList.map(item => item.color)
        const res = []
        const json={}
        for(let i=0;i<color.length;i++){
          const _self = color[i]
          if(!json[_self]){
            res.push(_self)
            json[_self]=1
          }
        }
        return res;
      },
      filteredAndOrderedList () {
        let list = [...this.list];
        // 按品牌过滤
        if (this.filterBrand !== '') {
          list = list.filter(item => item.brand === this.filterBrand);
        }
        // 按颜色过滤
        if (this.filterColor !== '') {
          list = list.filter(item => item.color === this.filterColor);
        }
        // 排序
        //alert(this.order)
        if (this.order !== '') {
          if (this.order === 'sales') {
            list = list.sort((a, b) => b.sales - a.sales);
          } else if (this.order === 'prices-down') {
            list = list.sort((a, b) => b.cost - a.cost);
          } else if (this.order === 'prices-up') {
            list = list.sort((a, b) => a.cost - b.cost);
          }
        }
        return list;
      }
    },
    components:{
      listItem
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
  /*控制*/
  .list-control{
    background: #fff;
    border-radius: 6px;
    margin: 16px;
    padding: 16px;
    /*height: 100px;*/
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-bottom: 40px;
  }
  .list-control-filter{
    margin-bottom: 16px;
  }
  .list-control-filter:nth-of-type(3){
    margin-bottom: 0;
  }
  .list-control-order-item{
    display: inline-block;
    cursor: pointer;
    border-radius: 4px;
    margin-right: 6px;
    padding: 2px 6px;
  }
  .list-control-order-item.on{
    background: #f2352e;
    /*border: 1px solid #f2352e;*/
    color: #fff;
  }
</style>
