const workflowNodes = {
    "1": { name: '信息录入', webname: '正在自动报价' }, //报价中-正在自动报价
    "2": { name: '报价', webname: '正在自动报价' },
    "3": { name: 'EDI报价', webname: '正在自动报价' },
    "4": { name: '精灵报价', webname: '正在自动报价' },
    "6": { name: '人工调整', webname: '正在人工报价' }, //报价中-正在人工报价
    "7": { name: '人工规则报价', webname: '正在人工报价' }, //报价中-正在人工报价
    "8": { name: '人工报价', webname: '正在人工报价' }, //报价中-正在人工报价
    "13": { name: '报价退回', webname: '报价退回修改' }, //退回修改-报价退回修改
    "14": { name: '选择投保', webname: '获取报价成功' }, //报价成功-获取报价成功
    "15": { name: '快速续保', webname: '报价中' },
    "16": { name: 'EDI核保', webname: '核保中' },
    "17": { name: '精灵核保', webname: '核保中' },
    "18": { name: '人工核保', webname: '核保中' },
    "19": { name: '核保退回', webname: '核保退回修改' },
    "20": { name: '支付', webname: '马上支付' }, //核保成功-马上支付
    "21": { name: '二次支付确认', webname: '待承保打单' },
    "23": { name: '打单', webname: '完成' },
    "24": { name: '配送', webname: '完成' },
    "25": { name: 'EDI承保', webname: '支付成功' },
    "26": { name: '精灵承保', webname: '支付成功' },
    "27": { name: '人工承保', webname: '支付成功' },
    "28": { name: '承保退回 ', webname: '承保退回修改' },
    "29": { name: '完成', webname: '完成' },
    "30": { name: '关闭', webname: '该报价已关闭' }, //拒绝承保-报价已关闭
    "31": { name: '人工回写 ', webname: '报价中' },
    "32": { name: '规则报价', webname: '报价中' },
    "33": { name: '结束', webname: '结束' },
    "34": { name: '放弃', webname: '该报价已取消' }, //取消投保-报价已关闭
    "36": { name: '暂停支付', webname: '暂停支付' },
    "37": { name: '放弃', webname: '该报价已关闭' }, //取消投保-报价已关闭
    "51": { name: '承保政策限制', webname: '承保政策限制' },
    "52": { name: '我要人工报价', webname: '等待报价请求' },
    "53": { name: '平台查询', webname: '报价中' },
    "100": { name: '取消报价', webname: '取消报价' },
    '201': { name: '柜台支付', webname: '请到柜台支付' },
    '40': { name: 'EDI自动核保', webname: '核保中' },
    '41': { name: '精灵自动核保', webname: '核保中' },
    '38': { name: '轮询', webname: '核保中' }
  };

  const workstateTable = {
    '配送信息': {status:[16,17,18,19,33],index:0},
    '网点地址': {status:[23,24,29,33],index:5},
    '报价明细': {status:[19],index:10},
    '价格明细': {status:[14,16,17,18,20,21,25,26,27,28,38,40,41],index:15},
    '修改配置': {status:[14],index:20},   
    '查看保单': {status:[23,24,29,33],index:25},
    '订单详情': {status:[21,25,27],index:30},
    '修改投保信息':{status:[13,19,28],index:35},
    '修改保险配置': {status:[13,51],idnex:40},
    '查看承保政策': {status:[51],index:45},
    '我要人工报价': {status:[52],index:50},
    '取消人工报价': {status:[6,7,8],index:55},
    '投保功能已关闭': {status:[19],index:60},
    '请到柜台支付': {status:[201], index:65}, 
    '马上投保': {status:[14],index:70}
  }

  const prvCodesMap = {
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

  export {workflowNodes, workstateTable, prvCodesMap};