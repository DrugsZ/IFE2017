class createShade {
    constructor(ele) {
        let contentDOM;
        this.title = 1;
        this.message = '';
        this.getContent=function(){
            return contentDOM || this.setContent(document.querySelector('body'))
        }
        this.setContent = function(ele){
            contentDOM = ele
            return contentDOM
        }
        this.init()
    }
    init(ele){
        this.createDOM('body');
        this.setObserve()
    }
    //设置数据绑定
    setObserve(){
        let titleMsg;
        let messageMsg;
        Object.defineProperty(this,'title',{
            __proto__: null,
            enumerable:true,
            configurable:true,
            get:function(){
                 return titleMsg
            },
            set:function(newVal){
                // value = newVal
                titleMsg = newVal
                this.titleContent.innerHTML = newVal
            }
        })
        Object.defineProperty(this,'message',{
            __proto__: null,
            enumerable:true,
            configurable:true,
            get:function(){
                return messageMsg
            },
            set:function(newVal){
                messageMsg = newVal
                this.messageContent.innerHTML = newVal
            }
        })
    }
    createDOM(ele = 'body'){
        let time = new Date().getTime()
        let id = `shade_${time}`
        this.id = id
        let template = `
            <div class="shade" id=${id}>
                <div class="content">
                    <div class="title-content"><p class="title-message">这是一个浮出层</p></div>
                    <div class="message"><p class="message-content">
                        这是一个浮出层
                    </p></div>
                    <div class="button">
                        <button id="confirm_${id}">确定</button>
                        <button id='cancel_${id}'>取消</button>
                    </div>
                </div>
            </div>
        `
        let parent = document.querySelector(ele)
        parent.innerHTML += template
        let contentDOM = document.getElementById(id)
        this.setContent(contentDOM)
        this.titleContent = contentDOM.querySelector('.title-message')
        this.messageContent = contentDOM.querySelector('.message-content')
        this.setEventHandle()
    }
    setMessage(obj) {
        let title = obj.title || '提示'
        let message = obj.message || '苟利国家生死以'
        this.title = title;
        this.message = message
    }
    setEventHandle(){
        let that = this
        let shade = document.querySelector('.shade')
        let confirmBtn = document.getElementById(`confirm_${this.id}`)
        let cancelBtn = document.getElementById(`cancel_${this.id}`)
        addEvent(shade,'click',function(){
            that.hideAlert()
        })
        addEvent(confirmBtn,'click',function(){
            that.hideAlert
        })
        addEvent(cancelBtn,'click',function(){
            that.hideAlert
        })
    }
    showAlert(obj = {}){
        let contentDOM = this.getContent()
        this.setMessage(obj)
        contentDOM.style.display = 'block';
    }
    hideAlert(){
        let contentDOM = this.getContent()
        contentDOM.style.display = 'none'
    }
}
/**
 * 兼容事件绑定方法
 * @param[Object] Dom The Dom to addEvent
 * @param[string] type The type to  monitor
 * @param[Function] handle 事件处理函数 
 */
function addEvent(ele,type,handle){
    if(ele.addEventListener){
        ele.addEventListener(type,handle,false)
    }else if (ele.attachEvent) {
        ele.attachEvent("on"+event,handler);
    }else{
        ele[on+"event"]=handler;
    }
}

function getCreateMsgFnc(titleInput,messageInput){
    return function(){
        let obj = {}
        obj.title = titleInput.value
        obj.message = messageInput.value
        return obj
    }
}