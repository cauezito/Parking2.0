class ParkingController{
	constructor(formNewClient){
		this.formNewClient = document.getElementById(formNewClient);
		this.onsubmit();
	}
	
	onsubmit(){
		this.formNewClient.addEventListener("submit",(e)=>{
			e.preventDefault();
			let values = this.getValues(this.formNewClient);
			console.log(values);
		});
	}
	
	getValues(formNewClient){
		let client = {};
		let vehicle = {};
		let isValid = true;
		[...formNewClient.elements].forEach(function(field){
			if(['name', 'surname', 'adress', 'city', 'email', 'license_plate',
			'make', 'model', 'color'].indexOf(field.name)
			 > -1 && !field.value){
				field.classList.add('invalid');
				isValid = false;
			}   
			if(['license_plate', 'make', 'model', 'color'].indexOf(field.name) 
			> -1 && field.value){
				vehicle[field.name] = field.value;
			}
			
			client[field.name] = field.value;
		});
		
		if(!isValid) return false;
		
		return new Client(
			client.name, client.surname, client.email,
		 	client.adress, client.city, vehicle);
	}
}