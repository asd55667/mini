// pages/pay/index.js
import {get_setting, open_setting, choose_address, show_model, show_toast, request_payment} from "../../utils/asyn_wx.js"
import { request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}, 
    cart: [],
    total_price: 0,
    nums: 0,

    textVal: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow(){
    const addr = wx.getStorageSync('addr');
    let cart = wx.getStorageSync("cart") || [];
    
    cart = cart.filter(v=>v.checked);
    this.setData({address:addr});

    let total_price = 0;
    let nums = 0;
    cart.forEach(v=>{
        total_price += v.num * v.goods_price;
        nums += v.num;
    })


    this.setData({
      cart,
      total_price,
      nums
    })    
  },

  async handle_payment(){
    try{
      const token = wx.getStorageSync('token');

    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    
    // console.log(this.data);
    const order_price = this.data.total_price;
    const consignee_addr = this.data.address;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v=>goods.push({
      goods_id: v.goods_id,
      goods_number: v.num,
      goods_price: v.goods_price
    }))

    const orderParams = {order_price, consignee_addr, goods}
    // console.log(order_price);

    const {orderNumber} = await request({url: "my/orders/create", method:"POST", 
                          data: orderParams})
    console.log(orderNumber); ``

// pre pay
    const pay = await request({url: "my/orders/req_unifiedorder", method:"POST", 
                data:{orderNumber}});
    // console.log(pay);
    
    await request_payment(pay);
    
    const res = await request({url: "my/orders/chkOrder", method:"POST",
              data:{orderNumber} })
    // console.log(res);
    await show_toast({title: "支付成功"});

    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v=>!v.checked);
    wx.setStorageSync('cart', newCart);


    wx.navigateTo({
      url: '/pages/order/index'
    });

    }
    catch(err){
      await show_toast({title: "支付失败"});
      console.log(err);
    }
  },

  async handleAddr(e){
    try{
      const res = await get_setting();
      const scope_addr = res.authSetting['scope.address'];
      if(scope_addr === false){
        await open_setting();
      }
      const res1 = await choose_address();
      wx.setStorageSync("addr", res1);
    }
    catch(error){
      console.log(error);
    }
  },
  
  handleTextInp(e){
    this.setData({
      textVal: e.detail.value
    })
  },

})  