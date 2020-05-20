class ParkingController{
	constructor(formNewClient, tbodyClient){
		this.formNewClient = document.getElementById(formNewClient);
		this.tbodyClient = document.getElementById(tbodyClient);
		this.onsubmit();
		this.addEvents();
		this.listClients();
	}
	
	onsubmit(){
		this.formNewClient.addEventListener("submit",(e)=>{
			e.preventDefault();
			let client = this.createClient(this.formNewClient);
			client.save();
			this.formNewClient.reset();
			this.addLineTable(client);
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
	
	createClient(formNewClient){
		let client = [];
		let vehicle = [];
		let isValid = true;
		[...formNewClient.elements].forEach(function(field){
			if(['name', 'surname', 'adress', 'city', 'email', 'licensePlate',
			'make', 'model', 'color'].indexOf(field.name)
			 > -1 && !field.value){
				field.classList.add('invalid');
				isValid = false;
			}   
			if(['licensePlate', 'make', 'model', 'color'].indexOf(field.name) 
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
	
	addEvents(){
		let btnNewClient = document.querySelector("a#new-client");
		let cardNewClient = document.querySelector("div#card-new-client");
		let cardClients = document.querySelector("div#card-clients");

		btnNewClient.addEventListener("click", () =>{
			cardNewClient.classList.remove('hide');
			cardClients.classList.remove('m12');
			cardClients.classList.add('m6');
		});
	}
	
	
	listClients(){
		//let clients = Client.getClients();
		let clients = JSON.parse(localStorage.getItem("clients"));
			clients.forEach(dataClient => {
				let client = new Client();				
				client.loadFromJSON(dataClient);
				this.addLineTable(client);
			});
	}
}