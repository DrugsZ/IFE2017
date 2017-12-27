/*
 * @Author: DrugsZ 
 * @Date: 2017-12-27 11:51:42 
 * @Last Modified by:   DrugsZ 
 * @Last Modified time: 2017-12-27 11:51:42 
 */
import {addHandler} from "./util.js"
export function initCommand(){
	createCommandDiv()
}
function createCommandDiv(){
    let parentDiv = document.createElement('div');
    parentDiv.className = 'command';
    let subDiv = document.createElement('div');
    subDiv.className = "lineNumber"
    parentDiv.appendChild(subDiv)
    let textarea = document.createElement('textarea');
    textarea.className = 'line_height'
    parentDiv.appendChild(textarea);
	document.body.appendChild(parentDiv)
	let getLineNumber = isLineFeed(textarea)
	let createNumber = getNumber(subDiv)
	addHandler(textarea,'keyup',function(){
		let n = getLineNumber()
		if(n>0){
			createNumber(n)
		}	
	})
}
function isLineFeed(el){
	return function getLineNumber(){
		let value = el.value;
		console.log(value)
		let n = value.split('\n')
		// console.log(n)
		return n.length
	}
}
function getNumber(target){
	let lastIndex
    return function createNumber(index){
		// console.log(index)
		if(lastIndex==index)return;
		lastIndex = index
		let child = target.querySelectorAll('span');
        let oDiv = document.createElement('div');
        oDiv.className = "number";
        let span = document.createElement('span');
        span.innerHTML = index;
        oDiv.appendChild(span)
        target.appendChild(oDiv)
    }
}
/*
* @params:object
*/
function receiveCompleted(){

}