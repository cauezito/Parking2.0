class ParkingController{
	constructor(formNewClient, tbodyClient){
		this.formNewClient = document.getElementById(formNewClient);
		this.tbodyClient = document.getElementById(tbodyClient);
		this.addEventsIndexPage();

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
	
	addEventsGlobal(){
		let indexPage = document.querySelector("body#index-page");
		let clientsPage = document.querySelector("body#clients-page");
		console.log(indexPage)
		console.log(clientsPage)
		if(!indexPage == null){
			indexPage.addEventListener("load", () => {
				this.addEventsIndexPage();
				console.log('oi')
			});
		}
		
		if(!clientsPage == null){
			clientsPage.addEventListener("load", () => {
				this.addEventsClientsPage();
				console.log('oi')
			});
		}
		
		
		
		
		
	}
	
	addEventsClientsPage(){
		let btnNewClient = document.querySelector("a#new-client");
		let cardNewClient = document.querySelector("div#card-new-client");
		let cardClients = document.querySelector("div#card-clients");
		let closeNewClient = document.querySelector("a#close-new-client");	
		
		this.listClients();
		
		btnNewClient.addEventListener("click", () =>{
			cardNewClient.classList.remove('hide');
			cardClients.classList.remove('m12');
			cardClients.classList.add('m6');
		});
		
		closeNewClient.addEventListener("click", () => {
			cardClients.classList.remove('m6');
			cardClients.classList.add('m12');
			cardNewClient.classList.add('hide')
			this.formNewClient.reset();
		});
		
		this.formNewClient.addEventListener("submit",(e)=>{
			e.preventDefault();
			let client = this.createClient(this.formNewClient);
			client.save();
			this.formNewClient.reset();
			this.addLineTable(client);
		});
	}	
	
	addEventsIndexPage(){
		let addNewEntry = document.querySelector("a#add-new-entry");
		let cardEntry = document.querySelector("div#card-entry");
		let cardNewEntry = document.querySelector("div#card-new-entry");
		let closeNewEntry = document.querySelector("a#close-new-entry");
		
		addNewEntry.addEventListener("click", () => {
			cardEntry.classList.remove('m12')
			cardEntry.classList.add('m6')
			cardNewEntry.classList.remove('hide');
			this.listInfoNewEntry();
		});
		
		closeNewEntry.addEventListener("click", () => {
			cardEntry.classList.remove('m6');
			cardEntry.classList.add('m12');
			cardNewEntry.classList.add('hide')
		});
	}
	listClients(){
		//let clients = Client.getClients();
		let clients = this.returnClients();
			clients.forEach(dataClient => {
				let client = new Client();				
				client.loadFromJSON(dataClient);
				console.log('entrou')
				this.addLineTable(client);
				
			});
	}
	
	returnClients(){
		return JSON.parse(localStorage.getItem("clients"));
	}
	
	returnEntries(){
		let entries = JSON.parse(localStorage.getItem("entries"));
		if(!entries){
			localStorage.setItem("entries");
		}
		return entries;
	}
	
	clearSelect(idSelect){
		let select = document.querySelector(idSelect);
	}
	
	listInfoNewEntry(){
		let selectClient = document.querySelector("select#select-client");
		let selectVehicle = document.querySelector("select#select-vehicle");
		let clients = this.returnClients();
		let entries = this.returnEntries();
		let licensePlate = [];
		let index = -1;
		
		if(entries){
			entries.forEach((data, i) =>{
				licensePlate[i] = entries[i].licensePlate;
			});
		}
		
		if(entries){
			clients.forEach((data, i) => {
				if(licensePlate.indexOf(clients[i].licensePlate) === -1){
					selectClient.append('<option value="'+ clients[i].name +'">' + 
					clients[i].name +" " + clients[i].surname + '</option>');
				} else {
					selectClient.append('<option value="'+ clients[i].name +'">' +
					clients[i].name + " " + clients[i].surname + '</option>'); 
				}
			});
		}		
		
		selectClient.addEventListener("blur", function() {
        	selectedClient = selectClient.options[selectClient.selectedIndex].value;
                clients.forEach((data, i) =>{
					if(clients[i].name === selectedClient) {
                     index = i;
                  }
				});
				
				this.clearSelect("select-vehicle");
				
				selectVehicle.append('<option value="'+ 
				clients[index].model + '">' + clients[index].licensePlate +
                " " + clients[index].make + '</option>');
        });
	}
}