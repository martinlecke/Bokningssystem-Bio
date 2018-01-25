class Bookingpage {

	constructor() {
		let urlName = location.pathname.split('/')[2];
		this.bookingAlert();

	}


	// Alert
	bookingAlert() {
		$(document).on('click', '.bookning-alert', function () {
			alert('Vi skickade ett mail till dig. Ditt bokningsnummer är: xxxx.');
		});
	}
}
