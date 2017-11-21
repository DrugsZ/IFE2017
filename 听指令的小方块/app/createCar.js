export default{
	CreateCar(){
    	this.x=0,
    	this.y=0,
    	this.deg=-180,
    	this.$el=this.createElement()
    },
    addPrototype(item){
    	item.construction = item;
    	item.prototype.createElement=function(){
		    	let firstTd = this.getFirstTd();
		    	let carDiv = document.createElement('div');
		    	let carImg = document.createElement('img');
		        carDiv.classList = 'car';
		        carImg.src = "style/BOT.png";
		        carImg.classList = 'carImg'
		        carDiv.appendChild(carImg)
		        carDiv.style.transform = 'rotate(' +this.deg + 'deg)' 
		    	firstTd.appendChild(carDiv)
		    	return carDiv
    	},
    	item.prototype.getFirstTd=function(){
    		let map = document.getElementById('map').querySelector('table')
		    let firstTr = map.getElementsByTagName('tr')[1]
		    let firstTd = firstTr.getElementsByTagName('td')[1];
		    return firstTd;
    	},
    	item.prototype.setDirection=function(text) {
    		let codeArr=[
    			{
    				text:'LEF',
    				code:'-90'
    			},
    			{
    				text:'RIG',
    				code:'90'
    			},
    			{
    				text:'BOT',
    				code:'180'
    			},
    		]
    		for(let k of codeArr){
    			if(k.text == text){
    				let deg = Number(k.code)
    				this.deg += deg;
    				this.$el.style.transform = 'rotate(' +this.deg + 'deg)' 
    			}
    		}
    	}
    },
    init(){
    	this.addPrototype(this.CreateCar)
    	return this.CreateCar;
    }
}