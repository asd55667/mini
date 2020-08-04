// pages/goods_detail/index.js
import {request} from "../../request/index.js"
import {show_toast} from '../../utils/asyn_wx.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_obj: {},
    stared: false
  },

  goods_info: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    // console.log(options);
    let curPages =  getCurrentPages();
    let cur_page = curPages[curPages.length - 1];
    let options = cur_page.options;
    
    const {goods_id} = options;
    // console.log(goods_id);
    this.getGoodsDetail(goods_id); 
  },

  async getGoodsDetail(goods_id){
    const res = await request({url:"goods/detail", data:{goods_id}});
    // console.log(res);
    let tmp = res.data.message;
    this.goods_info = tmp;

    let collect = wx.getStorageSync('collect') || [];

    let stared = collect.some(v => v.goods_id === this.goods_info.goods_id);
    
    this.setData({
      goods_obj: {
        goods_name: tmp.goods_name,
        goods_price: tmp.goods_price,
        pics: tmp.pics,
        goods_introduce: tmp.goods_introduce.replace(/\.webp/g, '.jpg')
      },
      stared
    })
  },

  handle_img(e){
    // console.log(this.goods_info);
    // console.log(this.goods_obj);
    const urls =  this.goods_info.pics.map(v=>v.pics_mid);
    const  cur = e.currentTarget.dataset.url;
    wx.previewImage({
      current: cur,
      urls: urls
    })
  },

  handle_mycart(){
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v=>v.goods_id === this.goods_info.goods_id);
    if(index === -1){
      this.goods_info.num = 1;
      this.goods_info.checked = true;
      cart.push(this.goods_info);
    }
    else{
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true,
      success: (result)=>{
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  handle_tansaction(){
  },

  handleCollect(){    
    let stared = false;
    let collect = wx.getStorageSync("collect") || [];
    // console.log(collect);

    let index = collect.findIndex(v => v.goods_id === this.goods_info.goods_id);
    if(index !== -1){
      collect.splice(index, 1);
      stared = false;
      show_toast({title: "取消成功"});
    }
    else{
      collect.push(this.goods_info);
      stared = true;
      show_toast({title: "收藏成功"});
    }
    wx.setStorageSync('collect', collect)

    this.setData({
      stared
    })
  }
})