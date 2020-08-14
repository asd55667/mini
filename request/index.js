import {login} from "../utils/asyn_wx.js";

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
    success: (result)=>{},
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


export const request2=(params)=>{
  let header = {...params.header};
  if(params.url.includes("my/")){
    header['Authorization'] = wx.getStorageSync('token');
  }

  ajax_time++;

  wx.showLoading({
    title: "Loading",
    mask: true,
    success: (result)=>{},
    fail: ()=>{},
    complete: ()=>{}
  });
  
  const baseUrl = "https://mini.wuchengwei.icu/wordcat/";
  
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

export const checkSession = ()=>{
  return new Promise((resolve, reject)=>{
    wx.checkSession({
      success: (res) => {resolve(res)},
      fail: (err) => {
        reject(err);
    }
    })
  })
}

export const userLogin = async ()=>{
  let {errMsg} = await checkSession();
  if(errMsg === "checkSession:ok"){    
    const {code} = await login();
    // const {encryptedData, rawData, iv, signature} = e.detail;
    // const loginParams = {encryptedData, rawData, iv, signature, code};
    const res = await request2({url: "users/wxlogin", data: {code}, method:"POST"});
    let {data} = res;
    wx.setStorageSync('token', data);
  }
}