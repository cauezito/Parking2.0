let parkingController = new ParkingController(
	"form-new-client", "tbody-clients");


  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });
