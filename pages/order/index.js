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
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive:false
      },
      {
        id:2,
        value: "待发货",
        isActive:false
      },
      {
        id:3,
        value: "待收货",
        isActive:false
      },
      {
        id:4,
        value: "退款／退货",
        isActive:false
      }
    ],
    orders:[]
  },

  onLoad: function(options){
    let {id} = options;
    this.changeTitleByIndex(id-1);
    
  },


  onShow: function (options) {
    // const token = wx.getStorageSync('token');
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/auth/index'
    //   });
    //   return;
    // }


    // let curPages =  getCurrentPages();
    // let cur_page = curPages[curPages.length - 1];
    // const {id} = cur_page.options;
    // this.changeTitleByIndex(id-1);
    
    // this.getOrders(type);
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

    // this.getOrders(index+1);
  }
})