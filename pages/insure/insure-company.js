import util from '../../util/util';
import InsureService from '../../service/InsureService';
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo:null,
    traProviders:[]
  },
  insureType: function () {
    wx.navigateTo({
      url: '../insure/insure-types?taskId='+this.taskId
    })
  },
  dealSubData: function(prvs) {
    let result= {
        processinstanceid:this.taskId,
        aotohandCount:0,//人工报价公司数量
        lastyearsupplier:this.data.lastyearsupplier||'',//上年投保保险公司名称
        cloudstate:false,
        webpagekey: '2',
        paramsList: [],
      }
    for(let t =0;t<prvs.length;t++){
        if(prvs[t].showSite){
            var pSId = prvs[t].agreementid + '#' + prvs[t].comcode + '#'
                + prvs[t].mgmidivisioncode + '#01';
            if(prvs[t].aotohand=='1'){
                result.aotohandCount++;
            }
            result.paramsList.push(pSId);
        }
    }
    return result;
  },
  bindPickerChange:function(e){
    let  sId=e.detail.value;
    let  eId=e.currentTarget.id;
    let  traProviders=this.data.traProviders;
    this.data.traProviders[eId].selectedNet=this.data.traProviders[eId].branchProBeans[0].singleSiteBeans[sId];
    let _name='traProviders['+eId+'].idx';
    this.setData({[`${_name}`]:e.detail.value});
  },
  selectProvider: function(e) {
    let param={};
    var traProviders = this.data.traProviders;
    let ele_name='traProviders['+e.currentTarget.id+'].showSite';
    param[ele_name] = traProviders[e.currentTarget.id].showSite = !(traProviders[e.currentTarget.id].showSite);//反转
    this.setData(param);
  },
  nextStep: function () {
    let params = this.dealSubData(this.data.traProviders);
    InsureService.choiceProviders(params).then((result) =>{
        if(result.status=='success') {
            wx.redirectTo({
                url: '../insure/insure-types?taskId='+this.taskId
            })
        }
    });
  },
  onLoad: function (options) {
     //供应商数据处理
     function dealProviders(providers){
        for(let t in  providers){
            let prv=providers[t];
            prv.netNames=[];
            prv.idx=0;
            prv.showSite=false;
            prv.selected = false;
            if(prv.isflag){
                prv.showSite=true;
                //this.data.prvshotname=_provider.prvshotname;
                //this.data.count+=1;
            }
            for(let m in prv.branchProBeans){
                let bran=prv.branchProBeans[m];
                if(bran.selected){//准备入参数据;协议；供应商ID
                    prv.agreementid=bran.agreementid;
                    prv.comcode=bran.comcode;
                }
                for(let n in bran.singleSiteBeans ){
                    if(bran.singleSiteBeans[n].selected){////准备入参数据,网点
                        prv.mgmidivisionname = bran.singleSiteBeans[n].siteShortName;//出单网点名称
                        prv.mgmidivisioncode = bran.singleSiteBeans[n].siteId;//出单网点code
                    }
                    prv.netNames.push(prv.branchProBeans[m].singleSiteBeans[n].siteShortName);//pickerArray
                }
            }
        }
    }

    this.taskId = options.taskId;  
    let user=util.Store.getLocal('zzbUser');
    let params= {
        agentid: user.agentId,
        channel: "",
        city: user.city,
        inspect: 1,
        processinstanceid: this.taskId,
        province: user.province
     }
     InsureService.searchProvider(params).then((result) =>{
        if(result.status=='success'){
            let prvs=result.body;
            //传统
            let tPrvs=prvs.filter(function(item){
              return  (!!item.channeltype)&&(item.channeltype=='01');
            });
            //网销
            let nPrvs=prvs.filter(function(item){
                return  (!!item.channeltype)&&(item.channeltype=='02');
            });
            if(!util.Tools.isEmptyObject(tPrvs)){
                dealProviders(tPrvs);
            }
            if(!util.Tools.isEmptyObject(nPrvs)){
                dealProviders(nPrvs);
            }
            this.data.lastyearsupplier=result.extend.lastyearsupplier||result.extend.suppliername;
            this.data.traProviders = tPrvs;
            this.setData({traProviders:tPrvs});
        }
    });
  }
})
