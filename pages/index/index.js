import {userLogin, request} from "../../request/index.js";

wx-Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_list: [],
    cat_list: [],
    floor_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request(
    //   {
    //     url: "home/swiperdata",
    //     success: (result) =>
    //     {
    //       console.log(result);
    //       this.setData(
    //         {
    //           swiper_list: result.data.message
    //         }
    //       )
    //     }
    //   }
    // )
    this.getSwiperList();
    this.getCatList();
    this.getFloorList();
    userLogin();
    
  },



  getSwiperList(){
    request({url: "home/swiperdata" })
      .then(result => {
        this.setData({
          swiper_list: result.data.message
        })
      })
  },

  getCatList() {
    request({url: "home/catitems"})
      .then(result => {
        this.setData({
          cat_list: result.data.message
        })
      })
  },

  getFloorList() {
    request({url: "home/floordata"})
      .then(result => {
        this.setData({
          floor_list: result.data.message
        })
      })
  }
})