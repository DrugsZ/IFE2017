export default{
	CreateCar(){
    	this.$el=this.createElement(),
    	this.x=0,
    	this.y=0,
    	this.deg=0
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
    	item.prototype.setDirection=function(deg) {
    		this.deg += deg;
    		this.$el.style.transform = 'rotate(' +this.deg + 'deg)' 
    	}
    },
    init(){
    	this.addPrototype(this.CreateCar)
    	return this.CreateCar;
    }
}