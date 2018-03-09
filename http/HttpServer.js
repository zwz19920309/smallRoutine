/**
 * Created by Administrator on 2017/6/23.
 */
import config from '../config/config';
import http from 'HttpClient';
import util from '../util/util';

function getHeader() {
    let zzbUser=util.Store.getLocal('zzbUser');
    let localHeader={token:(!!zzbUser?zzbUser.token:''),userid:(!!zzbUser?zzbUser.agentId:''), 'content-type': 'application/json;charset=UTF-8','Accept':'application/json, text/plain, */*'};
    let  header=localHeader.token?localHeader:{};
    return header;
}

function pGET(url,params,loading){
     url=config.backend.ip+url;
     let header = getHeader();
     return  http.PromiseGET(url,params,header,loading);
}
function pPOST(url,params,loading){
    url=config.backend.ip+url;
    let header = getHeader();
    return http.PromisePOST(url,params,header,loading);
}
/* 定义接口*/
module.exports = {
    pGet:pGET,
    pPost:pPOST
}
