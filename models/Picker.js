
/**
 * Created by Administrator on 2017/7/6.
 */
function Picker(options){
    this.array=options.array||[];
    this.objectArray=options.objectArray||[];
    this.index=options.index||0;
    this.value=options.value||'';
    for(let  i=0;i<this.objectArray.length;i++){
        this.array.push(this.objectArray[i].name);
    }
}
export default Picker