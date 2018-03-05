// initTable=(options)=>{
//     let el = document.querySelector(options.el)
//     let thList = options.title
// }
/*
* @param options {
    el:{string},
    title:{Array},
    data:{Array}
}
*/
createThead = (title) =>{
    let str = `<thead><tr>`
    title.forEach(item =>{
        let cansort = ''
        if(!item.canSort){
             cansort = 'true'
        }
        str += `<th data-cansort=${cansort}>${item.name}</th>`
    })
    str +=`</tr></thead>`
    let thead = parseToDOM(str)[0]
    return thead
}
createTbody = (data) =>{
    let str = `<tbody>`
    data.forEach((item) =>{
        str += `<tr>`
        console.log(item)
        for (let key in item) {
            str += `<td>${item[key]}</td>`
        }
        str += `</tr>`
    })
    str +=`</tbody>`
    let tbody = parseToDOM(str)[0]
    return tbody
}
function parseToDOM(str){
    var table = document.createElement("table");
    if(typeof str == "string")
        table.innerHTML = str;
    return table.childNodes;
 }
 

class sortTable {
    constructor(el) {
        if(el == undefined){
            console.error('el is required')
        }else if (typeof el != 'string') {
            console.error('el should be sting type')
        }
        this.$el = document.querySelector(el)
    }

    setOptions(options) {
        let table = document.createElement("table");
        let thead = createThead(options.title)
        let tbody = createTbody(options.data)
        table.appendChild(thead)
        table.appendChild(tbody)
        this.$el.appendChild(table)
    }

    addListen(){
        let th = this.$el.querySelectorAll('th')
        if(th.childNodes.includes('span')){

        }
    }
}