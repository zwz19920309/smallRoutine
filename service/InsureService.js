/**
 * Created by Administrator on 2017/6/23.
 */
/**
 * 投保流程接口
 */
import Uitl from '../util/util';
import HttpServer from '../http/HttpServer';


module.exports = {
    //用户登录
    userLogin:function(params,loading){
        return  HttpServer.pPost('/cm/mobile/login/login',params,loading);
    },
    //车险报价
    quotestart: function(params,loading){
        params.datasourcesfrom = Uitl.ValidDate.dataSourceFrom();
        return HttpServer.pPost('/cm/mobile/insured/quote/create', params,loading);
    },
    //保存流程数据
    callInsureInfo:function(params,loading){
        return  HttpServer.pPost('/cm/mobile/insured/quote/callInsureInfo', params,loading);
    },
    getToBeInsuredNum : function(params,loading){
        return  HttpServer.pPost("/cm/mobile/insured/homepage/getTobePolicyNum",params,loading);
    },
    getAgentRegion:function(params,loading){
        return HttpServer.pPost("/cm/mobile/basedata/my/generalSetting/getAllProvince",params,loading);
    },
     //获取车型信息
    carModels: function(params,loading){
        return HttpServer.pGet('/cm/mobile/insured/quote/findinitwebpage', params,loading);
    },
    //车型搜索
    searchCarModel:function(params,loading){
        return  HttpServer.pPost("/cm/mobile/insured/quote/searchcarmodelvin",params,loading);
    },
    //暂存车辆信息
    selectCarModel:function(params,loading){
        return  HttpServer.pPost("/cm/mobile/insured/quote/selectcarmodel",params,loading);
    },
    //车型确认
    modelConfirm: function(params,loading){
        return  HttpServer.pPost("/cm/mobile/insured/quote/carmodelinfo",params,loading);
    },
    //保存车辆信息
    saveCarInfo:function(params,loading){
        return HttpServer.pPost("/mobile/insured/quote/savecarinfo",params,loading);
    },
    //保险配置
    insuredConfig:function(params,loading){
        return  HttpServer.pPost("/cm/mobile/insured/quote/insuredconfig",params,loading);
    },
    //保险配置校验
    verificationInsuredConfig:function(params,loading){
        return  HttpServer.pPost("/cm/mobile/insured/quote/verificationinsuredconfig",params,loading);
    },
    //推工作流
    workFlowStartQuote: function (params,loading){
        return  HttpServer.pPost("/cm/mobile/insured/quote/workflowstartquote",params,loading);
    },
    //报价刷新
    getMultiQuoteInfo: function (params,loading){
        return HttpServer.pPost("/cm/mobile/basedata/myTask/getMultiQuoteInfo",params,loading);
    },
    //车辆性质-所属性质
    initcodetypes:function(params,loading){
        params={types:'rulepriceprovidetype,UserType,UseProps,CertKinds'};
        return  HttpServer.pGet("/cm/mobile/basedata/initcodetypes",params,loading);
    },
    //保存车辆信息
    saveCarInfo:function(params,loading){
        return  HttpServer.pPost("/cm/mobile/insured/quote/savecarinfo",params,loading);
    },
    //供应商查询
    searchProvider:function(params,loading){
        return  HttpServer.pPost("/cm/mobile/insured/quote/searchprovider",params,loading);
    },
    //选择保险公司
    choiceProviders:function(params,loading){
        return  HttpServer.pPost("/cm/mobile/insured/quote/choiceproviderids",params,loading);
    },
    //查询投保人，被保人信息
    queryOtherPersonInfo:function(params,loading){
        return  HttpServer.pGet("/cm/mobile/insured/quote/queryOtherPersonInfo",params,loading);
    },
    //查询上年投保信息
    schemeList:function(params,loading){
        return HttpServer.pGet("/cm/mobile/insured/quote/schemelist",params,loading);
    },
    //查询已上传影像
    alreadyUploadImage:function(params,loading){
        return  HttpServer.pGet("/cm/mobile/insured/quote/alreadyuploadimage",params,loading);
    },
    //查询险种类型
    inSuranceScheme:function(params,loading){
        return  HttpServer.pGet("/cm/mobile/insured/quote/insurancescheme",params,loading);
    },
    advs:function(params,loading){
        params.callback='callback';
        return  HttpServer.pGet("/ads/adwarelocation/getadwarelocation",params,loading);
    }
};