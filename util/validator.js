
const validator= {
    required: function required(value) { // 非空
        var result = false;
        if (!!value || value === 0) {
            if (value instanceof Array) {
                if (value.length > 0) {
                    result = true;
                } else {
                    for (var ind = 0; ind < value.length; ind++) {
                        if (!!value[ind]) {
                            result = true;
                        }
                    }
                }
            } else if (typeof value == 'object') {
                for (var key in value) {
                    if (value.hasOwnProperty(key) && !!value[key]) {
                        result = true;
                    }
                }
            } else {
                result = true;
            }
        }
        return result;
    },
    plateNumber: function(value) { //车牌
        //车牌号录入规则校验：不能有空格，且字母和数字加起来不能少于5位，且车牌号最多两个中文字
        // 一、车牌号校验规则
        // 1.常规车牌号：仅允许以汉字开头，后面可录入六个字符，由大写英文字母和阿拉伯数字组成。如：粤B12345；
        // 2.武警车牌：允许前两位为大写英文字母，后面可录入五个或六个字符，由大写英文字母和阿拉伯数字组成，其中第三位可录汉字也可录大写英文字母及阿拉伯数字，第三位也可空，如：WJ警00081、WJ京1234J、WJ1234X。
        // 3.最后一个为汉字的车牌：允许以汉字开头，后面可录入六个字符，前五位字符，由大写英文字母和阿拉伯数字组成，而最后一个字符为汉字，汉字包括“挂”、“学”、“警”、“军”、“港”、“澳”。如：粤Z1234港。
        // 4.新军车牌：以两位为大写英文字母开头，后面以5位阿拉伯数字组成。如：BA12345。
        let express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1,2}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳电绿]{1}$/;
        if (express.test(value)) {
            return true;
        }
        return false;
    },
    IOQ:function(value){
        if ((value.indexOf('I'))>=0||(value.indexOf('i'))>=0||(value.indexOf('Q'))>=0
            ||(value.indexOf('q'))>=0||(value.indexOf('O'))>=0||(value.indexOf('o'))>=0) {
           return true;
        } 
        return false;
    },
    vin: function(value) { //车架号 - vin码
        let vinRegex = /^[A-Za-z0-9\*]{1,17}$/;
        if (vinRegex.test(value)) {
            return true;
        }
        return false;
    },
    engno:function(value) { //发动机号
        let regex = /[A-Za-z0-9_-]|[*]]/;
        if(regex.test(value)) {
           return true;
        }
        return false;
    },
    hasChinese: function(data, msg) {
        var regex = /.*[\u4e00-\u9fa5]+.*$/
        if (regex.test(data)) {
            return true;
        }
        return false;
    },
    checkDate: function(value) { //日期
        function isValidDate(date) {
            if(this.hasChinese(date)){
                return false;
            }
            let dateArr = date.split('-');
            let Year = dateArr[0],
                Month = dateArr[1],
                Day = dateArr[2];
            if (isNaN(Year) || isNaN(Year) || isNaN(Year)) return false;
            if (Month > 12 || Month < 1) return false;
            if (Day < 1 || Day > 31) return false;
            if ((Month == 4 || Month == 6 || Month == 9 || Month == 11) && (Day > 30)) return false;
            if (Month == 2) {
                if (Day > 29) return false;
                if ((((Year % 100 == 0) && (Year % 400 != 0)) || (Year % 4 != 0)) && (Day > 28)) return false;
            }
            return true;
        }
        let result = (new Date(date).getDate() == date.substring(date.length - 2));
        if (result) {
            return isValidDate(date);
        }
        return false;
    }
}

module.exports = validator;