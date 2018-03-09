//index.js
//获取应用实例
var app = getApp()
import Carouse from '../../models/Carouse'
import CarouselPic from '../../components/carouselPic/CarouselPic';
import InsureService from '../../service/InsureService';
import util from '../../util/util';

Page({
  data: {
    userInfo:null,
    isNewCar:false,
    carInfo:{},
    plateNumber:'',
    username: '',
    processinstanceid:'',
    items:[{
        value:'未上牌',
        name:'1',
        checked:false,
        focus: false,
        inputValue: ''
    }]
  },
  onLoad: function () {
    //生命周期函数--监听页面加载
    this.zzbUser  = util.Store.getLocal('zzbUser');
    this.fetchData();
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo) =>{
      //更新数据
      this.setData({
        userInfo:userInfo
      })
    })
    var params={
      agentId: this.zzbUser.agentId,
      cityName:  this.zzbUser.cityName,
      jobNum: this.zzbUser.cityName,
      deptid:this.zzbUser.deptid,
      name: this.zzbUser.cityName,
      city: this.zzbUser.cityName,
      deptid: this.zzbUser.deptid,
      innerCode: this.zzbUser.deptinnercode,
      id: 'ZhangZhongBaoShouYeLunBoGuangGao',
      callback: 'callback'
    }
   this.cityName = params.cityName;
   this.params = params;
   this.setData({
    carInfo:params,
    plateNumber: '粤A12345',
    username: params.name   
   })
   InsureService.advs(params).then((result) => {
      let advData=util.avdHandle.toObj(result);
      if(advData.status=='1'){
         let advOptions=util.avdHandle.dataToCarousel(advData.result);
         advOptions.id = 'homeAdv';
         this.carouselPic=new CarouselPic(advOptions);
         this.carouselPic.open();
       }
     })
   },
  fetchData:function(){
    this.setData({
      indexmenu:[
        {
          'icon':'./../../assets/images/icon_05.png',
          'text':'待投保',
          'url':'property'
        },
        {
          'icon':'./../../assets/images/icon_03.png',
          'text':'待支付',
          'url':'service'
        },
        {
          'icon':'./../../assets/images/icon_13.png',
          'text':'待续保',
          'url':'apply'
        }
      ],
      indexLines:[
        {
          'icon':'./../../assets/images/icon_01.png',
          'name':'车辆投保',
          'text':'支持多家保险公司报价，投保',
          'url':'insure/car-info'
        },
        {
          'icon':'./../../assets/images/icon_07.png',
          'name':'快速续保',
          'text':'直接续保单，请走这里',
          'url':'service'
        },
        {
          'icon':'./../../assets/images/icon_09.png',
          'name':'我',
          'text':'订单、保单、个人中心及更多',
          'url':'my/my'
        }
      ]
    })
  },
  changeRoute:function(url){
    console.log('url: ' + url)
    wx.navigateTo({
      url: `../${url}`
    })
  },
  onReady:function(){
    //生命周期函数--监听页面初次渲染完成
    // console.log('onReady');
  },
  onShow :function(){
    //生命周期函数--监听页面显示
    // console.log('onShow');
  },
  onHide :function(){
    //生命周期函数--监听页面隐藏
    // console.log('onHide');
  },
  onUnload :function(){
    //生命周期函数--监听页面卸载
    // console.log('onUnload');
  },
  onPullDownRefresh:function(){
    //页面相关事件处理函数--监听用户下拉动作
    // console.log('onPullDownRefresh');
  },
  onReachBottom:function(){
    //页面上拉触底事件的处理函数
    // console.log('onReachBottom');
  }
 
})
