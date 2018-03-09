/**
 * Created by Administrator on 2017/6/26.
 */
/**
 * 模块化组件
 * @param{Object} options 配置项
 * @param{String} options.scope 组件的命名空间
 * @param{Object}  options.data 组件的动态数据
 * @param{Object}  options.methods 组件的动态数据
 */

class Component{

    constructor(options={}) {
        Object.assign(this,{options});
        this.__init();
    }
    /**
     * 初始化
     * */
    __init() {
        this.page=getCurrentPages()[getCurrentPages().length-1];
        this.setData=this.page.setData.bind(this.page);
        this.__initStatus();
    }
    /**
     * 初始化组价状态
     * */
    __initStatus() {
       this.options.data&&this.__initData();
       this.__initNowMethods();
    }
    /**
    * 初始化组价动态数据
    * */
    __initData() {
        const scope=this.options.scope;
        const data=this.options.data;
        this._data={};
        if(!this.__isEmptyObject(data)){
            for(let key in data) {
                if (data.hasOwnProperty(key)) {
                    if (typeof data[key] === 'function') {
                       data[key]=data[key].bind(this);
                    }
                    else {
                        this._data[key] = data[key];
                    }
                }
            }
        }
        this.page.setData({
            [`${scope}`]:this._data
        });
    }
    /**
    * 初始化组件事件绑定
    * */
    __initMethods(__methods){
        const scope=this.options.scope;
        const methods=__methods||this.options.methods;
        this.methods={};
        if(!this.__isEmptyObject(methods)){
            for(let key in methods) {
                if (methods.hasOwnProperty(key) && (typeof methods[key] === 'function')) {
                    this[key]=methods[key]=methods[key].bind(this);
                    //将methods内的方法重命名并挂在到 page 上面 ,否则 tempplate 内找不到事件
                    this.page[`${scope}.${key}`]=methods[key];
                    //将方法名同步至 page.data 上面,方便在模板内使用{{ method }} 方式绑定事件
                     this.setData({[`${scope}.${key}`]:`${scope}.${key}`});
                }
            }
        }
    }
    /*
    * 判断 object 是否为空
    * */
    __isEmptyObject(e){
        for(let t in e){
            return !1;
        }
        return !0;
    }

    /**
     * 初始化子类组件具体事件绑定
     * */
    __initNowMethods(){
        let  methods={};
        let  childProprties=Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        if(!this.__isEmptyObject(childProprties)){
            for(let t in childProprties){
                if(!(childProprties[t]=='constructor')&&typeof this[childProprties[t]] === 'function'){
                    methods[childProprties[t]]=this[childProprties[t]];
                }
            }
        }
        this.__initMethods(methods);
    }

    /**
     * 获取组件的 data 数据
     */
    getComponentData() {
        let data = this.page.data
        let name = this.options.scope && this.options.scope.split(`.`)
        name.forEach((n, i) => {
            data = data[n]
        })
        return data
    }


    getDataByKey(key){
        let data=this.getComponentData();
        let _value;
        for(let t in data){
            if(key==t){
                _value= data[t]
            }
        }
        return _value;
    }

    /**
     * 数据绑定
     */
    bindData(name,e){
        this.setData({
            [`${this.options.scope}.${name}`]: e.detail.value
        })
    }

    setDataValue(name,value){
      this.setData({
        [`${this.options.scope}.${name}`]: value
      })
    }

    /**
     * 设置元素显示
     */
    setVisible(className = `weui-animate-fade-in`) {
        this.setData({
            [`${this.options.scope}.animateCss`]: className,
            [`${this.options.scope}.visible`]: !0,
        })
    }
    /**
     * 设置元素隐藏
     */
    setHidden(className = `weui-animate-fade-out`, timer = 300) {
        this.setData({
            [`${this.options.scope}.animateCss`]: className,
        })
        setTimeout(() => {
            this.setData({
                [`${this.options.scope}.visible`]: !1,
            })
        }, timer)
    }
}

export default Component