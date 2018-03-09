/**
 * Created by Administrator on 2017/6/30.
 */
function CarModel(options){
     var options=options||{};
     this.processinstanceid=options.processinstanceid||null;
     this.taxPrice=options.processinstanceid||0;
     this.aliasname=options.aliasname||'';
     this.analogyprice=options.analogyprice||0;
     this.analogytaxprice=options.analogytaxprice||0;
     this.brandname=options.brandname||'';
     this.displacement=options.displacement||0;
     this.familyname=options.familyname||'';
     this.fullweight=options.fullweight||0;
     this.gearbox=options.gearbox||'';
     this.loads=options.loads||0;
     this.listedyear=options.listedyear||'';
     this.price=options.price||0;
     this.seat=options.seat||0;
     this.standardname=options.standardname||'';
     this.carVehicleOrigin=options.carVehicleOrigin||'';
     this.jgVehicleType=options.jgVehicleType||'';
     this.vehicleid=options.vehicleid||'';
     this.syvehicletypename=options.syvehicletypename||'';
     this.syvehicletypecode=options.syvehicletypecode||'';
}
export default CarModel