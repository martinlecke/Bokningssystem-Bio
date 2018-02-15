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
		this.bookingData = [];  // クラスを作ったので、配列は不要？

		this.randomGenerator();
		this.randomBookingNr();
		//this.checkRandomNumber(date);

		this.saveBookingDataToJson();
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
			// }

		});
	}


	saveToJSON(array) {
		JSON._save('booking.json', array);
	}







	// 乱数を作る（日付+ N + 乱数）
	randomBookingNr() {
		$(document).on('keypress', '#email-booking', function (event) {


			let date = Data.booking[0].date;
			// console.log('before date: ', date);
			date = date.replace(/-/g, "");
			date = date.split("-").join("");
			//	console.log('efter date: ', date);

			date = date.slice(2, 8);
			date = date + 'N' + Math.floor(Math.random() * 1001);
			console.log('finally date: ', date);   // 日付+ N + 乱数(t ex: 180214N0313) 作ったが、まだ表示されない

			// let that = this;
			// that.checkRandomNumber(date);


			// ここから、他のメソッドにしたい



			let randomArray = [];
			randomArray.push(date);


			console.log('randomArray', randomArray);  // ok! （arrayに数字が入った）

			for (let i = 0; i < randomArray.length; i++) {
				// console.log('array i:', randomArray[i]);   //ok! (arrayの数字が見える)
				// console.log('date:', date);   // ok! (dateの数が見える)　上下同じ数字



				// 重複なしの場合
				if (randomArray[i] !== date) {

					// console.log('重複なし & date', date);
					document.getElementById('bookingNr-booking').innerHTML = date + '重複なし';
					$('.hide-text').show();
				}
				// 重複する場合
				else if (randomArray[i] === date) {
					console.log('重複 & date', date);

					// test test start
					//　ランダムを作るコード
					date = Data.booking[0].date;
					console.log('before 2 date: ', date);
					date = date.replace(/-/g, "");
					date = date.split("-").join("");
					console.log('efter2  date: ', date);

					date = date.slice(2, 8);
					date = date + 'N' + Math.floor(Math.random() * 1001);



					console.log('乱数を再度作る: ', date);   // 日付+ N + 乱数(t ex: 180214N0313) 作ったが、まだ表示されない
					document.getElementById('bookingNr-booking').innerHTML = date + '新しい乱数';
					$('.hide-text').show();


					console.log('新しい乱数', date);
					console.log('randomArray最終', randomArray);
					// randomArray.push(date);    // これを表示すると永久にループ
					// test test end



				}


			}
			// }

		});
	}




	// 新しいメソッド

	randomGenerator() {
  
		let date = Data.booking[0].date;  // 仮のデーター
		console.log('before date: ', date);
		date = date.replace(/-/g, "");
		date = date.split("-").join("");
			console.log('efter date: ', date);

		date = date.slice(2, 8);
		date = date + 'N' + Math.floor(Math.random() * 1001);
		console.log('finally date: ', date);   // 日付+ N + 乱数(t ex: 180214N0313) 作ったが、まだ表示されない

	}


	// Check the booking number if the number is not duplicated
	// 乱数が重複してないか、チェックする
	// checkRandomNumber(date) {


	// }




	// console.log('before randomArray', randomArray);
	// console.log('beforerandomNr', randomNr);

	// 	for (let i = 0; i < randomArray.length; i++) {
	// 		if(randomArray[i] !== randomNr) {
	// 			randomArray.push(randomNr);
	// 		}
	// 	}

	// console.log('after randomArray', randomArray);	




	// $(document).on('keypress', '#email-booking', function (event) {

	// 	randomArray.push(Math.floor(Math.random() * 11));



	// 	document.getElementById('bookingNr-booking').innerHTML = (date + 'N' + Math.floor(Math.random() * 1001));
	// 	$('.hide-text').show();
	// });
	// }









	// Alert
	bookingAlert() {
		$(document).on('keyup', '#booking-alert', function () {
			alert('Tack för bokning! Vi skickade ett mail till dig.');
		});
	}






}



