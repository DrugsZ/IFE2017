export function CreateCar(){
    	this.x=0,
    	this.y=0,
        this.deg=-180,
        this.direction = [
            {
                text:'TOP',
                code:'-180',
                dir:'180',
                value:{
                    x:0,
                    y:-1
                }
            },
            {
                text:'LEF',
                code:'-90',
                dir:'90',
                value:{
                    x:-1,
                    y:0
                }
            },
            {
                text:'RIG',
                code:'90',
                dir:'270',
                value:{
                    x:1,
                    y:0
                }
            },
            {
                text:'BOT',
                code:'0',
                dir:'0',
                value:{
                    x:0,
                    y:1
                }
            },
        ],
    	this.$el=this.createElement()
    }
    CreateCar.construction = CreateCar;
    CreateCar.prototype.createElement=function(){
            let firstTd = this.getFirstTd();
            let carDiv = document.createElement('div');
            let carImg = document.createElement('img');
            carDiv.classList = 'car';
            carImg.src = "style/BOT.png";
            carImg.classList = 'carImg'
            carDiv.appendChild(carImg)
            carDiv.style.transform = 'rotate(' +this.deg + 'deg)'
            firstTd.appendChild(carDiv)
            carDiv.style.width = firstTd.offsetWidth+'px';
            carDiv.style.height = firstTd.offsetHeight+'px';
            return carDiv
        },
    CreateCar.prototype.getFirstTd=function(){
        let map = document.getElementById('map').querySelector('table')
        let firstTr = map.getElementsByTagName('tr')[1]
        let firstTd = firstTr.getElementsByTagName('td')[1];
        return firstTd;
    },
    //设置地图尺寸以判定是否越界, 修改存疑?
    CreateCar.prototype.setMapSize = function(size){
        if(typeof(size)!= 'number'){
            console.log('Map size must be number')
        }
        this.mapSize = size;
    }
    //设置转向
    CreateCar.prototype.setDirection=function(text) {
        if(text == 'TOP')return
        for(let k of this.direction){
            if(k.text == text){
                let deg = Number(k.code)
                this.deg += deg;
                this.$el.style.transform = 'rotate(' +this.deg + 'deg)'
            }
        }
    },
    /*
    *@params:
    *@return:Boolean
    */
    //判断是否越界
    CreateCar.prototype.isOverstep = function(x,y){
        x += this.x;
        y += this.y;
        // if(x>this.mapSize||y>this.mapSize){
        //     return true
        // }
        return x>this.mapSize||y>this.mapSize
    }
    //获取当前朝向
    CreateCar.prototype.getDirection = function(deg=this.deg){
        deg += 360;
        deg = deg%360;
        console.log(deg)
        for(let k of this.direction){
            if(k.dir == deg){
                return k;
            }
        }
    },
    //数据与表现分离,在每次修正对象数据后进行render操作
    CreateCar.prototype.render = function(){
          let el = this.$el;
          let size = new Number(el.offsetWidth);
          el.style.top = this.y * size+'px';
          el.style.left = this.x * size+'px';
    },
    CreateCar.prototype.setTransition = function(time){
        time = time/1000;
        this.$el.style.transition = time+'s'
    },
    //前进
    CreateCar.prototype.go = function(){
        let dirObject = this.getDirection()
        if(!dirObject){
            console.error('There is an unexpected error. Please try again later')
            return 
        }
        this.x += dirObject.value.x;
        this.y += dirObject.value.y;
        this.render()
    }
