class Booking extends Base {

	constructor() {
		super();
		let urlName = location.pathname.split('/')[2];
		this.clickPlusOrdinary();
		this.clickPlusChild();
		this.clickPlusPensioner();
		this.clickMinusOrdinary();
		this.clickMinusChild();
		this.clickMinusPensioner();
		this.bookingAlert();
		this.bookingItems = [
			{
				type: 'ordinarie',
				text: 'Ordenarie'
			},
			{
				type: 'child',
				text: 'Barn (under 12år)'
			},
			{
				type: 'pensioner',
				text: 'Pensionär'
			}];

		this.bookingItems.forEach((button, i) => {
			this.bookingItems[i] = new BookingItem(button);
		});

		this.onRendered();

	} // Closes constructor



	onRendered() {
		this.calcTotalTickets();
		this.calcTotalPrice();
	}


	// Alert
	bookingAlert() {
		$(document).on('click', '#booking-alert', function () {
			alert('Tack för bokning! Vi skickade ett mail till dig.');
		});
	}


	// // // Save the booking info i JSON
	// // saveBookingInfo () {
	// 	$(document).on('click', '#booking-alert', function() {

	// 	});

	// //	JSON._save('bookinginfo.json', bookinginfo);
	// // }





	// Ticket - plus buttons
	clickPlusOrdinary() {
		$(document).on('click', '#plus-ordinarie', () => {
			let number = Number($('#number-ordinarie').text());
			number += 1;
			$('#number-ordinarie').val('');
			$('#number-ordinarie').html(number);
			this.onRendered();
		});
	}


	clickPlusChild() {
		$(document).on('click', '#plus-child', () => {
			let number = Number($('#number-child').text());
			number += 1;
			//		$('.number-child').val('');
			$('#number-child').html(number);
			this.onRendered();
		});
	}


	clickPlusPensioner() {
		$(document).on('click', '#plus-pensioner', () => {
			let number = Number($('#number-pensioner').text());
			number += 1;
			//		$('.number-pensioner').val('');
			$('#number-pensioner').html(number);
			this.onRendered();
		});
	}


	// Ticket - minus buttons
	clickMinusOrdinary() {
		$(document).on('click', '#minus-ordinarie', () => {
			let number = Number($('#number-ordinarie').text());
			if (number !== 0) {
				number -= 1;
				$('#number-ordinarie').html(number);
			}
			this.onRendered();
		});
	}


	clickMinusChild() {
		$(document).on('click', '#minus-child', () => {
			let number = Number($('#number-child').text());
			if (number !== 0) {
				number -= 1;
				$('#number-child').html(number);
			}
			this.onRendered();
		});
	}


	clickMinusPensioner() {
		$(document).on('click', '#minus-pensioner', () => {
			let number = Number($('#number-pensioner').text());
			if (number !== 0) {
				number -= 1;
				$('#number-pensioner').html(number);
			}
			this.onRendered();
		});
	}


	calcTotalTickets() {
		let ordinarieNr = Number($('#number-ordinarie').text());
		let childNr = Number($('#number-child').text());
		let pensionerNr = Number($('#number-pensioner').text());

		let sum = ordinarieNr + childNr + pensionerNr;
		if (sum !== 0) {
			$('#total-tickets').html(sum);
		}
	}


	calcTotalPrice() {
		let ordinarieNr = Number($('#number-ordinarie').text());
		let childNr = Number($('#number-child').text());
		let pensionerNr = Number($('#number-pensioner').text());
		let sum = (ordinarieNr * 85) + (childNr * 65) + (pensionerNr * 75);

		$('#number-ordinarie2').html(ordinarieNr);
		$('#number-child2').html(childNr);
		$('#number-pensioner2').html(pensionerNr);

		if (sum !== 0) {
			$('#amount').html(sum);
		}
	}


}





