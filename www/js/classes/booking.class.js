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
		this.randomBookingNr();
		this.saveBookingDataToJson();
		// this.validateEmail();
		//this.validateMobileNr();
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
    let calc = Number( $('#number-ordinary').text()) +
               Number( $('#number-child').text()) + 
               Number( $('#number-pensioner').text());
    Booking.selection = calc;
  }

	onRendered() {
		this.calcTotalTickets();
		this.calcTotalPrice();
    this.getNumberOfTicksets(); //updates selection
    $('.seatslefttopick').text(Booking.selection);
	}

	// refaktorering  - test metod

	//clickPlus() {
	// let type = [ordinary, child, pensioner];
	// 	$(document).on('click', '#plus-${this.bookingItems.type}', () => {
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
		$(document).one('click', '#email-booking', function (event) {  // .one = only first click
			that.randomGenerator();
		});
	}

	setDate(){
		// Temporary method because we should set the date depending of what screening is chosen
		// when creating this booking object...
		let d = new Date();
		let year = d.getFullYear();
		let month = d.getMonth() + 1;
		if(month < 10){ month = "0" + month;}
		let date = d.getDate();
		if(date < 10){ date = "0" + date};
		this.date =  year + '-' + month + '-' + date;
	}


	// ??? 予約したい映画のindex番号が入るようにしたい (マーティンに訊く)
	// Make a random nr
	randomGenerator() {

		this.setDate(); // We must have a booking date before creating the random booking number

		let allBookingNumbers = [];
		for(let booking of Data.booking){
			allBookingNumbers.push(booking.bookingNr);
		}

		let maxRandomNr = 3;

		if(allBookingNumbers.includes(this.date.replace(/-/g,'') + 'N' + (maxRandomNr - 1))){
			throw(new Error("There is no random number left to use."))
		}

		let newBookingNumber;
		while (!newBookingNumber || allBookingNumbers.includes(newBookingNumber)){
			newBookingNumber = this.date.replace(/-/g,'') + 'N' + Math.floor(Math.random() * maxRandomNr);
		}

    this.bookingNr = newBookingNumber;

		console.log(this);  // randomNr

		/*let that = this;
		let maxRandomNr = 3;  // temporary nr (仮の番号)
		if (maxRandomNr > Data.booking.length) {
			let date = Data.booking[0].date;     // ????? test - [0] = 180214N0 (ここに予約したい映画のindex番号が入るようにしたい)
			date = date.replace(/-/g, "");
			date = date.slice(2, 8);
			let number = date + 'N' + Math.floor(Math.random() * maxRandomNr);
			console.log('Random number', number);
			that.checkRandomNumber(number);
		}
		return console.log('There is not random nr left.');  // test - if the random number exceeds the max number, random nr isn't created (ランダム終了)
	}


	// ??? バグ - 0 と 2　だけが出現する 
	// Check the booking number if the number is not duplicated（乱数が重複してないか、チェック）
	checkRandomNumber(number) {
		let that = this;
		for (let i = 0; i < Data.booking.length; i++) {
	//		console.log(Data.booking[i].bookingNr + ' is already saved in JSON');

// test start


			// If there is already the random nr in JSON, make a new random nr // 重複あるの時は、乱数を作り直す
			if (Data.booking[i].bookingNr != number) {  // typeof: string & number
				console.log('Random nr(' + number + ') is NOT saved in JSON (= 重複なし)');  // typeof Data.booking[i].bookingNr -- type: string
				$('.hide-text').show();
				$('#bookingNr-booking').html(number);  // return を取り除く
			}
			else if (Data.booking[i].bookingNr == number) {
				console.log('Random nr(' + number + ') is duplicated (= 重複)');

				// Make a new random nr
				let newRandomNr = number.substring(7, -1) + Math.floor(Math.random() * 3);  // maxRandom = 3;
				console.log(newRandomNr + ' is a new random nr (= 再度、乱数を作成)');  // type: string
				number = newRandomNr;
				that.checkRandomNumber(number);
			}

			
// test end



		}  // close for-loop */
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


	saveToJSON(array) {
		JSON._save('booking.json', array);
	}



	// Alert
	bookingAlert() {
		$(document).on('click', '#booking-alert', function () {
			alert('Tack för bokning! Vi skickade ett mail till dig.');
		});
	}







}





