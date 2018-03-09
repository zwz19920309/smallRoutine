//获取应用实例
import InsureService from '../../service/InsureService';
import validator from '../../util/validator';
import util from '../../util/util';
Page({
  data: {
    userInfo:null,
    account:'10001560',
    password:'123456'
  },
  bindAccount: function(e) {//账号双向绑定
    this.setData({ account: e.detail.value });
  },
  bindPass: function(e) {//密码双向绑定
    this.setData({ password: e.detail.value });
  },
  nextStep: function() {
    if((!validator.required(this.data.account))||(!validator.required(this.data.password))) {
      this.toast('请输入账号或者密码');
      return;
    }
    let params = { account: this.data.account,  password:this.data.password};
    InsureService.userLogin(params).then((result) =>{
        if(result.status=='success') {
          util.Store.setLocal('zzbUser',result.body);
          wx.switchTab({
            url: '../home/home'
          })
        } else {
          this.toast(result.message);
        }
    })
  },
  onLoad: function () {
    util.Store.clearStorageSync(); //首次登录清除缓存
    let app = getApp();
    new app.ToastPannel (); //注册ToastPannel组件
    app.getUserInfo((userInfo) =>{ //获取微信用户信息
      this.setData({
        userInfo:userInfo
      })
    })
  }
})
