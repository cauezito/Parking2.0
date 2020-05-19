class Vehicle{
	constructor(vehicle){
		//this._id = id;
		this._licensePlate = vehicle.license_plate;
		this._make = vehicle.make;
		this._model = vehicle.model;
		this._color = vehicle.color;
	}
	
	get licensePlate(){
		return this._licensePlate;
	}
	
	set licensePlate(lp){
		this._licensePlate = lp;
	}
	
	get make(){
		return this._make;
	}
	
	set make(make){
		this._make = make;
	}
	
	get model(){
		return this._model;
	}
	
	set model(model){
		this._model = model;
	}
	
	get color(){
		return this._color;
	}
	
	set color(color){
		this._color = color;
	}
	
	static format(vehicle){
		return vehicle.licensePlate + ' ' + vehicle.model;
	}
}