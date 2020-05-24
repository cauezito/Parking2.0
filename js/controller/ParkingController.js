class ParkingController{
	constructor(formNewClient, tbodyClient, formNewEntry, tbodyEntry){
		this.formNewClient = document.getElementById(formNewClient);
		this.tbodyClient = document.getElementById(tbodyClient);
		this.formNewEntry = document.getElementById(formNewEntry);
		this.tbodyEntry = document.getElementById(tbodyEntry);
		this.addEventsIndexPage();
		//this.addEventsClientsPage();
	}
	
	addLineTable(values, tbody){
		let tr = this.getTr(values);
		tbody.appendChild(tr);		
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
			/*if(['licensePlate', 'make', 'model', 'color'].indexOf(field.name) 
			> -1 && field.value){
				vehicle[field.name] = field.value;
			}*/		
			client[field.name] = field.value;
		});
		
		if(!isValid) return false;
		
		return new Client(client);
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
			this.addLineTable(client, this.tbodyClient);
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
			cardNewEntry.classList.add('hide');
		});
		
		this.formNewEntry.addEventListener("submit", (e) => {
			e.preventDefault();
			let entry = this.createEntry(this.formNewEntry);
			entry.save();
			this.formNewEntry.reset();
			this.clearSelect("select-vehicle");			
		});
	}
	
	createEntry(formNewEntry){
		let dataUser = [];
		let isValid = true;
		[...formNewEntry.elements].forEach(function(field){
			
			/* validation
			if(['select-client', 'select-vehicle'].indexOf(field.name)
			 > -1 && field.value != 'Choose a client'){
				field.classList.add('invalid');
				isValid = false;
			}   */
			dataUser[field.name] = field.value;
		});
		
		//if(!isValid) return false;
		
		let client = Client.getOneClient(dataUser.client);		
		let newClient = Formatter.JSONFormat(JSON.stringify(client));		
		return new Entry(newClient);
	}
	
	listClients(){
		let clients = this.returnClients();
		clients.forEach(dataClient => {
			let client = new Client();				
			client.loadFromJSON(dataClient);
			this.addLineTable(client, this.tbodyClient);				
		});
	}
	
	returnClients(){
		return JSON.parse(localStorage.getItem("clients"));
	}
	
	returnEntries(){
		let entries = JSON.parse(localStorage.getItem("entries"));	
		return entries;
	}
	
	addOption(idSelect, value) {
    	let option = new Option(value, value);
    	let select = document.getElementById(idSelect);
    	select.add(option);
	}
	
	listInfoNewEntry(){
		let selectClient = document.querySelector("select#select-client");
		let clients = this.returnClients();
		let entries = this.returnEntries();
		let licensePlate = [];
		var index = -1;
		
		if(entries){
			for(let i in entries){			
				licensePlate[i] = entries[i].licensePlate;
			}
			
			for(let i in clients){
				if(licensePlate.indexOf(clients[i]._vehicle._licensePlate) === -1){
					this.addOption("select-client", clients[i]._name);					
				}
			}
		}else{
			for(let i in clients){
				let fullName = clients[i]._name + " " + clients[i]._surname;
				this.addOption("select-client", clients[i]._name, fullName);
			}			
		}
		selectClient.addEventListener("change", () => {
        	let selectedClient = selectClient.options[selectClient.selectedIndex].value;
               for(let i in clients){
					if(clients[i]._name === selectedClient) {
                     index = i;
                  }
				}
				this.clearSelect("select-vehicle");
				
				this.addOption("select-vehicle", clients[index]._vehicle._licensePlate);				
		}	
	)};
	
	clearSelect(idSelect){
		let select = document.getElementById(idSelect);			
		let i, L = select.options.length - 1;
	   	for(i = L; i >= 0; i--) {
	      select.remove(i);
	   	}
	}
}