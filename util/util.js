/**
 * Created by Administrator on 2017/6/23.
 */
import Carouse from '../models/Carouse'
import Picker from '../models/Picker'
const Util={
    loading:{
        show: function(){
            wx.showLoading({title: '加载中'});
        },
        hide:function(){
            wx.hideLoading();
        }
    },
    Store:{
        setLocal:function(key,value){
            try {
                wx.setStorageSync(key,value)
            } catch (e) {
                console.log('localStore',e)
            }
        },
        getLocal:function(key){
            try {
                var value = wx.getStorageSync(key)
                if (value) {
                    return value;
                }
                return null;
            } catch (e) {
                console.log('localStore',e)
            }
        },
        clearStorageSync:function(){
            try {
                wx.clearStorageSync()
            } catch(e) {
                console.log('localStore',e)
            }
        }
    },
    ZzbStore:{
        setLocal:function(taskid,key,value){
          let _taskid=taskid+'-'+key;
          Util.Store.setLocal(_taskid,value);
        },
        getLocal:function(taskid,key){
          let _taskid=taskid+'-'+key;
          return Util.Store.getLocal(_taskid);
        }
    },
    Date: {
            Day:'day',
            Moth:'moth',
            Year:'year',
            parseDate:function(dateStr){
            return  new Date(dateStr.replace(/-/g,"/"));
            },
            calCulation:function(date,addDateNum,type){
                switch(type)
                {
                    case this.Day:
                        return new Date(date.getTime()+addDateNum*24*60*60*1000);
                        break;
                    case this.Moth:
                        return new Date(date.getTime()+addDateNum*24*60*60*1000);
                        break;
                    case this.Year:
                        date.setFullYear(date.getFullYear()+1);
                        return date;
                        break;
                    default:
                        return new Date(date.getTime()+addDateNum*24*60*60*1000);
                }
            },
            dateFormat:function(date,fmt){
                var o={
                    'M+':date.getMonth()+1,//月份
                    'd+':date.getDate(),//日
                    'h+':date.getHours(),//小时
                    'm+':date.getMinutes(),//分
                    's+':date.getSeconds(),//秒
                    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
                    'S':date.getMilliseconds() //毫秒
                }
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        },
    ValidDate:{
       /***
        *  return IOS版 1,Android版 2,网页版 3,微信版 4,渠道对接 5,其他 6
        */
       dataSourceFrom: function() {
           return '2';
       }
   },
   extendAll:function(target,source){
       for (var property in source) {
           target[property] = source[property];   // 利用动态语言的特性, 通过赋值动态添加属性与方法
       }
       return target;
   },
   avdHandle:{
     toObj:function(str){
         let res = str.replace('callback(','')
         res =res.substring(0,res.length-1);
         return  JSON.parse(res);
     },
     dataToCarousel(data){
        let carsousel=new Carouse();
        let sysInfo=Util.wx.getSystemInfoSync();
        carsousel.width=sysInfo.windowWidth;
        carsousel.height=(sysInfo.windowWidth*(data.height/data.width)).toFixed(0);
        for(let t in data.adwaresource){
            if(!!data.adwaresource[t]){
                var imgUrl={
                    link:data.adwaresource[t].images.proxyLink,
                    url:data.adwaresource[t].images.imagePath
                }
                carsousel.imgUrls.push(imgUrl);
            }
        }
        if(carsousel.imgUrls.length == 1) {
           carsousel.indicatorDots = false;
        }
        return carsousel;
     }
   },
   wx:{
       getSystemInfoSync:function(){
           try {
               var res = wx.getSystemInfoSync()
               return res;
           } catch (e) {
               // Do something when catch error
           }
       }
   },
    Tools:{
        /*
         * 判断 object 是否为空
         * */
        isEmptyObject(e){
            for(let t in e){
                return !1;
            }
            return !0;
        },
        /**
       * @id picker组件id
       * @pickerArr 下拉列表数组
       * @code_name 下拉列表值
       * @val_name  下拉列表名称
       * @n_id  or showChoose  默认选中的值 或者 默认是否显示
       * @showChoose  是否显示请选择 //默认不显示
       * */
       wxPickerHandle:function(id,pickerArr,code_name,val_name,n_id,showChoose){
           //初始化picker对象数据
           function fillPicker(picker,pickerArr){
               for(let t in pickerArr){
                   picker.array.push(pickerArr[t][val_name]);
                   picker.objectArray.push({id:pickerArr[t][code_name],name:pickerArr[t][val_name]});
               }
           }
           //初始化默认选定的值
           function initDefaultValue(picker,id){
               for(let t in picker.objectArray){
                   if(!!n_id&&(n_id==picker.objectArray[t].id)){
                       picker.index=t;
                       picker.value=picker.objectArray[t].id;
                   }
               }
           }
           let _picker=new Picker();
           _picker.id=id;
           if(typeof n_id =='boolean' && nid || showChoose){
               _picker.array.push('请选择');
               _picker.objectArray.push({id:'null',name:'请选择'});
           }
           //初始化picker对象数据
           fillPicker(_picker,pickerArr);
           //初始化默认选定的值
           if(typeof n_id !='boolean' && n_id){
               initDefaultValue(_picker,n_id);
           }
           return _picker;
       },
        wxPickerViewHandle:function(arrs){
            let result={array:[],value:[]};
            for(let t in arrs){
                let res=[];
                let _name=arrs[t].name;
                let _arr=arrs[t].arr;
                for(let n in _arr){
                    res.push(_arr[n][_name]);
                }
                result.array.push(res);
                result.value.push(0);
            }
           return result;
        },
       getPrvShortName:function(shortName){
           var provinceMapName={
               "北京市": "京",
               "天津市": "津",
               "河北省": "冀",
               "山西省": "晋",
               "内蒙古自治区": "蒙",
               "辽宁省": "辽",
               "吉林省": "吉",
               "黑龙江省": "黑",
               "上海市": "沪",
               "江苏省": "苏",
               "浙江省": "浙",
               "安徽省": "皖",
               "福建省": "闽",
               "江西省": "赣",
               "山东省": "鲁",
               "河南省": "豫",
               "湖北省": "鄂",
               "湖南省": "湘",
               "广东省": "粤",
               "广西壮族自治区": "桂",
               "海南省": "琼",
               "重庆市": "渝",
               "四川省": "川",
               "贵州省": "黔",
               "云南省": "云",
               "西藏自治区": "藏",
               "陕西省": "陕",
               "甘肃省": "甘",
               "青海省": "青",
               "宁夏回族自治区": "宁",
               "新疆维吾尔自治区": "新",
               "香港特别行政区": "港",
               "澳门特别行政区": "澳",
               "台湾省": "台"
           }
           return provinceMapName[shortName];
       },
       getPropsArray:function(pname,arr){
           let array=[];
           for(let t in arr ){
               array.push(arr[t][pname]);
           }
           return array;
       },
        uuid: function uuid(len, radix) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [], i;
            radix = radix || chars.length;
            if (len) {
                // Compact form
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
            } else {
                // rfc4122, version 4 form
                var r;
                // rfc4122 requires these characters
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';
                // Fill in random data. At i==19 set the high bits of clock sequence as
                // per rfc4122, sec. 4.1.5
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }
            return uuid.join('');
        }
    }

}

module.exports = Util;