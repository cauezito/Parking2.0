class Entry{
	constructor(client){
		if(client){
			this._owner = new Client(client);
			this._date = Formatter.dateFormat(new Date());	
		}			
	}
	
	get owner(){
		return this._owner;
	}
	
	set owner(owner){
		this._owner = owner;
	}
		
	get date(){
		return this._date;
	}
	
	set date(date){
		this._date = date;
	}
	
	save(){
		let entries = Entry.getEntries();
		entries.push(this);
		localStorage.setItem("entries", JSON.stringify(entries));
	}
	
	static getEntries(){
		let entries = [];
		if(localStorage.getItem("entries")){
			entries = JSON.parse(localStorage.getItem("entries"));
		}
		return entries;
	}

	loadFromJSON(json){		
        for(let name in json){
			this[name] = json[name];					
		}
	}     
}