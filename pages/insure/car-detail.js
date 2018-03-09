import Picker from '../../models/Picker';
import PickerCom from '../../components/picker/PickerCom';
import DateCom from '../../components/date/DateCom';
import validator from '../../util/validator';
import util from '../../util/util';
import InsureService from '../../service/InsureService';

Page({
  data: {
    imgUrl:'../../assets/images/driving.png',  
    firstRegisterDate:'', //初登日期
    vin:'',  //车架号
    engineNo:'', //发动机号
    modelCode:'', //车牌型号
    carList:[], //下拉选择车型
    showCarList:true,
    visible: false,
  },
  bindVin: function(e) {
    this.setData({ vin: e.detail.value })
  },
  bindEngineNo:function(e) {
    this.setData({ engineNo: e.detail.engineNo })
  },
  chooseCarItem:function() {
    wx.navigateTo({
      url: '../insure/car-search?taskId='+this.taskId
    })
  },
  initCarData:function(){
    let params = { processinstanceid: this.taskId, webpagekey: '0'}
    InsureService.carModels(params).then( (result) => {
      if (result.status === 'success') {
        this.selectedCarInfo = result.body;
        let carInfo = result.body;
        this.data.firstRegisterDate = carInfo.firstRegisterDate;
        this.data.engineNo = carInfo.engineNo;
        this.data.vin = carInfo.vin;
        this.data.modelCode = carInfo.modelCode;
        this.dateCom = new DateCom({id:'registerDate',start:this.data.firstRegisterDate});
        this.dateCom.open();
        this.setData({vin:this.data.vin,engineNo:this.data.engineNo,
          modelCode:this.data.modelCode,carList:this.carList,visible:true});
      }
    });
  },
  selectCarItem: function(e){
    let carItem = e.currentTarget.dataset.item;
    carItem.processinstanceid = this.taskId;
    let carComfirm = {approvedLoad:carItem.seat,customPrice:null,displacement:carItem.displacement,institutionType:null,modelCode:carItem.standardname,processinstanceid:this.taskId,rulePriceProvideType:
    null,tonnage:carItem.loads,useProperty:null,webpagekey:'1',wholeWeight:(carItem.fullweight || 0)}
    let selectedCar = { modelCode:carItem.standardname,displacement:carItem.displacement,approvedLoad:carItem.seat,
        tonnage:carItem.loads,wholeWeight:(carItem.fullweight || 0),processinstanceid:this.taskId,webpagekey:'1'};
    if(carItem){
      util.loading.show();
      InsureService.selectCarModel(carItem,false).then((result) =>{
        if(result.status == 'success') {
         return  InsureService.modelConfirm(carComfirm,false)
        }
      }).then((result) => {
          if(result.status == 'success') {
            util.ZzbStore.setLocal(this.taskId,'carComfirm',carComfirm);
            wx.navigateTo({
              url: '../insure/car-search?taskId='+this.taskId
            })
          }
          util.loading.hide();
      });
    }
  },
  valid:function() {
    this.data.firstRegisterDate = this.dateCom.getDate();
    console.log('firstRegisterDate: ') + this.data.firstRegisterDate;
    let res = { flag: true, msg:''};
    if(!validator.required(this.data.firstRegisterDate)) {
      return { flag: false, msg:'请输入车辆初登日期'};
    } 
    if(!validator.required(this.data.vin)) {
      return { flag: false, msg:'请输入车架号'};
    } else {
      if((this.data.vin.indexOf('*')!= -1)&&(this.selectedCarInfo.tempVin)&&(this.selectedCarInfo.tempVin != this.data.vin)) {
           return res = { flag: false, msg:'修改后的车架号不允许含有(*)非法字符'};
      } 
      if(!validator.vin(this.data.vin)) {
        return { flag: false, msg:'请输入正确的车架号'};
      } else if(validator.IOQ(this.data.vin)){
        return { flag: false, msg:'车架号不允许含有(I,Q,O)等非法字符'};
      }
    }

    if(!validator.required(this.data.engineNo)){
      return { flag: false, msg:'请输入发动机号'};
    } else {  
      if((this.data.engineNo.indexOf('*') != -1)&&this.selectedCarInfo.tengineNo && (this.selectedCarInfo.tengineNo!=this.data.engineNo)){
          return {flag:false,msg:'修改后的发动机号不能含有(*)字符!'};
      }
      if (!validator.engno(this.data.engineNo)) {
        return { flag: false, msg:'请输入正确的发动机号'};
      }
    }
    if(!validator.required(this.data.modelCode)){
      return { flag: false, msg:'请选择品牌型号'};
    }
    return res;
  },
  nextStep: function() {
   let res = this.valid(); 
   if(!res.flag) {
     this.toast(res.msg);
     return;
   }
   let selectedCar = this.selectedCarInfo;
   let carComfirm = util.ZzbStore.getLocal(this.taskId,'carComfirm');
   this.selectedCarInfo.processinstanceid = this.taskId;
   if(carComfirm&&carComfirm.institutionType){
    selectedCar.institutionType=carComfirm.institutionType;
   }
   if(carComfirm&&carComfirm.useProperty){
    selectedCar.useProperty=carComfirm.useProperty;
   }
   selectedCar.webpagekey='0';
   InsureService.saveCarInfo(selectedCar).then((result)=> {
    if(result.status =='success'){
      wx.navigateTo({
        url: '../insure/insure-company?taskId='+this.taskId
      })
    }
   });
  },
  onLoad: function (options) {
    let app = getApp();
    new app.ToastPannel (); //注册ToastPannel组件
    this.taskId = options.taskId;
    this.zzbUser  = util.Store.getLocal('zzbUser');
    let resultMap = util.ZzbStore.getLocal('callInsureInfo', this.taskId);
    if(resultMap) {
      this.carList = resultMap.carmodelbean;
    }
    let pickerC= new Picker({objectArray:[{id:'0',name:'否'},{id:'1',name:'是'}]});
    let op = {id:'transCom',data:pickerC};
    let pcikerCom = new PickerCom(op);
    pcikerCom.open();
    util.loading.show();
    this.initCarData();
  }
})
