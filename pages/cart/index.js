// pages/cart/index.js
import {login, get_setting, open_setting, choose_address, show_model, show_toast} from "../../utils/asyn_wx.js"
import {request, request2} from "../../request/index.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}, 
    cart: [],
    all_checked: false,
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
    const cart = wx.getStorageSync("cart") || [];
    
    this.setData({address:addr});
    this.reset_cart(cart);
  },

  // choose_addr(){
  //   console.log('a');

  //   wx.getSetting({
  //     success: (result)=>{
  //       // console.log(result);
  //       const scope_addr = result.authSetting["scope.address"];
  //       if(scope_addr === true || scope_addr === undefined){
  //         wx.chooseAddress({
  //           success: (result1)=>{
  //             console.log(result1);
  //           }
  //         });
  //       }
  //       else{
  //         wx.openSetting({
  //           success: (result)=>{
  //             wx.chooseAddress({
  //               success: (result2)=>{
  //                 console.log(result2);
  //               }
  //             });
  //           }
  //         });
  //       }
  //     }
  //   });
  // }

  // async choose_addr(){
  //   const res = await get_setting();
  //   const scope_addr = res.authSetting['scope.address'];
  //   if(scope_addr === true || scope_addr === undefined){
  //     const res1 = await choose_address();
  //   }
  //   else{
  //     await open_setting();
  //     const res2 = await choose_address();
  //   }
  // }

  async choose_addr(){
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

  checkbox_change(e){
    const goods_id = e.currentTarget.dataset.id; 
    let {cart} = this.data;
    let index = cart.findIndex(v=>v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;
    
    this.reset_cart(cart);
  },

  checkboxs_change(){
    console.log(cart);
    let {cart, all_checked} = this.data;
    all_checked = !all_checked;
    cart.forEach(v=>v.checked = all_checked);
    this.reset_cart(cart);
  },

  async num_change(e){
    // console.log(e);
    const {operation, id} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id===id);
    // let that = this;
    if(cart[index].num === 1 && operation === -1){
      // wx.showModal({
      //   title: 'Warning',
      //   content: 'Delete this product',
      //   showCancel: true,
      //   cancelText: 'Cancle',
      //   cancelColor: '#000000',
      //   confirmText: 'Confirm',
      //   confirmColor: '#3CC51F',
      //   success: (result) => {
      //     if(result.confirm){
      //       // console.log(that);
      //       cart.splice(index, 1);
      //       this.reset_cart(cart); 
      //     }
      //     else{
      //       console.log('cancle')
      //     }
      //   }
      // });
      const res = await show_model({content: "删除该商品"})
      if(res.confirm){
        cart.splice(index, 1);
        this.reset_cart(cart);
      }
    } 
    else{
      cart[index].num += operation;
      this.reset_cart(cart);
    }
  },

  reset_cart(cart){
    let all_checked = true;
    // const all_checked = cart.length? cart.every(v=>v.checked) : false;
    let total_price = 0;
    let nums = 0;
    cart.forEach(v=>{
      if(v.checked){
        total_price += v.num * v.goods_price;
        nums += v.num;
      }
      else{
        all_checked=false;
      }
    })
    all_checked=cart.length? all_checked: false;

    this.setData({
      cart,
      all_checked,
      total_price,
      nums
    })    
    wx.setStorageSync('cart', cart);
  },

  async handle_pay(){
    const {address, nums} = this.data;
    if(!address.userName){
      await show_toast({title: "你还未选择收货地址"});
      return ;
    }
    if(nums === 0){
      await show_toast({title: "你还未选购任何商品"})
    }

    wx.navigateTo({
      url: '/pages/pay/index',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  async handleUserInfo(e){
    try{
      // console.log(e);
      const {encryptedData, rawData, iv, signature} = e.detail;
      // console.log(encryptedData); 
      const {code} = await login();
      // x.log(code); 
      const loginParams = {encryptedData, rawData, iv, signature, code};
      console.log(loginParams);
      const token = await request2({url: "/wxlogin",data:loginParams, method:"POST"});
      
      //TODO:
      console.log(token);
      wx.setStorageSync("token", token);
      
      handle_pay();
    }
    catch(err){
      console.log(err);
    }
  },

})