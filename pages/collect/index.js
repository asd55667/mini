// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_data:[
      {
        id: 0,
        value: "收藏",
        isActive: true
      },
      {
        id:2,
        value: "历史记录",
        isActive:false
      }
    ],
    collect:[]
  },


  onLoad: function (options) {
    let {id} = options;
    this.changeTitleByIndex(id-1);
  },


  onShow: function () {
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
      collect
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