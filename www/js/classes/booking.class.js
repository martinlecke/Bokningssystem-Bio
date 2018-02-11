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
		this.randomBookingNr();
		this.saveBookingDataToJson();
		// this.validateEmail();
		//this.validateMobileNr();
		this.bookingAlert();

	} // Closes constructor


	onRendered() {
		this.calcTotalTickets();
		this.calcTotalPrice();
	}

	// test - metod

	//clickPlus() {
	// let type = [ordinary, child, pensioner];
	// 	$(document).on('click', '#plus-this.bookingItems.type', () => {
	// 		let number = Number($('#number-ordinary').text());
	// 		number += 1;
	// 		$('#number-ordinary').val('');
	// 		$('#number-ordinary').html(number);
	// 		this.onRendered();
	// 	});
	// }


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


	// Make a booking number (date + N + random nr)
	randomBookingNr() {
		let that = this;
		$(document).on('keypress', '#email-booking', function (event) {
			that.randomGenerator();
		});
	}



	// Make a random nr
	randomGenerator() {
		let that = this;
		let maxRandomNr = 3;  // temporary nr (仮の番号)
		if (maxRandomNr > Data.booking.length) {
			let date = Data.booking[0].date; 
			date = date.replace(/-/g, "");
			date = date.split("-").join("");
			date = date.slice(2, 8);
			let number = date + 'N' + Math.floor(Math.random() * maxRandomNr);
			console.log('Random number', number);
			that.checkRandomNumber(number);
		}
		return console.log('There is not random nr left.');  // If the random number exceeds the max number, random nr isn't created (ランダム終了)
	}

	
	// Check the booking number if the number is not duplicated（乱数が重複してないか、チェック）
	checkRandomNumber(number) {
		let that = this;
		// number = '180214N0';  // test - JSONのリストと同じ番号にする

		for (let i = 0; i < Data.booking.length; i++) {
			console.log('The number already saved in JSON:', Data.booking[i].bookingNr);　
			// console.log('random number:', number);

			// If the random number and the number stored in 
			// booking.json are the same, make a new random number
			// 重複ありの場合(乱数を作り直す)
			if (Data.booking[i].bookingNr == number) {
				console.log('random nr (重複用): ', number);
				console.log('It is dplicate! 重複している');

				// Make a new random nr 
				let number2 = number.substring(7, -1) + Math.floor(Math.random() * 2);
				console.log('number2(new): ', number2);  // type: string
				number = number2;
				that.checkRandomNumber(number);

				//Show the booking nr
				$('.hide-text').show();
				return $('#bookingNr-booking').html(number2);
			}
			else if (Data.booking[i].bookingNr != number) {
				console.log('リストbookingNr(なし)', Data.booking[i].bookingNr);  // typeof Data.booking[i].bookingNr -- type: string
				console.log('random nr (なし)', number);  // typeof number -- type: number
				console.log('重複なし');

				$('.hide-text').show();
				return $('#bookingNr-booking').html(number);
			}
			else { return console.log('ランダム終了'); }  // 消す?
		}
	}


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
			// }
		});
	}

	
	// Alert
	bookingAlert() {
		$(document).on('keyup', '#booking-alert', function () {
			alert('Tack för bokning! Vi skickade ett mail till dig.');
		});
	}







}





