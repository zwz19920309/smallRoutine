/**
 * Created by Administrator on 2017/7/6.
 */
import Component from '../component'
import Util from '../../util/util'
/**
 * @param{Object} options 配置项
 * @param{String} options.id  //组件id
 * @param{String}  options.array //日期结束时间
 * @param{String}  options.codeName ///日期选择到的时间
 */
class PikerViewCom extends  Component{
    constructor(options={}){
        let id=options.id;
        let opts={scope: `$wux.pickerview.${id}`};
        opts.data=options.data;
        super(opts);
    }

    close(){
        this.setHidden();
    }
    sure(){
        this.setHidden();
    }
    open(){
        this.setVisible();
    }
}


export default PikerViewCom;