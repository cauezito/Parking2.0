class ClientsController{
    constructor(formNewClient, tbodyClient){
        this.formNewClient = document.getElementById(formNewClient);
		this.tbodyClient = document.getElementById(tbodyClient);
        this.addEventsClientsPage();
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
			this.addLineTableClient(client, this.tbodyClient);
			this.refreshOption();
		});
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
		client.vehicle = vehicle;
		return new Client(client);
	}
    
    addLineTableClient(values, tbody){
		let tr = this.getTrClient(values);
		tbody.appendChild(tr);		
    }
    
    getTrClient(dataClient, tr = null){
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
    
    listClients(){
		let clients = this.returnClients();
		clients.forEach(dataClient => {
			let client = new Client();							
			client.loadFromJSON(dataClient);
			this.addLineTableClient(client, this.tbodyClient);				
		});
    }
    
    returnClients(){
		let clients = Formatter.JSONFormat(localStorage.getItem("clients"));
		if(clients) return clients
		else return clients = [];
	}
}