/**
 * Created by DrugsZ on 2017/9/20.
 */
var checkArr = [
    {id:'item1',handle:checkName},
    {id:'item2',handle:checkPass},
    {id:'item3',handle:checkPass},
    {id:'item4',handle:checkMail},
    {id:'item5',handle:checkPhoto},
]
window.onload = function(){
    oInput = $('input');
    oBtn = document.querySelector('button');
    //绑定监听
    Array.prototype.map.call(oInput,function(item){
        item.addEventListener('blur',function(e){
            getTarget(e);
        },false);
    });
    oBtn.addEventListener('click',function(){
        submitCheck()
    },false)
};
function getTarget(e){
   let id = e.target.parentNode.parentNode.id;
    for(let k of checkArr){
        if(id == k.id){
            k.handle()
        }
    }
}
//检查名称
function checkName(){
    let val = $('#item1').querySelector('input').value;
    if(val==''||val==undefined){
        setClolorMsg('#e83c44','姓名不能为空','item1')
        return
    }else{
        var re=val.replace(/[^x00-xff]/g,'AB');
        if(re.length<4||re.length>16){
            setClolorMsg('#e83c44','长度为4-16个字符','item1')
            return
        }else{
            setClolorMsg('#6bc156','名称格式正确','item1')
        }
    }
}
//检查密码
function checkPass(){
    var passWord1 = $('#item2').querySelector('input');
    var passWord2 = $('#item3').querySelector('input');
    if(passWord1.value==''||passWord1.value==undefined){
        setClolorMsg('#e83c44','请输入密码','item2')
        return
    }else{
        if(passWord2.value!=''&&passWord2.value!=undefined){
            if(passWord1.value!==passWord2.value){
                setClolorMsg('#e83c44','两次密码不一致，请重新输入','item2')
                setClolorMsg('#e83c44','两次密码不一致，请重新输入','item3')
            }else{
                setClolorMsg('#6bc156','密码可用','item2');
                setClolorMsg('#6bc156','密码输入一致','item3')
            }
        }else{
            setClolorMsg('#6bc156','密码可用','item2');
        }
    }
}
function checkMail(){
    var mailAdress = $('#item4').querySelector('input');
    if(mailAdress.value.indexOf('@')!=-1){
        setClolorMsg('#6bc156','邮箱格式正确','item4')
    }else{
        setClolorMsg('#e83c44','邮箱格式错误，请重新输入','item4')
    }
}
function checkPhoto(){
    var phoneNumber = $('#item5').querySelector('input')
    if(!(/^1[34578]\d{9}$/.test(phoneNumber.value))){
        setClolorMsg('#e83c44','手机号格式有误，请重新输入','item5')
    }else{
        setClolorMsg('#6bc156','手机格式正确','item5')
    }
}
//设置提醒
function setClolorMsg(color,msg,item){
    var input = $('#'+item).querySelector('input');
    var tips = $('#'+item).querySelector('span');
    input.style.borderColor = tips.style.color=color;
    tips.innerHTML = msg
}
function submitCheck(){
    let oInput = $('input');
    let testResult = true;
    for (let i of oInput){
        if(i.style.borderColor !== 'rgb(107, 193, 86)'){
            testResult=false
        }
    }
    if(!testResult){
        window.alert('提交失败')
    }else{
        alert('提交成功')
    }
}
function $(str){
    if(str.slice(0,1)=='#'){
        return document.querySelector(str)
    }else{
        return document.querySelectorAll(str)
    }
}

