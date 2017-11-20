export default{
    getFirstTd(){
        let map = document.getElementById('map').querySelector('table')
        let firstTr = map.getElementsByTagName('tr')[1]
        let firstTd = firstTr.getElementsByTagName('td')[1];
        return firstTd;
    },
    createCar(){
    	let firstTd = this.getFirstTd();
    	let carDiv = document.createElement('div');
    	let carImg = document.createElement('img');
        carDiv.classList = 'car';
        carImg.src = "style/BOT.png";
        carImg.classList = 'carImg'
        carDiv.appendChild(carImg)
    	firstTd.appendChild(carDiv)
    }
}