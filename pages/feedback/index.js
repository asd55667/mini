// pages/feedback/index.js

import {show_toast} from "../../utils/asyn_wx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_data:[
      {
        id:0,
        value: "问题报告",
        isActive: true
      },
      {
        id:1,
        value: "投诉",
        isActive: false
      }
    ],
    choosed_img: [],
    textVal: ""

  },

  upload_imgs: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleTabsChange(e){
    const {index} = e.detail;
    let {tab_data} = this.data;
    tab_data.forEach((v, i) => i === index? v.isActive = true : v.isActive = false);

    this.setData({
      tab_data
    })
  },

  handleChooseImg(){
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
       this.setData({
         choosed_img: [...this.data.choosed_img, ...result.tempFilePaths]
       }) 
      }
    });
  },

  handleRemoveImg(e){
    const {index} = e.currentTarget.dataset;
    let {choosed_img} = this.data;

    choosed_img.splice(index, 1);
    this.setData({
      choosed_img
    })
  },

  handleTextInp(e){
    this.setData({
      textVal: e.detail.value
    })
  },

  handleFormMenu(e){
    const {textVal, choosed_img} = this.data;
    if(!textVal){
      show_toast({title: "Invalid Input"})
      return ; 
    }

    wx.showLoading({
      title: "Uploading",
      mask: true,
    });

    if(choosed_img.length !=0){

      choosed_img.forEach((v,i) => {
        wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          filePath: v,
          name: "file",
          formData: {},
          success: (result)=>{
            console.log(result);
            let url = JSON.parse(result.data).url;
            this.upload_imgs.push(url);

            if(i === choosed_img.length-1){
              console.log('upload');
              this.setData({
                textVal: "",
                choosed_img: []
              })
              wx.hideLoading();
            }
            wx.navigateBack({
              delta: 1
            });
          }
        });

      })
   }
   else{
    wx.hideLoading(); 
    console.log("text only");
    wx.navigateBack({
      delta: 1
    });

  }
  }

})