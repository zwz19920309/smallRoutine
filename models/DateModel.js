/*定义日期*/
/**
 * @param{Object} options 配置项
 * @param{String} options.start //日期开始时间
 * @param{String}  options.end //日期结束时间
 * @param{String}  options.date ///日期选择到的时间
 */
class DateModel {
    constructor(options={}) {
      Object.assign(this,options);
      this.start = this.start ? this.start : '2000-01-01';
      this.end = this.end ? this.end : '2030-12-31';
      this.date = this.date ? this.date : this.start;
    }
  }
  
  export default DateModel