// pages/auth/index.js


import {request} from "../../request/index.js"
import {login} from '../../utils/asyn_wx.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  async handleUserInfo(e){
    // console.log(e)
    try{
      // console.log(e);
      const {encryptedData, rawData, iv, signature} = e.detail;
      const {code} = await login();
      // console.log(code); 
      const loginParams = {encryptedData, rawData, iv, signature, code};
      // console.log(loginParams);
      const token = await request({url: "users/wxlogin",data:loginParams, method:"POST"});
      //TODO:
      console.log(token);
      wx.setStorageSync("token", token);
      
      wx.navigateBack({
        delta: 1
      });
    }
    catch(err){
      console.log(err);
    }
  }

})