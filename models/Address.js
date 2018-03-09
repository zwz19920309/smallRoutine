/**
 * Created by Administrator on 2017/6/28.
 */
/**
 * 地址对象
 * @param{Object} options 配置项
 * @param{Boolean} options.provinces //省份
 * @param{Boolean}  options.citys //城市
  * @param{Boolean}  options.countys //县
 */

function  Address(options){
    this.options=options||{};
    this.provinces= this.options.provinces||{};
    this.citys= this.options.citys||{};
    this.countys= this.options.countys||{};
}