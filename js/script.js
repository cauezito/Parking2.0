let parkingController = new ParkingController("form-new-client");
let btnNewClient = document.querySelector("a#new-client");
let cardNewClient = document.querySelector("div#card-new-client");

btnNewClient.addEventListener("click", () =>{
	cardNewClient.classList.remove('hide')
});
