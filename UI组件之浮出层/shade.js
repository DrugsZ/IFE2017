let obj = {
    title:'提示',
    message:'提示信息'
}

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
    }
    createDOM(ele = 'body'){
        let time = new Date().getTime()
        let id = `shade_${time}`
        let template = `
            <div class="shade" id=${id}>
                <div class="content">
                    <div class="title-content"><p class="title-message">这是一个浮出层</p></div>
                    <div class="message"><p class="message-content">
                        这是一个浮出层
                    </p></div>
                    <div class="button">
                        <button>确定</button>
                        <button>取消</button>
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
    }
    //设置数据绑定
    setMessage(obj) {
        let title = obj.title || '提示'
        let message = obj.message || '苟利国家生死以'
        this.title = title;
        this.message = message
    }
}

function setObserve(obj){
    let titleMsg;
    let messageMsg;
    Object.defineProperty(obj,'title',{
        __proto__: null,
        enumerable:true,
        configurable:true,
        get:function(){
             return titleMsg
        },
        set:function(newVal){
            // value = newVal
            titleMsg = newVal
            obj.titleContent.innerHTML = newVal
        }
    })
    Object.defineProperty(obj,'message',{
        __proto__: null,
        enumerable:true,
        configurable:true,
        get:function(){
            return messageMsg
        },
        set:function(newVal){
            messageMsg = newVal
            obj.messageContent.innerHTML = newVal
        }
    })
}
function GetShade(ele){
    let obj = new createShade(ele)
    setObserve(obj)
    return obj
}