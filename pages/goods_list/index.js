// pages/goods_list/index.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_data:[
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive:false
      },
      {
        id:2,
        value: "价格",
        isActive:false
      }
    ],

    goods_list: [],
    sort_by_price: [],
    sort_by_nums: []
  },
  query_param:{
    query:"",
    cid:"",
    page_no: 1,
    pagesize: 10
  },
  total_pages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.query_param.cid = options.cid || "";
    this.query_param.query = options.query || "";
    this.getGoodsList();
  },

  async getGoodsList(){
    const res = await request({url: "goods/search", data: this.query_param});
    // console.log(res);
    let {goods} = res.data.message;
    const {total} =  res.data.message;
    this.total_pages = Math.ceil(total / this.query_param.pagesize);

    // this.data.goods_list.sort((x,y) => x['goods_price'] - y['goods_price']);
    let goods_list = [...this.data.goods_list, ...goods];
    let sort_by_price = goods_list.slice().sort((x,y) => x['goods_price'] - y['goods_price']);
    let sort_by_nums = goods_list.slice().sort((x,y) => x['goods_number'] - y['goods_number']);
    this.setData({
      goods_list,
      sort_by_price,
      sort_by_nums
      // : [...this.data.goods_list, ...goods]
    })

    wx.stopPullDownRefresh();
  },

  handle_tabs_change(e){
    // console.log(e);
    const {index} = e.detail;
    let {tab_data} = this.data;
    tab_data.forEach((v, i)=> i === index? v.isActive=true : v.isActive=false);
    this.setData({
      tab_data
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.total_pages);

    if(this.query_param.page_no >= this.total_pages){
      console.log('bottom');
    }
    else{
      this.query_param.page_no++;
      // console.log(this.query_param.page_no);
      this.getGoodsList();
    }
  },

  onPullDownRefresh(){
    this.setData({
      goods_list: []
    })
    
    this.query_param.page_no = 1;
    this.getGoodsList(); 

  }
})