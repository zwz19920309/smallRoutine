import Component from '../component'
/**
 * @param{Object} options 配置项
 * @param{String} options.id //组件id
 * @param{object}  options.carmodel //车型对象
 * options.carmodel{approvedLoad:0,customPrice:null,displacement:0,institutionType:null,modelCode:null,processinstanceid:null,
 * rulePriceProvideType:null,tonnage:null,useProperty:null,webpagekey:null,wholeWeight:1615}
 */
class CarSearch extends  Component{
    constructor(options={}){
        let opts={scope: `$wux.carSearch`+ ('.'+options.id) || '.carSearch'};
        opts.data=options.carModel;
        console.log('@CarSearch-opts: ');
        console.dir(opts);
        super(opts);
        this.initDataList();
    }
    initDataList(){
       this.setDataValue('dataList',this.options.data.carList);
    }
    close(){
        this.setHidden();
    }
    open(){
        this.setVisible();
    }
}


export default CarSearch;