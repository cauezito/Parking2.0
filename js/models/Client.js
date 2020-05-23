class Client{
	constructor(name, surname, email, adress, city, vehicle ){
		//this._id;
		this._name = name;
		this._surname = surname;
		this._email = email;
		this._adress = adress;
		this._city = city;
		if(vehicle){
			this._vehicle = new Vehicle(vehicle);
		}
		
	}
	
	get name(){
		return this._name;
	}
	
	set name(name){
		this._name = name;
	}
	
	get surname(){
		return this._surname;
	}
	
	set surname(surname){
		this._surname = surname;
	}
	
	get email(){
		return this._email;
	}
	
	set email(email){
		this._email = email;
	}
	
	get adress(){
		return this._adress;
	}
	
	set adress(adress){
		this._adress = adress;
	}
	
	get city(){
		return this._city;
	}
	
	set city(city){
		this._city = city;
	}
	
	get vehicle(){
		return this._vehicle;
	}
	
	set vehicle(vehicle){
		this._vehicle = vehicle;
	}
	
	formatJSON(json){
		for(let name in json){			
			json = json.replace("_","");			
		}
		return JSON.parse(json);
	}
	
	loadFromJSON(json){		
        for(let name in json){
			switch(name){
				case '_vehicle':
					let vehicle = JSON.stringify(json[name]);
					vehicle = this.formatJSON(vehicle);					
					this._vehicle = new Vehicle(vehicle);
				
				break;
				default:
					this[name] = json[name];
					
			}
		}     
    }

	save(){
		let clients = Client.getClients();
		clients.push(this);
		localStorage.setItem("clients", JSON.stringify(clients));
	}
	
	static getClients(){
		let clients = [];
		if(localStorage.getItem("clients")){
			clients = JSON.parse(localStorage.getItem("clients"));
		}
		return clients;
	}
	
	static getOneClient(nameClient){
		let clients = this.getClients();
		for(let i in clients){	
			if(clients[i]._name === nameClient){
				return clients[i];				
			}
		}		
	}
}