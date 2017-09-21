/**
 * Created by DrugsZ on 2017/9/21.
 */
document.querySelector('#select-Js').addEventListener('change',function(e){
    selectRadio(e)
},false);
var selectArr = [
    {value:0, id:'inSchool'},
    {value:1,id:'inCompany'}
];
var inSchoolArr = [
    {
        city:'北京',
        school:[
            '北京一大',
            '北京二大',
            '北京三大'
        ]
    },
    {
        city:'上海',
        school:[
            '上海一大',
            '上海二大',
            '上海三大'
        ]
    },
    {
        city:'深圳',
        school:[
            '深圳一大',
            '深圳二大',
            '深圳三大'
        ]
    },
    {
        city:'广州',
        school:[
            '广州一大',
            '广州二大',
            '广州三大'
        ]
    }
];
function selectRadio(e){
    console.log(e.target.value);
    for(var i=0;i<selectArr.length;i++){
        if(selectArr[i].value == e.target.value){
            switchClass(selectArr[i].id)
        }
    }
    randerCity()
}
function switchClass(id){
    for(var i=0;i<selectArr.length;i++){
            document.querySelector('#'+selectArr[i].id).classList.add('close')
    }
    document.querySelector('#'+id).classList.remove('close')
}
function randerCity(){
    rander(inSchoolArr,'#city','city')
    document.querySelector('#city').addEventListener('click',function(e){
        randerSchool(e.target.value)
    },false);
    rander(inSchoolArr[0].school,'#school')
}
function randerSchool(val){
    for(var i=0;i<inSchoolArr.length;i++){
        if(inSchoolArr[i].city == val){
            rander(inSchoolArr[i].school,'#school')
        }
    }
}
function rander(arr,id,prop){
    document.querySelector(id).innerHTML=''
    var cityNode = document.createDocumentFragment();
    for(var i=0; i<arr.length; i++){
        var oIption = document.createElement('option')
        oIption.value = prop == undefined?arr[i]:arr[i][prop];
        oIption.innerText = prop == undefined?arr[i]:arr[i][prop];
        cityNode.appendChild(oIption)
    }
    document.querySelector(id).appendChild(cityNode);
}