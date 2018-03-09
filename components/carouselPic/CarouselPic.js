import Component from '../component'
import Carouse from '../../models/Carouse'
import Util from '../../util/util'


/**
* @param{Object} options 配置项
* @param{Boolean} options.autoplay 是否自动切换
* @param{Boolean}  options.circular //是否采用衔接滑动
* @param{Number}  options.interval ///自动切换时间间隔
* @param{Number}  options.duration //滑动动画时长
* @param{Array}  options.imgUrls //轮播图片列表
* @param{Number}  options.width //轮播宽度
* @param{Number}  options.height //轮播高度
* @param{Boolean} options.indicator 是否自动切换
*/
class CarouselPic extends  Component{
    constructor(options={}){
        var opts={scope: `$wux.carousel`+ ('.'+options.id) || '.carousel'}
        opts.data=Util.extendAll(new Carouse(),options);
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

export default CarouselPic