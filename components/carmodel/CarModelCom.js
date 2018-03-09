import Component from '../component'
import CarModel from '../../models/CarModel'
import Picker from '../../models/Picker';
import PickerCom from '../../components/picker/PickerCom';
import util from '../../util/util'

/**
 * 地址组件
 * @param{Object} options 配置项
 * @param{Object} options.data //参数数据
 * {"taskId":2395900,"modelCode":"奥迪FV7203TFCVTG轿车","displacement":1.984,"approvedLoad":5,"rulePriceProvideType":null,"institutionType":null,"useProperty":null,"tonnage":0,"wholeWeight":1615,"customPrice":null,"webpagekey":"1"}
 */

class CarModelCom extends  Component{
    constructor(options={}){
        var opts={scope: `$wux.carmodel`+ ('.'+options.id) || '.carmodel'}
        opts.data=options.data;
        super(opts);
        this.initDataList();
    }
    
    initDataList() {
        console.log('@CarModelCom-options: ');
        console.dir(this.options);
        let opts = this.options;
        let userProObjArr=[];
        let instiTypeArr=[];
        let rules = util.Store.getLocal('rules');
        console.log('rules: ');
        console.dir(rules);
        if(!opts.userProArr){
            userProObjArr =rules.UseProps; 
        }
        if(!opts.instiTypeArr){
            instiTypeArr =rules.userType; 
        }

        let userpArr = [];
        for(let n in userProObjArr){
            userpArr.push({id:userProObjArr[n].codeValue,name:userProObjArr[n].codeName});
        }





        //let picker= new Picker({objectArray:[{id:'0',name:'否'},{id:'1',name:'是'}]});
       // let p_opts = {id:'userProp',data:picker};
        //let userPropCom = new PickerCom(p_opts);
        //userPropCom.open();
        let pickerC= new Picker({objectArray:[{id:'0',name:'否'},{id:'1',name:'是'}]});
        let op = {id:'userPropCom',data:pickerC};
        let pcikerCom = new PickerCom(op);
        console.log('@userprop---pickerCom');
        console.dir(this);

    }
    close(){
        this.setHidden();
    }
    open(){
        this.setVisible();
    }
}

export default CarModelCom