import {addHandler} from "./util.js"
export function createCommandDiv(){
        let parentDiv = document.createElement('div');
        parentDiv.className = 'command';
        let subDiv = document.createElement('div');
        subDiv.className = "lineNumber"
        parentDiv.appendChild(subDiv)
        let textarea = document.createElement('textarea');
        textarea.className = 'line_height'
        // textarea.rows = 40;
        // textarea.cols = 40;
        parentDiv.appendChild(textarea);
        document.body.appendChild(parentDiv)
}
function getNumber(target){
        let index = 1
        return function createNumber(){
                let oDiv = document.createElement('div');
                oDiv.className = "number";
                let span = document.createElement('span');
                span.innerHTML = index;
                oDiv.appendChild(span)
                target.appendChild(oDiv)
                index+=1
        }
}