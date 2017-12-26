/**
 * Created by Administrator on 2017/10/25.
 */
export default{
     setMap(num=20){
     	let table = document.createElement('table')
     	let n = num+1
     	if (n<=0) {
     		console.log('please set num to greater than zero')
     	}
     	for (let i = n - 1; i >= 0; i--) {
     		let tr = document.createElement('tr')
     		for (let i = n - 1; i >= 0; i--) {
     			let td = document.createElement('td');
     			tr.appendChild(td)
     		}
     		table.appendChild(tr)
     	}
      this.setIndex(table)
     	return table
    },
     setIndex(table){
       let trs = table.querySelectorAll('tr')
       for (var i = 1; i < trs.length; i++) {
         trs[i].querySelector('td').innerHTML = i;
         trs[0].querySelectorAll('td')[i].innerHTML = i;
       }
	}
}
