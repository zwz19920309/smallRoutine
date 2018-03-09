import util from '../../util/util';
import Picker from '../../models/Picker';
import PickerCom from '../../components/picker/PickerCom';
import InsureService from '../../service/InsureService';
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo:null,
    carOwner:{certNum:''},
    inSuranceSchemeList:[],
    visiable:false,
    queryPerson: {}
  },
  alReadyUploadImage:function() {//已上传照片,以及补充数据项
    let params = {processinstanceid: this.taskId};
    InsureService.alreadyUploadImage(params,(result) => {
        if(result.status == 'success'){
            
        }
    });
  },
  slectedFlag:function(e) { //不计免赔选择
    let param={};
    let inSuranceSchemeList  =this.data.inSuranceSchemeList;
    let idx = e.currentTarget.dataset.item.idx;
    let ele_name='inSuranceSchemeList['+idx+'].flag';
    param[ele_name] = inSuranceSchemeList[idx].flag = !(inSuranceSchemeList[idx].flag);//反转
    this.setData(param);
  },
  bindPickerChange:function(e){ //投保选择
    let idx = e.currentTarget.dataset.item.idx;
    let sIdx=e.detail.value;
    let insItem = this.data.inSuranceSchemeList[idx];
    insItem.cTypes.index = sIdx;
    this.dealSelectItem(insItem,sIdx);
    let inName='inSuranceSchemeList['+idx+'].cTypes.index';
    this.setData({[`${inName}`]:sIdx});
  },
  dealSelectItem (insItem, sIdx) { //险种选中-数据处理
    let configs = insItem.insuredConfig.value;
    insItem.selectedItem = insItem.insuredConfig.value[sIdx];
    insItem.coverage = insItem.selectedItem.value;
    insItem.unit = insItem.selectedItem.unit;
    insItem.selectedOption  = insItem.selectedItem.key;
    if(insItem.coverage&&insItem.coverage>0&&(insItem.coverage!='不投保')&&(insItem.coverage!='不代缴')){
      insItem.isSelect = true;
    } else{
      insItem.isSelect = false;
    }
    for(let k in configs){
      insItem.cTypes.array.push(configs[k].key);
    }
  },
  dealInConfig:function(schemeList) { //处理险种信息
    for(let t in schemeList){
      let insItem = schemeList[t];
      insItem.idx = t;
      if(insItem.insuredConfig&&insItem.insuredConfig.value) {
        let sIdx = 0;
        let match = false; //coverage与下拉列表匹配判断值
        let insureIndex = 0;
        for(let m =0; m<insItem.insuredConfig.value.length; m++) {
           if(insItem.insuredConfig.value[m].key == '投保'){ //标记投保选项的数组位置
            insureIndex = m;
           }
           if((insItem.insuredConfig.value[m].key == '投保' && insItem.coverage == '投保')
             ||(insItem.insuredConfig.value[m].key == '不投保' && insItem.coverage == '不投保')) { //投保-不投保 -选中
              sIdx = m;
              match =true;
           }  else if((insItem.coverage == insItem.insuredConfig.value[m].value)) { //具体值匹配选择
             sIdx = m;
             match =true;
           } 
        }
        if((!match)&&(insItem.coverage>0)) { //不匹配(具体值,投保) 而且 有金额数值 选择投保  (自燃险,涉水险除外)
          if((insItem.riskkindcode!='CombustionIns')&&(insItem.riskkindcode!='TheftIns')){
            sIdx = insureIndex;
          } else{  sIdx = 1; }
        }
        insItem.cTypes = {array:[],index:sIdx,objArray:insItem.insuredConfig.value}; 
        this.dealSelectItem(insItem,sIdx); 
      }
    }
  },
  filterSubmitData: function (inSuranceSchemeList) { //过滤提交的数据
    let result = { plankey: "dzrmx",processinstanceid: this.taskId,certNumber: '"440802198012040419"',
      certificateType: '0', remark: null,systartdate:'',jqstartdate:'',businessRisks:[],strongRisk:[]}
    let insItems = inSuranceSchemeList;
    for(let k in insItems) {
      let item = insItems[k];
      if((item.type=='0')&&item.isSelect){ //商业险
        let ele= {code: item.riskkindcode,coverage: item.coverage,flag: item.flag,name: item.riskkindname,
          selectedOption: item.selectedOption, type: item.type, unit: item.unit}
        result.businessRisks.push(ele);
      }
      else if((item.type=='2' || item.type=='3')&&(item.isSelect)){//交强险-车船税
        let ele= {code: item.riskkindcode,name:item.riskkindname,selected:item.selectedOption};
        result.strongRisk.push(ele);
      }
    }
   return result; 
  },
  nextStep: function () {
    let submitData = this.filterSubmitData(this.data.inSuranceSchemeList);
    util.loading.show();
    InsureService.insuredConfig(submitData,false).then((result) =>{
      if(result.status == 'success') {
       return InsureService.verificationInsuredConfig(submitData,false);
      }
    }).then((result)=>{
      if(result.status == 'success') {
        let params = {flag: '0', processinstanceid: this.taskId,"pids":[]};
       return  InsureService.workFlowStartQuote(params,false)
      }
    }).then((result) => {
      if(result.status == 'success') {
        util.loading.hide();
        wx.redirectTo({
          url: '../insure/insure-quote?taskId='+ this.taskId
        })
      }
    })
  },
  initschemeList(schemelist){
    let objArr = [];
    let k=0;
    for(let t in schemelist){
      objArr.push({id:k,name:schemelist[t],value:t});k++;
    }
    let pickerC= new Picker({objectArray:objArr,index:'0'});
    this.schemeListCom =  new PickerCom({id:'schemeList',data:pickerC});
    this.schemeListCom.open();
  },
  onLoad: function (options) {
    this.taskId = options.taskId;
    let rules = util.Store.getLocal('rules');
    let certKinds =rules.CertKinds||[]; 
    let certArr=[];
    for(let k in certKinds){
      certArr.push({id:certKinds[k].codeValue,name:certKinds[k].codeName});
     }
    this.certKindCom = new PickerCom({id:'certKindCom',data:new Picker({objectArray:certArr})});
    this.certKindCom.open();

   


    let params = {taskid: this.taskId};
    let schemeParams = {agentnotitype:0,processinstanceid: this.taskId};
    let insPrams = {processinstanceid: this.taskId,plankey:'snbxpz'};
    util.loading.show();
    InsureService.queryOtherPersonInfo(params,false).then((result) => {
      if(result.status == 'success'){
        this.data.queryPerson = result.body;
        this.setData({queryPerson:this.data.queryPerson}); 
        return  InsureService.schemeList(schemeParams,false);
      }
     }).then((result)=>{
      if(result.status == 'success'){
        if(result.body){
          this.schemelist = result.body;
          this.initschemeList(this.schemelist);
          return  InsureService.inSuranceScheme(insPrams,false);
        }
      }
     }).then((result) => {
          if(result.status == 'success'){
             this.dealInConfig(result.body);
             this.data.inSuranceSchemeList = result.body; 
             this.setData({inSuranceSchemeList: this.data.inSuranceSchemeList,visible: true});
             util.loading.hide();
          }
     });

  }
})
