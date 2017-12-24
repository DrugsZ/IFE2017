	import setMap from "./createMap.js"
	import {CreateCar} from "./createCar.js"

	let table = setMap.setMap()
	let map = document.getElementById('map')
	let size = table.childNodes.length
	map.appendChild(table)
	window.car1 = new CreateCar()
	car1.setMapSize(size)
