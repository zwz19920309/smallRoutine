/**
 * Created by Administrator on 2017/6/26.
 */
/**
 * 轮播对象
 * @param{Object} options 配置项
 * @param{Boolean} options.autoplay 是否自动切换
 * @param{Boolean}  options.circular //是否采用衔接滑动
 * @param{Number}  options.interval ///自动切换时间间隔
 * @param{Number}  options.duration //滑动动画时长
 * @param{Array}  options.imgUrls //轮播图片列表
 * @param{Number}  options.width //轮播宽度
 * @param{Number}  options.height //轮播高度
 */

function  Carouse(options){
    this.options=options||{};
    this.id = this.options.id || 'carouse';
    this.indicatorDots=this.options.indicatorDots||true;//是否显示面板指示点
    this.autoplay=this.options.autoplay||true;//是否自动切换
    this.circular=this.options.circular||true;//是否采用衔接滑动
    this.interval=this.options.interval||3000;//自动切换时间间隔
    this.duration=this.options.duration||1000;//滑动动画时长
    this.imgUrls=this.options.imgUrls||[];//轮播图片列表
    this.width=this.options.width||300;
    this.height=this.options.height||150;
    if(this.imgUrls && this.imgUrls.length==1){
        this.indicatorDots = false;
    }
}

export default Carouse