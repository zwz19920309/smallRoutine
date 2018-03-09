import Component from '../component'
import Util from '../../util/util'
import DateModel from '../../models/DateModel'


/**
 * @param{Object} options 配置项
 * @param{String} options.start //日期开始时间
 * @param{String}  options.end //日期结束时间
 * @param{String}  options.time ///日期选择到的时间
 */
class DateCom extends  Component{
    constructor(options={}){
        let opts={scope: `$wux.date`+ ('.'+options.id) || '.date'};
        opts.data=new DateModel(options);
        super(opts);
    }
    changeDate(e){
        this.bindData('date',e);
    }
    getDate(){
        return this.getDataByKey('date');
    }
    close(){
        this.setHidden();
    }
    open(){
        this.setVisible();
    }
}


export default DateCom;