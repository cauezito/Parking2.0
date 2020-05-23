let parkingController = new ParkingController(
	"form-new-client", "tbody-clients", "form-new-entry", "tbody-entries");


  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });
