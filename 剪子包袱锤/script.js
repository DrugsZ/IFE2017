class Mora {
    constructor() {
        this.personSelect = query('.person-show-space');
        this.pcSelect = query('.pc-show-space');
        this.personData = 'scissors';
        this.pcData = 'scissors';
        this.init()
    }
    init(){
        //数据与DOM绑定
        this.compile('pcData',query('select'),this.pcData)
        let self = this
        //设置数据观察
        this.watch(this,'pcData',this.pcData,[
            function(newVal,val){
                self.setData(newVal,val)
            }
        ])
    }
    /**
     * 
     * @param {string} str 修改值  rock paper scissors
     * @param {*} mode 修改类型,默认为pc
     */
    setData(newVal,val,mode){
        mode = mode === 'person' ? 'personSelect' : 'pcSelect';

        this[mode].classList.remove(val);
        this[mode].classList.add(newVal);
    }
    /**
     * 
     * @param {string} key
     * @param {Object} el 绑定DOM对象
     * @param {*} value 初始值
     */
    compile(key,el,value){
        let self = this
        el.addEventListener('input',e => {
            self[key] = e.target.value;
        })
        Object.defineProperty(this,key,{
            configurable:true,
            enumerable:true,
            get:function proxyGetter(){
                return value
            },
            set:function proxySetter(val){
                value = val;
                el.value = val;
                // console.log(val)
            }
        })
    }
    /**
     * 
     * @param {Object} obj 挂载对象
     * @param {string} key 属性名
     * @param {*} value 值
     * @param {Array} fn 数据变动时调用函数的集合
     */
    watch(obj,key,value,fn){
        let property = Object.getOwnPropertyDescriptor(obj,key)

        let getter = property && property.get;
        let setter = property && property.set;

        let self = this;

        Object.defineProperty(this,key,{
            configurable:true,
            enumerable:true,
            
            get:function(){
                let val = getter ? getter() : value

                return val
            },
            set:function(newVal){
                let val = getter ? getter() : value;

                if(newVal == val)return;

                if(setter){
                    setter(newVal)
                }

                if(fn instanceof Array){
                    fn.forEach( item => {
                        if(typeof item === 'function'){
                            item.call(self,newVal,val)
                        }
                    })
                }
            }
        })
    }

}

let query = (str) => document.querySelector(str)