class Movie {

	constructor() {
		let urlName = location.pathname.split('/')[2];
		this.number = 0;
		// this.name = jsonFilmer[urlName].title;
		// this.name = jsonFilmer[urlName].releaseYear;
		// this.name = jsonFilmer[urlName].runtime;
		this.showFilmInfo();
	}

	load(data){
		console.log(data);
		this.number = data.numberOfMovies;
	}
	getData(){
	}



	// Modal
	showFilmInfo() {

		// this が　ボタンの場所（.modal-test)になってる？
		$(document).on('click', '.modal-test', function () {
			let that = this;
			that.renderFilmInfo();
		});

	}



}