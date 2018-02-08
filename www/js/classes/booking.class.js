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
		//this.bookingData = [];  // クラスを作ったので、配列は不要？

		//  this.randomGenerator();
		this.randomBookingNr();
		//this.checkRandomNumber(date);

		this.saveBookingDataToJson();
		this.bookingAlert();


	} // Closes constructor


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
			// }

		});
	}


	saveToJSON(array) {
		JSON._save('booking.json', array);
	}





	// Make a random number
	randomGenerator() {
		let that = this;
		// let date = Data.booking[0].date;  // 仮のデーター
		// date = date.replace(/-/g, "");
		// date = date.split("-").join("");
		// date = date.slice(2, 8);
		// let number = date + 'N' + Math.floor(Math.random() * 2);
		//let number = date + 'N' + Math.floor(Math.random() * 2);

		let maxRandomNr = 3;
		if (maxRandomNr > Data.booking.length) {
			let date = Data.booking[0].date;  // 仮のデーター
			date = date.replace(/-/g, "");
			date = date.split("-").join("");
			date = date.slice(2, 8);
			let number = date + 'N' + Math.floor(Math.random() * maxRandomNr);
			console.log('Random number', number);
			that.checkRandomNumber(number);
		}
		return console.log('ランダム終了'); 



	}


	// 乱数が重複してないか、チェックする
	// Check the booking number if the number is not duplicated
	checkRandomNumber(number) {
		let that = this;


		// test - JSONのリストと同じ番号にする
		// number = '180214N0';


		for (let i = 0; i < Data.booking.length; i++) {
			 console.log('リスト　bookingNr:', Data.booking[i].bookingNr);
			// console.log('random number:', number);
			//ここまで確認済み! (arrayの数字が見える)	



			// If the random number and the number stored in 
			// booking.json are the same, make a new random number
			// 重複ありの場合(乱数を作り直す)
			if (Data.booking[i].bookingNr == number) {

				console.log('リストの中のbookingNr', Data.booking[i].bookingNr);
				console.log('random number　あり', number);
				console.log('重複している!!');

				// Make a new random nr 


				let number2 = number.substring(7, -1) + Math.floor(Math.random() * 2);
				console.log('number2: ', number2);  // type: string

				number = number2;
				that.checkRandomNumber(number);


				//Show the booking nr

				$('.hide-text').show();  // ここまでOK! (小さい数字で試す)
				return $('#bookingNr-booking').html(number2);

			}
			else if (Data.booking[i].bookingNr != number) {
				console.log('リストの中のbookingNr', Data.booking[i].bookingNr);  // typeof Data.booking[i].bookingNr -- type: string
				console.log('random number なし', number);  // typeof number -- type: number
				console.log('重複なし');

				$('.hide-text').show();  // ここまでOK! (小さい数字で試す)
				return $('#bookingNr-booking').html(number);
			}
			else { return console.log('ランダム終了'); }
		}

		// if(Data.booking[i].bookingNr == number) {
		// 	that.randomGenerator();   // これを入れるとループ
		// }
	}



	// 			// 重複なしの場合
	// 			if (Data.booking[i].bookingNr != number) {
	// 				console.log('リストの中のbookingNr', Data.booking[i].bookingNr);  // typeof Data.booking[i].bookingNr -- type: string
	// 				console.log('number', number);  // typeof number -- type: number

	// 				console.log('重複なし');
	// 				$('#bookingNr-booking').html(number);
	// 				$('.hide-text').show();  // ここまでOK! (小さい数字で試す)
	// 			}

	// // else if(Data.booking[i].bookingNr == number)
	// 			else {
	// 				console.log('リストの中のbookingNr', Data.booking[i].bookingNr);
	// 				console.log('number', number);
	// 				console.log('重複している!!');

	//  that.randomGenerator();
	// 	}




	// }


	// 	// 重複する場合
	// 	else if (randomArray[i] === number) {
	// 		// console.log('重複 & number', number);

	// 		that.randomGenerator();

	// 		// console.log('乱数を再度作る: ', number);   // 日付+ N + 乱数(t ex: 180214N0313) 作ったが、まだ表示されない
	// 		document.getElementById('bookingNr-booking').innerHTML = date;
	// 		$('.hide-text').show();



	// 	}
	// }

	// // randomArray.push(number);    // この1行を表示にすると永久にループ

	// // console.log('新しい乱数', number);
	// // console.log('randomArray最終', randomArray);
	// }




	// 乱数を作る（日付+ N + 乱数）
	// Make a booking number (date + N + random nr)
	randomBookingNr() {
		let that = this;
		$(document).on('keypress', '#email-booking', function (event) {
			that.randomGenerator();
			// that.checkRandomNumber(date); 	// date(引数)が入ってると、エラーになる(まだ完ぺきにメソッドが出来上がってないから？)


		});
	}



	// Alert
	bookingAlert() {
		$(document).on('keyup', '#booking-alert', function () {
			alert('Tack för bokning! Vi skickade ett mail till dig.');
		});
	}






}



