/**
 * Created by Administrator on 2017/7/6.
 */
import Component from '../component'
/**
 * @param{Object} options 配置项
 * @param{id} options.id //组件id
 */
class ToastCom extends  Component{
    constructor(options={}){
        let id=options.id;
        let opts={scope: `$wux.toast.${id}`};
        opts.data=options.data;
        super(opts);
    }
    show (content) { //显示3秒钟
      let that = this;
      this.setDataValue('content',content);
      this.setVisible();
      setTimeout(function(){
          that.setHidden();
      },3000);
    }
    close() {
        this.setHidden();
    }
    open() {
        this.setVisible();
    }
}

export default ToastCom;