// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // Tabs tab_data="{{data}}"
    tab_data:{
      type: Array, 
      value: []
    }
  },


  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handle_item_tap(e){
      // console.log(e);
      const {index} = e.currentTarget.dataset;
      this.triggerEvent("tabs_change", {index});
    }
  }
})
