class Formatter{
	
	static JSONFormat(json){
		for(let name in json){			
			json = json.replace("_","");			
		}
		return JSON.parse(json);
	}
	
	static dateFormat(date){
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();
    }
}