// pages/category/index.js
import {request} from "../../request/index.js";
// import regeneratorRuntime from "../../lib/runtime/runtime.js";

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    menuList: [],
    contentList: [],
    cur_idx: 0,
    scroll_top: 0
  },
  cats: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // whethear the local cache exists
    const cats = wx.getStorageSync("cats_cache"); // web localStorage.getItem("key")
    if(!cats){
      // console.log('b');
      this.getCats()
    }
    else{
      if(Date.now() - cats.time > 60 * 1000){
        // console.log('c');
        this.getCats();
      }
      else{
        // console.log('a');
        this.cats = cats.data;
        let menuList = this.cats.map(v => v.cat_name);
        let contentList = this.cats[0].children;
        this.setData({
          menuList,
          contentList
        })
      }
    }
  },

  // getCats(){
    //   request({
      //     url: "categories"
      //   })
      //   .then(res=>{
        //     // console.log(res);
        //     this.cats = res.data.message;
        //     // write data into local
        //     wx.setStorageSync("cats_cache", {time:Date.now(), data: this.cats});  // web localStorage.setItem("key", "value")
        
        //     let left = this.cats.map(v=>v.cat_name);
        //     let right = this.cats[0].children
        
        //     this.setData({
          //       menuList: left,
          //       contentList: right
          //     })
          //   })
          
  async getCats(){
    const res = await request({url: "categories"});
    this.cats = res.data.message;
    wx.setStorageSync("cats_cache", {time:Date.now(), data: this.cats});
    let left = this.cats.map(v=>v.cat_name);
    let right = this.cats[0].children

    this.setData({
      menuList: left,
      contentList: right
    })
  },

  handle_item_tap(e){
    // console.log(e);
    const {index} = e.currentTarget.dataset;
    let right = this.cats[index].children;

    this.setData({
      cur_idx: index,
      contentList: right,
      scroll_top: 0
   })



  }
})