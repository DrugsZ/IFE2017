const puppeteer = require('puppeteer');
const { upperCase,readJsonSync } = require('./util');
const fs = require('fs');

let tempTime = new Date();
let month = Number(tempTime.getMonth()) + 1
const TEST_TIME = tempTime.getFullYear() + '_' + month + '_' + tempTime.getDate()

fs.readdir(`./screenshots/${TEST_TIME}`,'utf8',(err,file) => {
    if(err){
        fs.mkdirSync(`./screenshots/${TEST_TIME}`)
    }
    return
})


// let config = fs.readFileSync('./config.json','utf-8');

// config  = JSON.parse(config)

// const { URL,resolution,loginInfo } = config;
const { URL,resolution,loginInfo } = readJsonSync('./config.json');

// let router  = fs.readFileSync('./router.json','utf-8');

// let routerArr = JSON.parse(router);
let routerArr = readJsonSync('./router.json');


for (let item of routerArr) {

    let tag = item.code;
    tagUpperCase = upperCase(tag);
    item.No = tag;
    item.id = 'Page' + tagUpperCase;
    item.route = '/indexhome/' + tag;
}



async function getPic() {
    const browser = await puppeteer.launch({
      headless:false,
    });
    const page = await browser.newPage();
    await page.goto(URL)
    await page.setViewport({
        width: resolution.width,
        height: resolution.height
    });

    //关闭更新提示框
    const update_btn = await page.$('.update_btn');
    if(update_btn){
        await update_btn.click();
    }

    //登录
    const input = await page.$$('input')

    await input[2].type(loginInfo.userName)
    await input[3].type(loginInfo.passWord)

    let loginBox = await page.$('.login_bot')

    let btn = await loginBox.$('a')
    btn.click()

    
    

    await page.waitFor('#page-wrapper')

    for(let i = 0 ; i < routerArr.length;i++){
        await page.waitFor(5000)

        console.log(`当前测试菜单 ==> ${routerArr[i].name}`)

        const el = await page.evaluate((item) => {
            let store = document.querySelector('#page-wrapper').__vue__.$store;
            let router = document.querySelector('#page-wrapper').__vue__.$router;
    
                router.push(item.route)
                store.dispatch('addTab',item)

                console.log(this)
        },routerArr[i]);

        
        await page.waitFor(5000)


        //判断是否报错弹框
        const modal = await page.$('.ui-modal__wrapper')

        if(modal){
            let item  = routerArr[i]
            await page.screenshot({path: `screenshots/${TEST_TIME}/菜单名称_${item.name}.png`});
            console.log(`已截图至screenshots/${TEST_TIME}`)
        }


        //关闭当前菜单
        let closeParent = await page.$('.dropdown.J_tabClose');

        await closeParent.click();

        let close = await page.$('.J_tabCloseAll')

        await close.click()
    }

    process.exit()
}

getPic();