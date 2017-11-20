	import setMap from "./createMap.js"
	import car from "./createCar.js"

	let table = setMap.setMap()
	let map = document.getElementById('map')
	map.appendChild(table)
	car.createCar()
