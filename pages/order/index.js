// pages/order/index.js

import {request} from "../../request/index.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_data:[
      {
        id: 0,
        value: "All",
        isActive: true
      },
      {
        id: 1,
        value: "Unpaied",
        isActive:false
      },
      {
        id:2,
        value: "Onroad",
        isActive:false
      },
      {
        id:3,
        value: "Return/Refund",
        isActive:false
      }
    ],
    orders:[]
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const token = wx.getStorageSync('token');
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }


    let curPages =  getCurrentPages();
    let cur_page = curPages[curPages.length - 1];
    // console.log(cur_page.options);

    const {type} = cur_page.options;
    this.changeTitleByIndex(type-1);
    this.getOrders(type);
  },

  async getOrders(type){
    const res = await request({url: "my/orders/all", data:{type}});
    // console.log(res);
    this.setData({
      orders: res.orders.map(v=>({...v, create_time_cn:(new Date(v.create_time * 1000).toString())}))
    })
  },

  changeTitleByIndex(index){
    let {tab_data} = this.data;
    tab_data.forEach((v,i) => i === index? v.isActive=true : v.isActive=false);
    this.setData({
      tab_data
    })
  },

  handleTabsItemChange(e){
    // console.log(e);
    const {index} = e.detail;
    this.changeTitleByIndex(index);

    this.getOrders(index+1);
  }
})