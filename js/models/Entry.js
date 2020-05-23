class Entry{
	constructor(client){
		this._owner = new Client(client);
		this._vehicle = new Vehicle(vehicle);
		this._date = new Date();		
	}
	
	get owner(){
		return this._owner;
	}
	
	set owner(owner){
		this._owner = owner;
	}
	
	get vehicle(){
		return this._vehicle;
	}
	
	set vehicle(vehicle){
		this._vehicle = vehicle;
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
}