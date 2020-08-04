import {get_setting, open_setting, choose_address, show_model, show_toast} from "../../utils/asyn_wx.js"
// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    collectNums:0
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userinfo = wx.getStorageSync('userinfo');
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      userinfo,
      collectNums: collect.length
    })

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

})