import Component from '../component'


/**
 * 地址组件
 * @param{Object} options 配置项
 * @param{Boolean} options.provinces //省份
 * @param{Boolean}  options.citys //城市
 * @param{Boolean}  options.countys //县
 */

class AddressCom extends  Component{
    constructor(options={}){
        var opts={scope: `$wux.address`}
        super(opts);
    }

    close(){
        this.setHidden();
        console.log('close');
    }
    open(){
        this.setVisible();
        console.log('open');
    }
}

export default AddressCom