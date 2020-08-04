// pages/search/index.js
import {request} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    is_focus:false,
    inp:""
  },
  time_id: -1,

  handleInput(e){
    const {value} = e.detail;
    if(!value.trim()){
      this.setData({
        goods:[],
        is_focus: false
      })
    }
    this.setData({
      is_focus:true
    })

    clearTimeout(this.time_id);
    this.time_id=setTimeout(() => {
      this.qsearch(value);
    }, 1000);
    
  },

  async qsearch(query){
    const res = await request({url: "goods/search", data:{query}}); 

    this.setData({
      goods: res.data.message.goods
    })

  },

  handleCancel(){
    this.setData({
      inp: "",
      is_focus: false,
      goods:[]
    })
  }
})