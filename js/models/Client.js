class Client{
	constructor(name, surname, email, adress, city, vehicle){
		this._id;
		this._name = name;
		this._surname = surname;
		this._email = email;
		this._adress = adress;
		this._city = city;
		this._vehicle = new Vehicle(vehicle);
	}
}