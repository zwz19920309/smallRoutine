import util from '../../util/util';
import InsureService from '../../service/InsureService';
import {workflowNodes, workstateTable} from '../../util/code-table';
var app = getApp()
Page({
  data: {
    userInfo:null,
    keyLength: 0,
    multiquotelist:[]
  },
  checkIsNeedRefresh(multiquotelist) { //是否需要更新
     let need = false;
     let quoteinfolist = multiquotelist.quoteinfolist;//报价公司列表
     if(quoteinfolist&&quoteinfolist.length>0){
      for(let m in quoteinfolist){
        let priceObj = quoteinfolist[m];
        if (priceObj.quoteStatue < 9 || priceObj.quoteStatue == 32 || priceObj.quoteStatue == 31 || 
          (priceObj.quoteStatue >= 15 && priceObj.quoteStatue <= 18) || (priceObj.quoteStatue == 53) || 
          ((priceObj.quoteStatue == 51) && (this.refreshNum < 5))) { //我要人工报价-状态-刷新5次
          need = true;
          return need;
        }
      }
     }
     return need;
  },
  addStateNames(quoteInfo){//报价状态对应处理事件
    quoteInfo.codeNames =[];
    if(quoteInfo.quoteStatue){
      if(((1<=quoteInfo.quoteStatue)&&(quoteInfo.quoteStatue <= 4))||quoteInfo.quoteStatue== 31||quoteInfo.quoteStatue== 32||quoteInfo.quoteStatue== 53) {
        quoteInfo.isLoading = true;
      } else{
        quoteInfo.isLoading = false;
      }
      for(let m in workstateTable){
        let status = workstateTable[m].status;
        for(let code in status){
          if(quoteInfo.quoteStatue == status[code]){
              quoteInfo.codeNames.push({name:m,index:workstateTable[m].index,flag:false}); 
          }
        }
      }
      if(quoteInfo.codeNames&&quoteInfo.codeNames.length>0){
        quoteInfo.codeNames[quoteInfo.codeNames.length-1].flag = true;
      }
    }
  },
  addWorkName (multiquotelist) {//处理添加工作流状态名称
      let quoteinfolist = multiquotelist.quoteinfolist;//报价公司列表
      for (let n in quoteinfolist) {
        let quoteInfo = quoteinfolist[n];
        if(workflowNodes[quoteInfo.quoteStatue]) { //匹配状态名称
          quoteInfo.taskName = workflowNodes[quoteInfo.quoteStatue].name;
          quoteInfo.taskWebName = workflowNodes[quoteInfo.quoteStatue].webname;
          this.addStateNames(quoteInfo);//添加功能按钮名称
        }
      }
  },
  sortProviders (multiquotelist) { //供应商排序
    let quoteinfolist = multiquotelist.quoteinfolist;//报价公司列表
    if(quoteinfolist&&quoteinfolist.length>0){
     let loadingItem;   
     for(let m in quoteinfolist){
       let priceObj = quoteinfolist[m];
       if ((priceObj.quoteStatue < 9 || priceObj.quoteStatue == 32 || priceObj.quoteStatue == 31 || 
         (priceObj.quoteStatue >= 15 && priceObj.quoteStatue <= 18) || (priceObj.quoteStatue == 53) || 
         ((priceObj.quoteStatue == 51) && (this.refreshNum < 5)))&&(priceObj.quoteStatue != 7)&&(this.refreshNum < 10)) { //我要人工报价-状态-刷新5次
          loadingItem =  priceObj;
          quoteinfolist.splice(m,1);
          quoteinfolist.unshift(loadingItem);
       }
       
     }
    } 
  },
  pollingQuote() { //报价列表查询
    let that = this;
    let params = {"processInstanceId": this.taskId}
    let isLoading = this.refreshNum>0 ? false:true;
    InsureService.getMultiQuoteInfo(params,isLoading).then((result) => {
      if(result.status == 'success') {
        this.isNeedRefresh = result.body.needreflesh;
        this.refreshNum++;
        this.data.multiquotelist = result.body;
        this.addWorkName(this.data.multiquotelist);//处理添加工作流状态名称
        this.sortProviders(this.data.multiquotelist);//排序-报价中的在最上面
        this.setData({multiquotelist: this.data.multiquotelist}); 
        if(this.checkIsNeedRefresh(this.data.multiquotelist)){//检查是否需要刷新
            setTimeout(function() {
              that.pollingQuote();
            },5000)
         }
      }
     }); 
  },
  onLoad(options) {
     this.taskId = options.taskId; //任务号
     this.refreshNum = 0; //刷新次数
     this.pollingQuote(); 
  }
})