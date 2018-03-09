import Picker from '../../models/Picker';
import PickerCom from '../../components/picker/PickerCom';
import CarModelCom from '../../components/carmodel/CarModelCom';
import ToastCom from '../../components/toast/ToastCom';
import InsureService from '../../service/InsureService';
import util from '../../util/util';
import validator from '../../util/validator';

Page({
  data: {
    currentpage:1,
    searchContent:'',
    dataList:[],
    showMore:false,
    carModel:{},
    visible:false
  },
  initCarmodel: function() {
    let params = {
      processinstanceid: this.taskId,
      webpagekey: '1'
    }
    InsureService.carModels(params).then((result) =>{
      if (result.status == 'success') {
        this.data.searchContent = result.body.modelCode ? result.body.modelCode.replace(/[\u4e00-\u9fa5]+/g, '') : '';
        this.setData({searchContent:this.data.searchContent});
        if(this.callInsureInfo.carmodelbean&&this.callInsureInfo.carmodelbean.length>1) {
          this.data.dataList = this.callInsureInfo.carmodelbean;
          this.setData({dataList:this.data.dataList});
        } else {
          this.loadData(); 
        }
      }
    })
  },
  selectCarModal: function (e) {
    let carExample={"processinstanceid":this.taskId,"taxPrice":308100,"aliasname":"","analogyprice":0,"analogytaxprice":0,"brandname":"一汽奥迪","displacement":1.984,"familyname":"一汽奥迪A4","fullweight":1615,"gearbox":"CVT","loads":0,"listedyear":"200901","price":283800,"seat":5,"standardname":"奥迪FV7203TFCVTG轿车","carVehicleOrigin":"合资","jgVehicleType":"FV7203TFCVTG","vehicleid":"402880881e5d6f8a011ea9e7da9915bf","syvehicletypename":"六座以下客车","syvehicletypecode":"KA"}
    let carItem = e.currentTarget.dataset.item;
    carItem.processinstanceid = this.taskId;
    let selectedCar = { modelCode:carItem.standardname,displacement:carItem.displacement,approvedLoad:carItem.seat,
        tonnage:carItem.loads,wholeWeight:(carItem.fullweight || 0),processinstanceid:this.taskId,webpagekey:'1'};
    let cInfo= this.callInsureInfo;
    if(cInfo.resultMap && cInfo.resultMap.carinfobean){
        if(cInfo.resultMap.carinfobean.useProperty){ //车辆属性
          selectedCar.useProperty = cInfo.resultMap.carinfobean.useProperty;
        }
        if(cInfo.resultMap.carinfobean.institutionType){ //车辆性质
          selectedCar.institutionType = cInfo.resultMap.carinfobean.institutionType;
        }
    }
    let  carComfirm=util.ZzbStore.getLocal(this.taskId,'carComfirm');
    InsureService.selectCarModel(carExample).then((result) =>{
      if(result.status == 'success') {
        carComfirm.modelCode = carItem.standardname;
        carComfirm.displacement = carItem.displacement;
        carComfirm.approvedLoad = carItem.seat;
        carComfirm.wholeWeight = (carItem.fullweight || 0);
        carComfirm.rulePriceProvideType = (carComfirm.rulePriceProvideType || 0);
        this.data.carModel = carComfirm;
        this.setData({carModel:this.data.carModel,visible:true});
      }
    });
  },
  valid:function(){
    let res ={flag:true};
    this.institutionType = this.insPropCom.getPickerValue();//所属属性
    this.useProperty = this.userPropCom.getPickerValue();//车辆性质
    if(validator.required(this.institutionType)) {
       return {flag:false,msg:'请输入车辆所属属性'};
    }
    if(validator.required(this.useProperty)) {
      return {flag:false,msg:'请输入车辆车辆性质'};
   }
    return res;
  },
  nextStep: function () {
    let carComfirm =  this.data.carModel;
    carComfirm.institutionType = this.institutionType;
    carComfirm.useProperty = this.useProperty;
    InsureService.modelConfirm(carComfirm).then((result) =>{
      if(result.status == 'success') {
        util.ZzbStore.setLocal(this.taskId,'carComfirm',carComfirm);        
        wx.redirectTo({
          url: '../insure/car-detail?taskId='+ this.taskId+'&type=carComfirm'
        })
      }
    })
  },
  loadData: function (){
    let params = { pagesize: 10, currentpage:this.data.currentpage, carModelList:null,
      searchContent: this.data.searchContent, modelname: this.data.searchContent, 
      carlicenseno:this.zzbUser.plateNumber,"agentid":this.zzbUser.agentId}
    this.tSearchCom =new ToastCom({id:'toastSearch',data:{}});
    if(this.data.dataList.length >= this.cartotal){
      return;
    }
    InsureService.searchCarModel(params).then((result) => {
      if(result.status == 'success') {
        this.data.currentpage++;
        this.data.dataList = this.data.dataList.concat(result.body);
        this.cartotal = result.message;
        if(this.cartotal>0){
          this.data.showMore =  true;
          this.setData({showMore:this.data.showMore});
        }
        if(this.data.dataList.length>=this.cartotal){
          this.data.showMore =  false;
          this.setData({showMore:this.data.showMore});
        }
        this.setData({dataList: this.data.dataList});
      }
    });
  },
  onReachBottom: function() {
    this.loadData();
  },
  onLoad: function (options) { 
    // 调用应用实例的方法获取全局数据
    let app = getApp();
    // “注册”组件
    new app.ToastPannel ();
    this.taskId = options.taskId;
    this.zzbUser=util.Store.getLocal('zzbUser');
    this.callInsureInfo=util.ZzbStore.getLocal('callInsureInfo',this.taskId);
 
    let rules = util.Store.getLocal('rules');
    let instiTypeArr =rules.UserType||[]; //3 
    let userProObjArr =rules.UseProps||[]; //10 
    let insArr = [{id:'',name:'请选择'}];//所属属性
    let userpArr = [{id:'',name:'请选择'}];//车辆性质
    for(let k in instiTypeArr){
      insArr.push({id:instiTypeArr[k].codeValue,name:instiTypeArr[k].codeName});
     }
    for(let n in userProObjArr){
        userpArr.push({id:userProObjArr[n].codeValue,name:userProObjArr[n].codeName});
    }
    this.userPropCom = new PickerCom({id:'userPropCom',data:new Picker({objectArray:userpArr})});
    this.userPropCom.open();
    this.insPropCom = new PickerCom({id:'instiTypeCom',data:new Picker({objectArray:insArr})});
    this.insPropCom.open();

    this.initCarmodel();
  }
})
