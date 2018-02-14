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
		this.wrongEmail = true;   // 最初は入力できる状態にしておく
		this.wrongMobile = true;

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
		this.validateEmail();
		this.validateMobileNr();
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
      this.auditorium.render();
      Booking.markedSeats = [];
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
      this.auditorium.render();
      Booking.markedSeats = [];
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
      this.auditorium.render();
      Booking.markedSeats = [];
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
			$('<li></li>').append('Rad: <span  class="mr-3 row-booking">' + seat.row + '</span>Stolnr: <span class="id-booking">' + seat.id + '</span>').appendTo('#seat-booking');
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



	validateMobileNr() {
		$(document).on('keyup', '#mobile-booking', () => {
			let mobile = Number($('#mobile-booking').val());
			console.log(mobile.length);
			console.log(typeof mobile);
			if (mobile === '' || !mobile.length === 10) {
				$('#booking-alert').attr('data-content', 'Ange rätt mobilnummer');
				$('#booking').popover('show');
				this.wrongMobile = true;
			}
			else if (!mobile.includes('+') && !mobile.length === 12) {
				$('#booking-alert').attr('data-content', 'Ange "+" och landnummer');
				$('#booking').popover('show');
				this.wrongMobile = true;
			}
			else {
				$('#mobile-booking').popover('hide');
				this.wrongMobile = false;   // 間違いじゃない、保存できる
			}
		});
	}

	validateEmail() {
		$(document).on('keyup', '#email-booking', () => {
			let email = $('#email-booking').val();
			// if (email === '') {
			// 	$('#email-booking').attr('data-content', 'Ange email adress');
			// 	$('#email-booking').popover('show');
			// 	this.wrongEmail = true;
			// }
			if (!email.includes('@') || !email.includes('.') || email === '') {
				$('#booking-alert').attr('data-content', 'Ange rätt email adress');
				$('#booking').popover('show');
				this.wrongEmail = true;   // 間違いがある
			}
			else {
				$('#email-booking').popover('hide');
				this.wrongEmail = false;   // 間違いじゃない、保存できる
			}
		});
	}

	// Save the booking info till JSON (Bug - バグ：電話番号にアルファベットも入力できてしまう)
	saveBookingDataToJson() {
		let that = this;
		$(document).on('click', '#booking-alert', function () {

			if (that.wrongEmail == true || that.wrongMobile == true) {   // ここに　||　で付け足す    // もし間違いが入力されたら、ボタンが押せない
				return;
			}

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


			let jqueryIds = $('.id-booking');  // det är array

			let seats = [];
			for (let id of jqueryIds) {
				seats.push({
					id: $(id).text(),   // text は最初の一個しか保存できない、２つ以上になると、繋がって出力される
					row: $(id).prev('.row-booking').text()    // prev = 1つ上の（ここでは、１つ上のspan）
				});
			}

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
					seats: seats,　　　// 上で配列を作ったので、ここでは他のと一緒の形式
					bookingNr: bookingNr,
					mobile: mobile,
					email: email
				}
			));
			that.saveToJSON(Data.booking);
			alert('Tack för bokning! Vi skickade ett mail till dig.');
		});
	}

	saveToJSON(array) {
		JSON._save('booking.json', array);
	}


}





