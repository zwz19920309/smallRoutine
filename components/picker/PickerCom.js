/**
 * Created by Administrator on 2017/7/6.
 */
import Component from '../component'
import Picker from '../../models/Picker'
import Util from '../../util/util'


/**
 * @param{Object} options 配置项
 * @param{id} options.id //组件id
 * @param{Object}  options.data //组件数组
 * options.data {array:['一','二'，'三'],objectArray:[{id:'0',value:'一'},{id:'1',value:'二'}，{id:'3',value:'三'}],index:0,value}
 */
class PikerCom extends  Component{
    constructor(options={}){
        let id=options.id;
        let opts={scope: `$wux.picker.${id}`};
        opts.data=options.data;
        super(opts);
    }

    bindPickerChange(e) {
        let _index= e.detail.value;
        let _selectedObj=this.getDataByKey('objectArray')[_index];
        this.bindData('index',e);
        this.setDataValue('value',_selectedObj.id);
    }

    getPickerValue(){
      return  this.getDataByKey('value');
    }

    close(){
        this.setHidden();
    }
    open(){
        this.setVisible();
    }
}


export default PikerCom;