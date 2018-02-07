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

		this.bookingItems = [
			{
				type: 'ordinary',
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
		// this.bookingData = [];  // クラスを作ったので、配列は不要？
		this.randomBookingNr();
		this.saveBookingDataToJson();
		this.bookingAlert();


	} // Closes constructor


	// コンソールだけで動作していたメソッドが、このコードのおかげで、メソッドとして動くようになった
	onRendered() {
		this.calcTotalTickets();
		this.calcTotalPrice();
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
		let that = this;
		let ordinaryNr = Number($('#number-ordinary').text());
		let childNr = Number($('#number-child').text());
		let pensionerNr = Number($('#number-pensioner').text());
		let sum = ordinaryNr + childNr + pensionerNr;
		if (sum !== 0) {
			$('#total-tickets').html(sum + ' st');
		}
		that.randomBookingNr();
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


	// Save the booking info till JSON (バグ：電話番号にアルファベットも入力できてしまう)
	saveBookingDataToJson() {
		let that = this;

		// $("#mobil-error").empty();
		// $("#email-error").empty();

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



			// Bootstrapのエラーメッセージでなく、こっちを使いたい

			//  if (mobile === '') {
			// 	$('#booking-alert').attr('data-content', 'Ange mobilnummer');
			// 	$('#booking-alert').popover('show');
			// }
			// else if (email === '') {
			// 	$('#booking-alert').attr('data-content', 'Ange email adress');
			// 	$('#booking-alert').popover('show');
			// }
			// else if (!email.includes('@')) {
			// 	$('#booking-alert').attr('data-content', 'Ange rätt email adress');
			// 	$('#booking-alert').popover('show');
			// }
			// else if (!mobile.match(/^[0-9]+$/)) {
			// 	$('#booking-alert').attr('data-content', 'Ange rätt mobil nummer');
			// 	$('#booking-alert').popover('show');
			// }
			// else {
			// 	// location.replace('/bokningssida');
			// 	$('#booking-alert').popover('hide');
			// 	// }




			// else if (mobile !== '' && email !== '') {

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
					// seats: [
					// 	{
					// 		row: row,
					// 		seatnumber: number
					// 	}
					// ],
					bookingNr: bookingNr,
					mobile: mobile,
					email: email
				}
			));
			that.saveToJSON(Data.booking);
		});
	}


	saveToJSON(array) {
		JSON._save('booking.json', array);
	}


	// Make a random number
	randomGenerator() {
		let that = this;
		let date = Data.booking[0].date;  // test data (仮のデーター)
		date = date.replace(/-/g, "");
		date = date.split("-").join("");
		date = date.slice(2, 8);
		let number = date + 'N' + Math.floor(Math.random() * 3);
		that.checkRandomNumber(number);
	}


	// 乱数が重複してないか、チェックする
	// Check the booking number if the number is not duplicated
	checkRandomNumber(number) {
		// console.log('typeof number - impara:', typeof number);
		let that = this;

		// test 
		// number = '180214N732';  // test - the same number in booking.json (JSONのリストと同じ番号にする)

		for (let i = 0; i < Data.booking.length; i++) {

			// the numbers are duplicated (重複ありの場合)
			if (Data.booking[i].bookingNr === number) {

				console.log('typeof リストの中のbookingNr', Data.booking[i].bookingNr);  // typeof Data.booking[i].bookingNr -- type: string
				console.log('typeof number', number);  // typeof number -- type: number
				console.log('重複している!!'); // the numbers are duplicated

				// that.randomGenerator();   // これを入れるとループになる。（このランダムのメソッドを使いたい）

				let date = Data.booking[0].date;
				date = date.replace(/-/g, "");
				date = date.split("-").join("");
				date = date.slice(2, 8);
				let number2 = date + 'N' + Math.floor(Math.random() * 3);
				console.log('typeof number2: ', typeof number2);
				$('#bookingNr-booking').html(number2);
				$('.hide-text').show();  // A reservation number appears

			}
			else if (Data.booking[i].bookingNr !== number) {
				// console.log('bookingNr(booking.json)', Data.booking[i].bookingNr);  
				// console.log('number', number);
				// console.log('重複なし'); 	 // the numbers are NOT duplicated
				$('#bookingNr-booking').html(number);
				$('.hide-text').show();  // (バグ: リフレッシュしても、文字が消えない)
			}
			else { return; }
		}
	}





	// 乱数を作る（日付+ N + 乱数）
	// Make a booking number (date + N + random nr)
	randomBookingNr() {
		let that = this;
		that.randomGenerator();
	}


	// Alert
	bookingAlert() {
		$(document).on('keyup', '#booking-alert', function () {
			alert('Tack för bokning! Vi skickade ett mail till dig.');
		});
	}






}



