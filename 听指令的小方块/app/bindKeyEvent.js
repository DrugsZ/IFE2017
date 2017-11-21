export default{
	addHandler(ele,event,handler){
	    if(ele.attachEvent){
	        ele.attachEvent("on"+event,handler);
	    }else if(ele.addEventListener){
	        ele.addEventListener(event,handler,false);
	    }else{
	        ele[on+"event"]=handler;
	    }
	},
	bindKey(){
		
	}
}