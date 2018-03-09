/**
 * Created by Administrator on 2017/6/29.
 */
/**
 * 人物对象
 * */
function Person(data){
    var data=data||{};
    this.name=data.name||'';
    this.idcardType=data.idcardType||'0';//默认身份证
    this.idcardNo=data.idcardNo||'';
    this.phone=data.phone||'';
}
Person.prototype.certificateTypeArr=[{id:'0',name:'身份证'},{id:'1',name:'户口本'},{id:'2',name:'驾照'},{id:'3',name:'军官证/士兵'},{id:'4',name:'护照'},
    {id:'5',name:'港澳回乡证'},{id:'6',name:'组织代码证'},{id:'7',name:'其他证件'},{id:'8',name:'社会信用代码证'},{id:'9',name:'税务登记证'},{id:'10',name:'营业执照'}];


export default Person