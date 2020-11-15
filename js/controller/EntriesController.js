class EntriesController {
    constructor(formNewEntry, tbodyEntry) {
        this.formNewEntry = document.getElementById(formNewEntry);
        this.tbodyEntry = document.getElementById(tbodyEntry);
        this.addEventsIndexPage();
    }

    addEventsIndexPage() {
        let addNewEntry = document.querySelector("a#add-new-entry");
        let cardEntry = document.querySelector("div#card-entry");
        let cardNewEntry = document.querySelector("div#card-new-entry");
        let closeNewEntry = document.querySelector("a#close-new-entry");
        let closeService = document.querySelector("a#close-service");
        let submitCloseService = document.querySelector("button#submit-close-entry");

        this.listEntries();

        addNewEntry.addEventListener("click", () => {
            //this.clearSelect("select-client");
            this.listInfoNewEntry();
            this.showMessageError();
        });

        closeService.addEventListener("click", () => {
            this.listInfoCloseService();
        })

        closeNewEntry.addEventListener("click", () => {
            cardEntry.classList.remove('m6');
            cardEntry.classList.add('m12');
            cardNewEntry.classList.add('hide');
        });

        submitCloseService.addEventListener("click", () => {
            let selectClient = document.querySelector("select#select-client-remove");

            if(!this.checkSelect(selectClient)){
                M.toast({html: 'Please, select a client!'})
            } else {
                //remove record
            }
        });

        this.formNewEntry.addEventListener("submit", (e) => {
            e.preventDefault();
            let entry = this.createEntry(this.formNewEntry);
            entry.save();
            this.formNewEntry.reset();
            this.clearSelect("select-vehicle");
            this.addLineTableEntry(entry, this.tbodyEntry);
            this.refreshSelect("select-client", entry.owner._name);
        });
    }

    refreshSelect(sel, name) {
        let select = document.getElementById(sel);
        for (let i = 0; i < select.length; i++) {
            if (select.options[i].value === name) {
                select.remove(i);
            }
        }
    }

    createEntry(formNewEntry) {
        let dataUser = [];
        let isValid = true;
        [...formNewEntry.elements].forEach(function(field) {

            /* validation
			
            */
            dataUser[field.name] = field.value;
        });

        //if(!isValid) return false;

        let client = Client.getOneClient(dataUser.client);
        let newClient = Formatter.JSONFormat(JSON.stringify(client));
        return new Entry(newClient);
    }

    addLineTableEntry(values, tbody) {
        let entry = JSON.stringify(values);
        let tr = this.getTrEntry(Formatter.JSONFormat(entry));
        tbody.appendChild(tr);
    }

    getTrEntry(dataEntry, tr = null) {
        if (tr === null) {
            tr = document.createElement('tr');
        }
        tr.dataset.entry = JSON.stringify(dataEntry);
        tr.innerHTML = `
        <td>${dataEntry.owner.name+ ' ' + dataEntry.owner.surname}</td>
        <td>${dataEntry.owner.vehicle.licensePlate+ ' ' + dataEntry.owner.vehicle.model}</td>
		<td>${dataEntry.date}</td>`
        return tr;
    }



    listEntries() {
        let entries = this.returnEntries();
        entries.forEach(data => {
            let entry = new Entry();
            entry.loadFromJSON(data);
            this.addLineTableEntry(entry, this.tbodyEntry);
        });
    }

    returnClients() {
        let clients = Formatter.JSONFormat(localStorage.getItem("clients"));
        if (clients) return clients
        else return clients = [];
    }

    returnEntries() {
        let entries = Formatter.JSONFormat(localStorage.getItem("entries"));
        if (entries) return entries
        else return entries = [];
    }

    addOption(idSelect, value) {
        let option = new Option(value, value);
        let select = document.getElementById(idSelect);
        select.add(option);
    }

    listInfoNewEntry() {
        let selectClient = document.querySelector("select#select-client");
        let clients = this.returnClients();
        let entries = this.returnEntries();
        let licensePlate = [];
        var index = -1;

        if (entries) {
            for (let i in entries) {
                licensePlate[i] = entries[i].owner.vehicle.licensePlate;
            }

            for (let i in clients) {
                if (licensePlate.indexOf(clients[i].vehicle.licensePlate) === -1) {
                    this.addOption("select-client", clients[i].name);
                }
            }
        } else {
            for (let i in clients) {
                let fullName = clients[i].name + " " + clients[i].surname;
                this.addOption("select-client", clients[i].name, fullName);
            }
        }
        selectClient.addEventListener("change", () => {
            let selectedClient = selectClient.options[selectClient.selectedIndex].value;
            for (let i in clients) {
                if (clients[i].name === selectedClient) {
                    index = i;
                }
            }
            this.clearSelect("select-vehicle");
            this.addOption("select-vehicle", clients[index].vehicle.licensePlate);
        });
    };

    listInfoCloseService() {
        let selectClient = document.querySelector("select#select-client-remove");
        let clients = this.returnClients();
        let entries = this.returnEntries();
        let event = new Event('change');
        var index = -1;

        if (entries) {
            this.clearSelect("select-client-remove");
            

            for (let i in entries) {
                this.addOption("select-client-remove", entries[i].owner.name);
            }

            selectClient.addEventListener("change", () => {
                let selectedClient = selectClient.options[selectClient.selectedIndex].value;
                for (let i in clients) {
                    if (clients[i].name === selectedClient) {
                        index = i;
                    }
                }
    
                this.clearSelect("select-vehicle-remove");
                this.addOption("select-vehicle-remove", clients[index].vehicle.licensePlate);
            });
    
            selectClient.dispatchEvent(event);
            
        }        
        
    };

    checkSelect(select){
        if(select.selectedIndex === 0){
            return false;
        } else {
            return true;
        }
    }

    clearSelect(idSelect) {
        let select = document.getElementById(idSelect);
        let i, L = select.options.length - 1;
        for (i = L; i >= 0; i--) {
            select.remove(i);
        }
    }

    showMessageError() {
        let selectClient = document.getElementById("select-client");
        if (selectClient.length === 1) {
            let elemensToast = document.querySelector("div#modalNewEntry");
            elemensToast.addEventListener("focus", () => {
                let instanceToast = M.toast({
                    html: 'There are no customers available. Register a new one!',
                    classes: 'rounded'
                });
            });
        }
    }
}