let _compData = {
    '__toast__.isShow': false,
    '__toast__.content': ''//
  }
  
  // 小程序最新版把原型链干掉了。。。换种写法
  let toastPannel = {      
    toast: function(data) {
      let that = this;  
      this.setData({'__toast__.isShow':true, '__toast__.content': data})
      setTimeout(function(){
         that.setData({'__toast__.isShow': false});
      },1500);
    }
  }
  function ToastPannel () {
    // 拿到当前页面对象
    let pages = getCurrentPages();
    let curPage = pages[pages.length - 1];
    //this.__page = curPage;
    Object.assign(curPage, toastPannel) // 小程序最新版把原型链干掉了。。。换种写法
    // 附加到page上，方便访问
    curPage.toastPannel = this;
    // 把组件的数据“注入”到页面的data对象中
    curPage.setData(_compData);
    return this;
  }

  module.exports = {
    ToastPannel
  }