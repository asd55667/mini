// pages/pay/index.js
import {show_toast, request_payment} from "../../utils/asyn_wx.js"
import { request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}, 
    cart: [],
    total_price: 0,
    nums: 0
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
    // console.log('a');

    const order_price = this.total_price;
    const consignee_addr = this.address.all;
    const cart = this.cart;
    let goods = [];
    cart.forEach(v=>goods.push({
      goods_id: v.goods_id,
      goods_number: v.num,
      goods_price: v.goods_price
    }))

    const orderParams = {order_price, consignee_addr, goods}

    const {orderNumber} = await request({url: "my/orders/create", method:"POST", 
                          data: orderParams})
    console.log(orderNumber);

// pre pay
    const pay = await request({url: "my/orders/req_unifiedorder", method:"POST", 
                data:{orderNumber}});
    // console.log(pay);
    
    await request_payment(pay);
    
    const res = await request({url: "my/orders/chkOrder", method:"POST",
              data:{orderNumber} })
    // console.log(res);
    await show_toast({title: "Payment Successful"});

    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v=>!v.checked);
    wx.setStorageSync('cart', newCart);


    wx.navigateTo({
      url: '/pages/order/index'
    });

    }
    catch(err){
      await show_toast({title: "Payment Failed"});
      console.log(err);
    }


  }

})  