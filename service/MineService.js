
import HttpServer from '../http/HttpServer';
module.exports = {
    //我的订单
    getMyOrderList:function(params,loading){
       return HttpServer.pPost('/cm/mobile/basedata/myTask/getMyOrderList',params,loading);
    }
}