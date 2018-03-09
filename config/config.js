/**
 * Created by Administrator on 2017/6/23.
 */
module.exports = {
    project: {
        name: '掌中保'
    },
    app: {
        name: '掌中保系统',
        client: '掌中保',
        version: '1.1.12',
        lan: 'zh-cn',
        debug: false
    },
    data: {
        method: 'urls', //files:urls
        home: ''
    },
    backend: {
        ip: 'https://m.uat.52zzb.com',//准生产,
        //ip: 'https://morg.52zzb.com'//测试
    },
    pagination: {
        pagesize: 5,
        pageoffset: 1
    },
    rtcode: {
        success: 'success',
        fail: 'fail'
    }
}
