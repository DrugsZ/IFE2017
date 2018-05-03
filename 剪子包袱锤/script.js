class Mora {
    constructor() {
        this.personSelect = query('#person-select');
        this.pcSelect = query('#pc-select');
        this.personData = 'scissors';
        this.pcData = 'scissors';
        this.perspnShowSelect = query('.person-show-space')
        this.pcShowSelect = query('.pc-show-space')
        this.init()
        this.PERSON_SELECT_OBJ = {
            rock:{
                paper:'lose',
                rock:'dogfall',
                scissors:'win'
            },
            paper:{
                paper:'dogfall',
                rock:'win',
                scissors:'lose'
            },
            scissors:{
                paper:'win',
                rock:'lose',
                scissors:'dogfall'
            },
        }
    }
    init(){
        //数据与DOM绑定
        this.compile('personData',query('select'),this.personData)
        let self = this
        //设置数据观察
        this.watch(this,'personData',this.personData,[
            function(newVal,val){
                self.setData(newVal,val,'person')
            }
        ])
        this.watch(this,'pcData',this.personData,[
            function(newVal,val){
                self.setData(newVal,val)
                self.setSingleClass(self.pcSelect,newVal)
            }
        ])
    }
    /**
     * 
     * @param {object || Array} mode 将要设置的模式
     * @param {string} selectData 所选择数据
     */
    async setShow(mode,selectData){
        let cesh = ['rock','paper','scissors']
        let i = 1 ;
        let len = 50;
        let result = true;

        while(result){
            result = await this.getPromise(mode,cesh[50%i],i)
            i++
            if(i>=len){
                result = false
            }
        }
        this.setClass(mode,selectData)
    }
    /**
     * 
     * @param {*} mode 
     * @param {*} className 
     * @param {*} i 
     */
    getPromise(mode,className,i){
        if( i >= 5 ) i = 5
        let p = new Promise( (resolve,reject) => {
            setTimeout(() => {
                this.setClass(mode,className)
                resolve(true)
            }, i * 20);
        })
        return p
    }
    /**
     * 
     * @param {Object || Array } mode  索要设置模式 
     * @param {string} className class名称 
     */
    setClass(mode,className){
        if(mode instanceof Array){
            mode.forEach( item => {
                this.setSingleClass( item, className)
            })
        }else{
            this.setSingleClass(mode,className)
        }
    }
    /**
     * 
     * @param {DOM Object} el 要设置class的DOM对象
     * @param {string} className class名称
     */
    setSingleClass(el,className){
        remove( el,'rock')
        remove( el,'paper')
        remove( el,'scissors')
        if(className)add( el,className)
    }
    /**
     * 
     * @param {string} str 修改值  rock paper scissors
     * @param {*} mode 修改类型,默认为pc
     */
    setData(newVal,val,mode){
        mode = mode === 'person' ? 'personSelect' : 'pcSelect';

        if(val)this[mode].classList.remove(val);
        if(newVal)this[mode].classList.add(newVal);
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
                }else{
                    value = newVal
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
    /**
     * @returns{string} 返回 ['rock','paper','scissors']数组中的随机一个
     */
    getRandom(){
        let arr = ['rock','paper','scissors'];
        return arr[Math.floor(Math.random() * 3)]
    }
    /**
     * 
     * @param {string} personSelect 玩家选择项
     * @param {string} pcSelect 电脑选择项
     * @returns {string} 返回以玩家角度输赢情况 [lose,win,dogfall]
     */
    compare(personSelect,pcSelect){
        if(!personSelect || !pcSelect){
            throw '缺少值'
        }
        return this.PERSON_SELECT_OBJ[personSelect][pcSelect]
    }
    /**
     * 
     */
    async goCompare(){
        // this.setClass(this['perspnShowSelect'],this.personData)
        this.pcData = '';

        let pcData = this.getRandom();
        
        let timer = await this.setShow([this['perspnShowSelect'],this['pcShowSelect']],this.personData)

        this.pcData = pcData
        // let pcTimer = await this.setShow(,this.pcData)


        let result = this.compare(this.personData,this.pcData)

        let showResule = query('.result')
        showResule.innerHTML = result
    }

}
/**
 * let id = query('.id')
 * @param {string} str 要获取的元素标识符
 * @returns {object} 返回第一个匹配到的元素
 */
let query = (str) => document.querySelector(str)

/**
 * 
 * @param {DOMObject} el DOM对象
 * @param {string} className class名称
 */
let remove = (el,className) =>{
    el.classList.remove(className)
}
/**
 * 
 * @param {DOMObject} el DOM对象
 * @param {string} className class名称
 */
let add = (el,className) =>{
    el.classList.add(className)
}