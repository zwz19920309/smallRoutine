
import util from '../../util/util';
import {workflowNodes} from '../../util/code-table';
import MineService from '../../service/MineService';

Page({
  data: {
    orderMenu:[],
    orderList:[],
    tabArr: {  
      curHdIndex: 3,   
    }, 
    isHasQuery:false,
    showMore: false
  },
  fetchData:function(){
    this.orderMenu=[
      {text: '待投保', index: '1'},
      {text: '待支付', index: '2'},
      {text: '全部', index: '3'}
    ]
    this.setData({
      orderMenu:this.orderMenu
    });
  },
  /** * tab切换*/
  tab: function(e) {
     var obj = {};
     obj.curHdIndex = e.currentTarget.id;
     this.setData({tabArr: obj});
     this.recover(obj.curHdIndex);
  },
  recover (index) { //数据复原
    this.data.isHasQuery = false;
    this.total = 0;
    this.currentPage = 0;
    this.data.orderList = [];
    this.orderstatus = index;
    this.data.showMore = false;
    this.setData({orderList: this.data.orderList,showMore:this.data.showMore,isHasQuery: false});
    this.loadData();
  },
  sortPrvComs (quoteInfoList) {//供应商报价排序
    let quote ;
    for(let n in quoteInfoList) {
      if(workflowNodes[quoteInfoList[n].taskcode]) { //匹配状态名称
        quoteInfoList[n].taskName=workflowNodes[quoteInfoList[n].taskcode].name;
        quoteInfoList[n].taskWebName=workflowNodes[quoteInfoList[n].taskcode].webname;
      }
      if(quoteInfoList[n].quoteamount&&quoteInfoList[n].quoteamount>0){
        quote = quoteInfoList[n];
        quoteInfoList.splice(n, 1);
        quoteInfoList.unshift(quote);
      }
    }
  },
  sortArrs (orderList) {
    for(let m in orderList) {
       this.sortPrvComs(orderList[m].quoteInfoList);
    }
  },
  selectItem:function (e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../insure/insure-quote?taskId=' + item.processInstanceId
    })
  },
  selectMore: function(e) { //更多
   let index = e.currentTarget.dataset.index;
   let item = e.currentTarget.dataset.item;
   item.showMore = !item.showMore;
   let sName='orderList['+index+'].showMore';
   this.setData({[`${sName}`]: item.showMore}); 
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
    this.loadData();
    console.log('loadData 下一页');
  },
  loadData () {
    if((this.data.orderList.length >= this.total) && (this.currentPage>1)) {
      return;
    }
    this.currentPage = this.currentPage||1;
    this.orderstatus = this.orderstatus||3;
    let offset = (this.currentPage-1) * 10;
    let params = {
      search:false,orderstatus:this.orderstatus,carlicenseno:'',
      insuredname:'',taskcreatetimeup:'',taskcreatetimedown:'',
      limit:10,offset:offset,agentnum:this.user.jobNum
    }
    MineService.getMyOrderList(params).then((result) => {
      if(result.status == 'success') {
        this.currentPage++;
        this.total = result.body.myorderinfo.totalnum;
        this.data.orderList = this.data.orderList.concat(result.body.myorderinfo.orderinfo.resultlist);
        if(this.total>0){
          this.data.showMore =  true;
          this.setData({showMore:this.data.showMore});
        } else {
          this.data.showMore =  false;
          this.setData({showMore:this.data.showMore});
        }
        if(this.data.orderList.length>=this.total){
          this.data.showMore =  false;
          this.setData({showMore:this.data.showMore});
        }
        this.sortArrs(this.data.orderList);
        this.setData({orderList: this.data.orderList,isHasQuery:true});
      }
  });
  },
  onLoad: function () {
    this.fetchData();
    this.user=util.Store.getLocal('zzbUser');
    this.loadData();
  }
})
