let ajax_time = 0;
export const request=(params)=>{

  let header = {...params.header};
  if(params.url.includes("my/")){
    header['Authorization'] = wx.getStorageSync('token');
  }

  ajax_time++;

  wx.showLoading({
    title: "Loading",
    mask: true,
    success: (result)=>{
      
    },
    fail: ()=>{},
    complete: ()=>{}
  });

  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1/";

  return new Promise((resolve, reject)=>{
  wx.request({
    ...params,
    header: header,
    url: baseUrl + params.url,
    success:(result)=>{
      resolve(result);
    },
    fail:(err)=>{
      reject(err);            
    },
    complete: ()=>{
      ajax_time--;
      if(ajax_time === 0){
        wx.hideLoading();
      }
    }

  });
})
}
