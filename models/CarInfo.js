/**
 * Created by Administrator on 2017/6/29.
 */
/**
 * 车辆信息
 * */
function CarInfo(data){
    this.setData(data);
}
CarInfo.prototype={
    constructor:CarInfo,
    transferCarArr:[{id:'0',name:'否'},{id:'1',name:'是'}],
    rulepriceprovidetype:[],
    UserType:[{id:'0',name:'个人用车'},{id:'1',name:'企业用车'},{id:'2',name:'机关团队用车'}],
    UseProps:[{id:'1',name:'家庭自用汽车'},{id:'2',name:'出租租赁营业客车'},{id:'3',name:'城市公交营业客车'},{id:'4',name:'公路客运营业客车'},{id:'5',name:'旅游营业客车'},
        {id:'6',name:'营业货车'},{id:'10',name:'企业非营业客车'},{id:'11',name:'机关非营业客车'}, {id:'12',name:'非营业货车'},{id:'15',name:'营业特种车'}, {id:'16',name:'非营业特种车'}],
    setData: function(data){
        var data=data||{};


        this.isNew=data.isNew||false;//是否未上牌- 当isNew=Y，新车发票价必传
        this.fileid=data.fileid||'';//fileid ???
        this.firstRegisterDate=data.firstRegisterDate?data.firstRegisterDate.split(' ')[0]:'';//车辆初登日期

        this.modelCode=data.modelCode||data.cifstandardname||'';//车型名称
        this.vin=data.vin||'';//车架号
        this.engineNo=data.engineNo||'';//发动机号
        this.tempEngineNo=data.tempEngineNo||'';//隐藏发动机号
        this.tempVin=this.tempVin||'';//隐藏车架号

        this.customPrice=data.customPrice||'';//车辆价格
        this.webpagekey=data.webpagekey||'0';

        this.chgOwnerFlag=data.chgOwnerFlag||'0';//是否过户车,0-非,1-是
        this.chgOwnerDate=data.chgOwnerDate||'';//过户日期
        this.cifstandardname||data.cifstandardname;
        this.drivinglicense=data.drivinglicense||'';//行驶证驾照图片路径


        this.displacement=data.displacement;//排气量
        this.wholeWeight=data.wholeWeight||'';//整备质量
        this.approvedLoad=data.approvedLoad||'';//核定载人数

        this.rulePriceProvideType=data.rulePriceProvideType;//车价选择,0-最低价，1-指定价格
        this.institutionType=data.institutionType;//车辆所属性质-默认--0-家庭自用汽车
        this.useProperty=data.useProperty;//车辆使用性质-默认--0-个人用车

        this.vehicleId=data.vehicleId||'';//车型id
        this.drivingArea=data.drivingArea||'';//行驶区域


    }
}


export default CarInfo