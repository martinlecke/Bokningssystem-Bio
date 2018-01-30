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
		this.calcTotalTickets();
		this.calcTotalPrice();
		this.bookingAlert();








		
	}


	// Alert
	bookingAlert() {
		$(document).on('click', '.bookning-alert', function () {
			alert('Tack för bokning! Vi skickade ett mail till dig.');
		});
	}


	// Ticket - plus and minus buttons
	clickPlusOrdinary() {
		$(document).on('click', '#plus-ordinarie', function () {
			let number = Number($('#number-ordinarie').text());
			number += 1;
			$('#number-ordinarie').val('');
			$('#number-ordinarie').html(number);
		});
	}


	// consoleで　$('.number-ordinarie').text();
	//　数字が出力する(consoleで)




	clickPlusChild() {
		$(document).on('click', '#plus-child', function () {
			let number = Number($('#number-child').text());
			number += 1;
			//		$('.number-child').val('');
			$('#number-child').html(number);
		});
	}


	clickPlusPensioner() {
		$(document).on('click', '#plus-pensioner', function () {
			let number = Number($('#number-pensioner').text());
			number += 1;
			//		$('.number-pensioner').val('');
			$('#number-pensioner').html(number);
		});
	}


	// Ticket - minus button
	clickMinusOrdinary() {
		$(document).on('click', '#minus-ordinarie', function () {
			let number = Number($('#number-ordinarie').text());
			if (number !== 0) {
				number -= 1;
				$('#number-ordinarie').html(number);
			}
		});
	}


	clickMinusChild() {
		$(document).on('click', '#minus-child', function () {
			let number = Number($('#number-child').text());
			if (number !== 0) {
				number -= 1;
				$('#number-child').html(number);
			}
		});
	}


	clickMinusPensioner() {
		$(document).on('click', '#minus-pensioner', function () {
			let number = Number($('#number-pensioner').text());
			if (number !== 0) {
				number -= 1;
				$('#number-pensioner').html(number);
			}
		});
	}



	// ??? 最初に＋でチケット増やす。その後、最初の３行をコンソール、その後、後半のコードをコンソールした時は、数字が入れ替わる
	// でも、実際にページで数字を変えても（ボタン）、変化なし
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
			$('.amount').html(sum);
		}
		
	}
	




}
