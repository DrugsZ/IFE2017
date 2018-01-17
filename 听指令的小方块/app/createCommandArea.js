import {addHandler} from './util.js'

let WRAPPER;
let VALUE;
let LAST_NUM;
let COMMAND;

export function initCommand(){
    let commandStr =`<div class="command">
                    <div class="lineNumber">
                        <div class="wrapper">
                            
                        </div>
                    </div>
                    <textarea></textarea>
                </div>`
    document.body.innerHTML+=commandStr
    WRAPPER = document.querySelector('.wrapper');
    COMMAND = document.querySelector('.command')
    setTimeout(function(){
        addNumber(1)
        addHandler(COMMAND,'keyup',function(){
            console.log(121)
            renderLine(getLineNumber())
        })
    },0)
}

function renderLine(num){
    if(LAST_NUM==num){
        return;
    }
    LAST_NUM = num;
    addNumber(num)
}

function addNumber(i){
    let str ='';
    for (var n = 0; n < i; n++) {
        str+=createNumber(n+1)
    }
    WRAPPER.innerHTML =str
}

function createNumber(i){
    let str = `<div>
                    <span>${i}</span>
                </div>`
    return str
}

function getLineNumber(){
    VALUE = document.querySelector('textarea').value;
    let n = VALUE.split('\n').length
    console.log(n)
    return n;
}