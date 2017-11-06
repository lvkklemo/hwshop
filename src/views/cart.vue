<template>
    <div class="car-Container">

      <div class="cart-header">
        <div class="cart-header-title">购物清单</div>
        <div class="cart-header-main">
          <div class="cart-all">
            <span>全选</span>
            <span class="cart-select-all-unselect"
                  :class="{'cart-select-all-select':selectAll}"
                  @click="selectedAllAction"></span>
          </div>
          <div class="cart-info">商品信息</div>
          <div class="cart-price">单价</div>
          <div class="cart-count">数量</div>
          <div class="cart-cost">小计</div>
          <div class="cart-delete">删除</div>
        </div>
      </div>
      <div class="cart-content">
        <div class="cart-content-main" v-for="(item,index) in cartList">
          <div class="cart-select">
            <!--单选-->
            <span class="cart-select-logo" :class="{'isSelected':item.isSelect}" ref="selectedBox" @click="selectedAction(index)"></span>
          </div>
          <div class="cart-info">
            <img :src="productDictList[item.id].image">
            <span>{{productDictList[item.id].name}}</span>
          </div>
          <div class="cart-price">￥{{productDictList[item.id].cost}}</div>
          <div class="cart-count">
            <span class="cart-minus" @click="handleCount(index,-1)">-</span>
            {{item.count}}
            <span class="cart-added" @click="handleCount(index,+1)">+</span>
          </div>
          <div class="cart-cost">{{productDictList[item.id].cost*item.count}}</div>
          <div class="cart-delete" @click="deletProduct(index)">删除</div>
        </div>

      </div>

      <!--总合计-->
      <div class="total">
          <!--<div class="count">共计 <span>{{cartList.length}}</span> 件商品</div>-->
          <div class="count">共计 <span>{{countAll}}</span> 件商品</div>
          <div class="cost">
            <div class="top">应付总额<span>￥{{costAll}}</span></div>
            <div class="bottom">(优惠<span>￥0</span>)</div>
          </div>
          <div class="pay" @click="payAction">现在结算</div>
      </div>

    </div>
</template>

<script>

  import product_data from '../../src/components/product'
  import {prompts,notice,confirms,noticeHide,isConfirm_confirm} from '../../src/components/alterView/popup'

  export default{
      data:function () {
        return {
            productList:product_data,
            selectAll:false
        }
      },
      computed:{
          //购物车列表
          cartList:function () {
            return this.$store.state.cartList;
            //return [{id:1,count:5},{id:10,count:3},{id:5,count:9}];
          },
          //购物车json
          productDictList:function () {
            const dict ={}
            this.productList.forEach(item => {
                dict[item.id] = item;
            })
            return dict;
          },
          //购物车总数量
          countAll:function () {
            let count = 0;
            this.cartList.forEach(item => {
                if(item.isSelect){
                  count += item.count;
                }
            });
            return count;
          },
           //购物车总价格
          costAll:function () {
            let cost = 0;
            this.cartList.forEach(item => {
              if(item.isSelect){
                cost += this.productDictList[item.id].cost*item.count;;
              }
            });
            return cost;
          }
      },
      methods:{

        //修改数量
        handleCount:function (index,type) {

            var product = this.cartList[index];
            if(type===1){
                product.count++;
            }else if(type===-1&&product.count>1){
                product.count--;
            }

        },
        //删除点击
        deletProduct:function (index) {

          confirms("您确定删除商品么?",'提示');
          var self = this;
          //点击'是'触发事件,隐藏提示框
          document.getElementById("confirmY").onclick = function(){
            self.cartList.splice(index,1);
            isConfirm_confirm();
          }
          //点击'否'触发事件,隐藏提示框,back返回当前界面
          document.getElementById("confirmX").onclick = function(){
            isConfirm_confirm();
          }
        },

        //单选
        selectedAction:function (index) {
         this.$nextTick(function () {

           this.cartList[index].isSelect =  !this.cartList[index].isSelect;
//           alert(this.cartList[index].isSelect)
         })
        },
        //全选
        selectedAllAction:function () {
          this.selectAll = !this.selectAll;
          if (this.selectAll){
              this.cartList.forEach(item =>{
                  item.isSelect = true;
              })
          }else {
            this.cartList.forEach(item =>{
              item.isSelect = false;
            })
          }
        },

        //支付
        payAction:function () {
          notice('','支付成功');
          document.getElementById("notice").onclick = function(){
            noticeHide();
          }
        }
      },
        //监听购物车变化
        watch:{
          cartList:{
             handler:function (val,oldval) {
                 //alert(123)
                 var index = 0;
                 for (var i=0; i<val.length; i++){
                   var item = val[i];
                   if(item.isSelect){
                     index++
                   }
                 }

                 if(index == this.cartList.length){
                   this.selectAll = true
                 }else {
                   this.selectAll = false
                 }

             } ,
            deep: true
          }
        },
        //DOM完成
        mounted:function () {
          var index = 0;
          for (var i=0; i<this.cartList.length; i++){
            var item = this.cartList[i];
            if(item.isSelect){
              index++
            }
          }

          if(index == this.cartList.length){
            this.selectAll = true
          }else {
            this.selectAll = false
          }
        }

  }

</script>

<style scoped>
  @import "../../src/components/alterView/popup.css";
  .car-Container{
    color:black;
    margin: 32px;
    background: #fff;
    border: 1px solid #dddee1;
    border-radius: 10px;
    overflow: hidden;
  }
  .cart-header{
    width: 100%;
  }
  .cart-header-title{
    width: 100%;
    padding: 16px 32px;
    border-bottom: 1px solid #dddee1;
    border-radius: 10px 10px 0 0;
    background: #f8f8f9;
  }
  .cart-header-main{
    padding:8px 32px;
    overflow: hidden;
    border-bottom: 1px solid purple;
    background: #eee;
    display: flex;
  }
  /*全选*/
  .cart-all{
    flex: 10;
    text-align: left;
    position: relative;
  }
  /*单选*/
  .cart-select{
    flex: 10;
    text-align: left;
    position: relative;
  }
  .cart-info{
    flex: 50;
    text-align: left;
  }
  .cart-price{
    flex: 10;
    text-align: left;
  }
  .cart-count{
    flex: 10;
    text-align: left;
  }
  .cart-cost{
    flex: 10;
    text-align: left;
  }
  .cart-delete{
    flex: 10;
    text-align: left;
  }
  .cart-content-main{
    display: flex;
    padding: 0 32px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-bottom: 1px solid #e9eaec;
    overflow: hidden;
    position: relative;
  }
  .cart-content-main img{
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    /*left: -10;*/

  }
  .cart-content-main .cart-info span{
    margin-left: 42px;
    font-size: 14px;
  }
  /*增加或减少按钮*/
  .cart-minus,
  .cart-added{
    display: inline-block;
    margin:0 4px;
    height: 20px;
    width: 20px;
    line-height:20px;
    text-align: center;
    background: #f8f8f9;
    border-radius: 50%;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    cursor: pointer;
  }
  /*删除*/
  .cart-delete{
    cursor: pointer;
    color: #2d8cf0;
  }

  /*总计*/
  .total{
    float: right;
    height: 100px;
    width: 400px;
    display: flex;
    margin-right: 40px;
  }
  /*数量*/
  .total .count{
    flex: 1;
    margin-top: 40px;
    font-size: 16px;
  }
  .total .count span{
    color: gray;
  }
  /*金额*/
  .total .cost{
    flex: 1;
    margin-top: 30px;
  }
  .total .top{
    margin-bottom: 6px;
  }
  .total .top span,.bottom span{
    color: gray;
  }
  /*结算*/
  .total .pay{
    display: inline-block;
    text-align: center;
    flex: 1;
    width: 10px;
    height: 30px;
    line-height: 30px;
    background: goldenrod;
    color: white;
    margin-top: 40px;
    border-radius: 4px;
  }

  /*选择框*/
  .cart-select-logo{
    position: absolute;
    left: 0;
    top: 20px;
    background: url("../../src/assets/car_btn_unsele@2x.png") no-repeat;
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
  }
  .cart-select-logo.isSelected {
    background: url("../../src/assets/car_btn_sele@2x.png") no-repeat;
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
  }
  /*全选*/
  .cart-all span{
    padding-left: 24px;
  }
  .cart-select-all-unselect{
    position: absolute;
    left: 0;
    top: -3px;
    background: url("../../src/assets/car_btn_unsele@2x.png") no-repeat;
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
  }
  .cart-select-all-unselect.cart-select-all-select{
    background: url("../../src/assets/car_btn_sele@2x.png") no-repeat;
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
  }
</style>
