import {request} from "../../request/index.js";

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

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
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