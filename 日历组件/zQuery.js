let zQuery = function(selector){
    return new Init(selector)
}


zQuery.prototype.constructor = zQuery
zQuery.fn = {
    // init(selector){
    //     this._$el = document.querySelectorAll(selector)
    //     if('length' in this._$el && this._$el.length == 1){
    //         this._$el = document.querySelector(selector)
    //     }
    //     return this;
    // },
    fadeIn(speed,fn){

    },
    css(field){
        const self = this;
        if(!field){
            return this._$el.style.cssText
        }else if(typeof field === 'string'){
            let items = field.split(',');
            let str = '';
            items.forEach( item => {
                str += this._$el.style[item]
            })
            return str
        }else if(typeof field === 'object'){
            const keys = Object.keys(field)

            for (const key of keys) {
                self._$el.style[key] = field[key]
            }
            return this
        }
    }
}

Init.prototype = zQuery.fn

function Init(selector){
    this._$el = document.querySelectorAll(selector)
    if('length' in this._$el && this._$el.length == 1){
        this._$el = document.querySelector(selector)
    }
    return this;
}