	import setMap from "./createMap.js"
	import {CreateCar} from "./createCar.js"

	let table = setMap.setMap()
	let map = document.getElementById('map')
	map.appendChild(table)
	let car1 = new CreateCar()
