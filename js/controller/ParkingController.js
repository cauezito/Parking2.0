class ParkingController{
	constructor(formNewClient, tbodyClient){
		this.formNewClient = document.getElementById(formNewClient);
		this.tbodyClient = document.getElementById(tbodyClient);
		
		
		this.onsubmit();
	}
	
	onsubmit(){
		this.formNewClient.addEventListener("submit",(e)=>{
			e.preventDefault();
			let values = this.getValues(this.formNewClient);
			values.save();
			this.formNewClient.reset();
			this.addLineTable(values);
			console.log(values.vehicle);
			console.log(values.vehicle.make);
		});
	}
	
	addLineTable(values){
		let tr = this.getTr(values);
		this.tbodyClient.appendChild(tr);
		
	}
	
	getTr(dataClient, tr = null){
		if(tr === null){
            tr = document.createElement('tr');
        } 
        tr.dataset.client = JSON.stringify(dataClient);
        tr.innerHTML =  `
        <td>${dataClient.name + ' ' + dataClient.surname}</td>
        <td>${dataClient.email}</td>
		<td>${dataClient.adress}</td>
		<td>${dataClient.city}</td>
		<td>${Vehicle.format(dataClient.vehicle)}</td>`;
        return tr;
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