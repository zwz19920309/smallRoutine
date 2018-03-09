 import Promise from '../plugins/es6-promise'
import util from '../util/util';
/**
 * Created by Administrator on 2017/6/22.
 */


/*Promise*/
function wxPromisify(fn) {
    return function (obj = {}) {
      return new Promise((resolve, reject) => {
        obj.success = function (res) {
          if(obj.loading){
            wx.hideLoading();
          }  
          resolve(res.data)
        }
        obj.fail = function (res) {
        if(obj.loading){
           wx.hideLoading();
        }     
          reject(res.data)
        }
        fn(obj)
      })
    }
  }

  //无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    );
  };

function PromiseRequest(method,url,params,header,loading){
    loading = (typeof loading == 'boolean') ? loading:true;
    if(loading) {
        wx.showLoading({title: '加载中'});
     }
    let reqConfig= {
        url: url,
        method: method,//默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        data: params,
        loading: loading
    }
    reqConfig.header=!!header?header:{};
    let pRequest = wxPromisify(wx.request);
    return  pRequest(reqConfig);
}


function PromiseGET(url,params,header,loading){
   return  PromiseRequest('GET',url,params,header,loading)
}

function PromisePOST(url,params,header,loading){
   return  PromiseRequest('POST',url,params,header,loading)
}
  
  


/* 定义接口*/
module.exports = {
    PromiseGET:PromiseGET,
    PromisePOST:PromisePOST
}
