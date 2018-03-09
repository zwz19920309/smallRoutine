//index.js
//获取应用实例
import Carouse from '../../models/Carouse'
import CarouselPic from '../../components/carouselPic/CarouselPic';
import InsureService from '../../service/InsureService';
import validator from '../../util/validator';
import util from '../../util/util';
import {prvCodesMap} from '../../util/code-table';

Page({
  data: {
    userInfo:null,
    isNewCar:false,
    cityName: '',
    plateNumber: '粤A24312',
    owerName: '谭祈元',
    item:{
        value:'未上牌',
        name:'1',
        checked:false
    }
  },
  bindPlateNum: function(e) { //车牌双向绑定
    let plateNum = e.detail.value.toUpperCase();
    this.setData({ plateNumber: plateNum })
  },
  bindOwnerName: function(e) { //车主双向绑定
    this.setData({ owerName: e.detail.value })
  },
  checkboxChange: function(e) {
    if(e.detail.value.length>0){
      this.isNewCar = true;
    } else {
      this.isNewCar = false;
    }
    this.changeIsNewCar(this.isNewCar);
  },
  changeIsNewCar: function (isNewCar) {
    if(isNewCar){
      this.plateNumBack = this.data.plateNumber;
      this.data.plateNumber = '未上牌';
    } else {
      this.data.plateNumber = this.plateNumBack;
    }
    this.setData({ plateNumber: this.data.plateNumber});
  },
  nextStep: function() { 
    if((!validator.required(this.data.plateNumber)&&(!this.isNewCar))||(!validator.required(this.data.owerName))){
      this.toast('请输入车牌或车主');
      return;
    }
    
    if((!validator.plateNumber(this.data.plateNumber))&&(!this.isNewCar)) {
      this.toast('车牌不合法,请重新输入');
      return;
    }
  
    let plateNumber = this.isNewCar?'':this.data.plateNumber;
    let params = { 
      agentid: this.zzbUser.agentId, plateNumber: plateNumber, 
      owerName: this.data.owerName, provinceName: this.zzbUser.provinceName,
      provinceCode: this.zzbUser.province, cityName: this.zzbUser.cityName,
      cityCode: this.zzbUser.city, flag: '0',
      queryFlag:'queryLastYearPolicy', datasourcesfrom: '1'
    }
    var carParams = {
      agentid: this.zzbUser.agentId,plateNumber: plateNumber,
      owerName: '',provinceName:this.zzbUser.provinceName,
      provinceCode: this.zzbUser.province,cityName: this.zzbUser.cityName,
      cityCode: this.zzbUser.city,flag:0,queryFlag: "queryLastYearPolicy",
      datasourcesfrom: "1",agentName: this.zzbUser.name,processinstanceid:'',timerCount:12
   }
    util.loading.show();
    InsureService.quotestart(params,false).then((result) => {
      if(result.status == 'success'){
        this.zzbUser.owerName  = this.data.owerName;
        this.zzbUser.plateNumber = this.data.plateNumber;
        util.Store.setLocal('zzbUser',this.zzbUser);
        this.taskId=carParams.processinstanceid = result.body.processinstanceid;
        carParams.owerName = this.zzbUser.owerName;
        return  InsureService.callInsureInfo(carParams,false);
      } 
    }).then((result) => {
      if(result.status == 'success') {
        let resultMap = result.body.resultMap;
        if(resultMap) {
           util.ZzbStore.setLocal('callInsureInfo',this.taskId,resultMap);
        }
        wx.navigateTo({
          url: '../insure/car-detail?taskId='+this.taskId
        })
        util.loading.hide();
      }
    });
     
  },
  initAdv: function () { //初始化广告
    let zzbUser = this.zzbUser;
    let advParams = {
      agentId: zzbUser.agentId, cityName: zzbUser.cityName,
      jobNum: zzbUser.jobNum, name: zzbUser.name, city: zzbUser.city, 
      deptid: zzbUser.deptid, callback: 'callback',
      innerCode: zzbUser.deptinnercode, id:'ZhangZhongBaoCheXianTouBaoYeMianShangFangGuangGao'
    }
    InsureService.advs(advParams).then((data) =>{
      var advData=util.avdHandle.toObj(data);
      if(advData.status=='1'){
         let advOptions=util.avdHandle.dataToCarousel(advData.result);
         advOptions.id="carInfoAdv";
         this.carouselPic=new CarouselPic(advOptions);
         this.carouselPic.open();
       }
    }) 
  },
  initRules:function () { //请求和缓存规则
    InsureService.initcodetypes({}).then((result) => {
      let rules={rulepriceprovidetype:[],UserType:[],UseProps:[],CertKinds:[]};
      for(let name in rules) {
          for(let t in result){
              if(result[t].codeType==name){
                 rules[name].push(result[t]);
              }
         }
      };
      util.Store.setLocal('rules',rules);
     });
  },
  onLoad: function () {
   let app = getApp();
   new app.ToastPannel (); //注册ToastPannel组件
   this.zzbUser  = util.Store.getLocal('zzbUser');
   this.data.cityName = this.zzbUser.cityName;
   this.data.plateNumber =  prvCodesMap[this.zzbUser.provinceName];
   this.data.plateNumber = '粤A24312';
   this.setData({ cityName:this.data.cityName,plateNumber: this.data.plateNumber, owerName: this.data.owerName});
   this.initAdv();//广告
   this.initRules();//规则 
  }
})
