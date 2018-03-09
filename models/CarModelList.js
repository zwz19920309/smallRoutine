/**
 * Created by Administrator on 2017/6/30.
 */
import CarModel from './CarModel';
function CarModelList(options){
     function _init(options){
         var _carModelList=[];
         for(let t in options){
             _carModelList.push(new CarModel(options[t]));
         }
         return _carModelList;
     }
    this.options=options||{};
    this.dataList=_init(this.options);
}
export default CarModelList