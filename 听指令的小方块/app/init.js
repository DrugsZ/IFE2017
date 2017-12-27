    import setMap from "./createMap.js"
    import {CreateCar} from "./createCar.js"
    import { initCommand} from "./createCommandArea.js"

	export function init(){
        let map = document.getElementById('map')
        let table = setMap.setMap()
        map.appendChild(table)
        let size = table.childNodes.length
        initCommand()
        map.appendChild(table)
        window.car1 = new CreateCar()
        car1.setMapSize(size)
    }