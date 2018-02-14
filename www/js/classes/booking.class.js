class Booking extends Base {

	constructor(showid) {
		super();
		this.auditorium = new Auditorium(showid);
		this.show = this.findShow(showid);
		this.movie = this.findMovie();
		this.clickPlusOrdinary();
		this.clickPlusChild();
		this.clickPlusPensioner();
		this.clickMinusOrdinary();
		this.clickMinusChild();
		this.clickMinusPensioner();

		Booking.markedSeats = [];
		this.bookingItems = [
			{
				type: 'ordinary',
				text: 'Ordinarie'
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
		Booking.showSeatNumber = this.showSeatNumber;
		this.randomGenerator();
		this.saveBookingDataToJson();
		// this.validateEmail();
		// this.validateMobileNr();
		this.bookingAlert();
		// this.showDate();
		this.getNumberOfTicksets();
	} // Closes constructor

	findShow(inparameter) {
		// Finds the show and return it
		for (let i = 0; i < Data.shows.length; i++) {
			if (Data.shows[i].showid == inparameter) {
				return Data.shows[i];
			}
		}
	}

	findMovie() {
		// Finds the show and return it
		for (let i = 0; i < Data.movies.length; i++) {
			if (Data.movies[i].title == this.show.film) {
				return Data.movies[i];
			}
		}
	}

	getNumberOfTicksets() {
		let calc = Number($('#number-ordinary').text()) +
			Number($('#number-child').text()) +
			Number($('#number-pensioner').text());
		Booking.selection = calc;
	}

	onRendered() {
		this.calcTotalTickets();
		this.calcTotalPrice();
		this.getNumberOfTicksets(); //updates selection
		$('.seatslefttopick').text(Booking.selection);
	}

	// Ticket - ordinary (plus button)
	clickPlusOrdinary() {
		$(document).on('click', '#plus-ordinary', () => {
			let number = Number($('#number-ordinary').text());
			number += 1;
			$('#number-ordinary').val('');
			$('#number-ordinary').html(number);
			this.onRendered();
		});
	}

	// Ticket - child (plus button)
	clickPlusChild() {
		$(document).on('click', '#plus-child', () => {
			let number = Number($('#number-child').text());
			number += 1;
			//		$('.number-child').val('');
			$('#number-child').html(number);
			this.onRendered();
		});
	}

	// Ticket - pensioner (plus button)
	clickPlusPensioner() {
		$(document).on('click', '#plus-pensioner', () => {
			let number = Number($('#number-pensioner').text());
			number += 1;
			//		$('.number-pensioner').val('');
			$('#number-pensioner').html(number);
			this.onRendered();
		});
	}

	// Ticket - ordinary (minus button)
	clickMinusOrdinary() {
		$(document).on('click', '#minus-ordinary', () => {
			let number = Number($('#number-ordinary').text());
			if (number !== 0) {
				number -= 1;
				$('#number-ordinary').html(number);
			}
			this.onRendered();
		});
	}

	// Ticket - child (minus button)
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

	// Ticket - pensioner (minus button)
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
		let ordinaryNr = Number($('#number-ordinary').text());
		let childNr = Number($('#number-child').text());
		let pensionerNr = Number($('#number-pensioner').text());
		let sum = ordinaryNr + childNr + pensionerNr;
		if (sum !== 0) {
			$('#total-tickets').html(sum + ' st');
		}
	}

	calcTotalPrice() {
		let ordinaryNr = Number($('#number-ordinary').text());
		let childNr = Number($('#number-child').text());
		let pensionerNr = Number($('#number-pensioner').text());
		let sum = (ordinaryNr * 85) + (childNr * 65) + (pensionerNr * 75);
		$('#number-ordinary2').html(ordinaryNr + ' st');
		$('#number-child2').html(childNr + ' st');
		$('#number-pensioner2').html(pensionerNr + ' st');
		if (sum !== 0) {
			$('#amount').html(sum + ' kr');
		}
	}

	showSeatNumber() {
		$('#seat-booking').empty();
		for (let seat of Booking.markedSeats) {
			// $('<li></li>').append('<span id="seat-booking">Stolnr: ' + seat.id + ' (' + 'Rad: ' + seat.row + ')</span>').appendTo('#seat-booking');
			$('<li></li>').append('<span id="row-booking">Rad: ' + seat.row + '</span><span class="ml-3" id="id-booking">Stolnr: ' + seat.id + '</span>').appendTo('#seat-booking');

		}
	}

	randomGenerator() {
		let that = this;
		$(document).one('click', '#email-booking', function (event) {  // .one = only first click
			let allBookingNumbers = [];
			for (let booking of Data.booking) {
				allBookingNumbers.push(booking.bookingNr);
			}
			let newBookingNumber;
			let character = 'abcdefghijklmnopqrstuvwxyz0123456789';
			while (!newBookingNumber || allBookingNumbers.includes(newBookingNumber)) {
				newBookingNumber = Math.random().toString(36).slice(-10);
			}
			this.bookingNr = newBookingNumber;
			// console.log(this);  
			$('.hide-text').show();
			$('#bookingNr-booking').html(this.bookingNr);
		});
	}



	// generateId() {
	// 	let userId = "";   // 前はuserId
	// 	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	// 	for (let i = 0; i < 6; i++) {
	// 		userId += possible.charAt(Math.floor(Math.random() * possible.length));   // 
	// 	}
	// 	return userId;
	// }



	// Save the booking info till JSON (Bug - バグ：電話番号にアルファベットも入力できてしまう)
	saveBookingDataToJson() {
		let that = this;
		$(document).on('click', '#booking-alert', function () {
			let title = $('#title-booking').text();
			let date = $('#date-booking').text();
			let time = $('#time-booking').text();
			let auditorium = $('#auditorium-booking').text();
			let ordinary = $('#number-ordinary2').text();
			let child = $('#number-child2').text();
			let pensioner = $('#number-pensioner2').text();
			let totalNr = $('#total-tickets').text();
			let amount = $('#amount').text();
			let bookingNr = $('#bookingNr-booking').text();
			let email = $('#email-booking').val();
			let mobile = $('#mobile-booking').val();
			let id = $('#id-booking').val();
			let row = $('#row-booking').val();
			// let seats = $('#seat-booking').val();

			// Här kommer några metoder
			// metod: check email address
			// metod: check telnr


			// Lägg till "seats" senare
			Data.booking.push(new BookingData(
				{
					title: title,
					date: date,
					time: time,
					auditorium: auditorium,
					tickets: [
						{
							ordinary: ordinary,
							child: child,
							pensioner: pensioner,
							totalNr: totalNr
						}
					],
					amount: amount,
					seats: [
						{
							// seat: seat,
							id: id,
							row: row
						}
					],
					bookingNr: bookingNr,
					mobile: mobile,
					email: email
				}
			));
			that.saveToJSON(Data.booking);
			// }
		});
	}

	saveToJSON(array) {
		JSON._save('booking.json', array);
	}

	bookingAlert() {
		$(document).on('click', '#booking-alert', function () {
			alert('Tack för bokning! Vi skickade ett mail till dig.');
		});
	}


}





