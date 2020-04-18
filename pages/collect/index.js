// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_data:[
      {
        id: 0,
        value: "Shop",
        isActive: true
      },
      {
        id: 1,
        value: "Product",
        isActive:false
      },
      {
        id:2,
        value: "Concerned",
        isActive:false
      },
      {
        id:3,
        value: "History",
        isActive:false
      }
    ],
    collect:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
      
    })

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