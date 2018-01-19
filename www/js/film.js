class Movie{
	
	constructor(){
		let urlName = location.pathname.split('/')[2];
		this.number = 0;
		// this.name = jsonFilmer[urlName].title;
		// this.name = jsonFilmer[urlName].releaseYear;
		// this.name = jsonFilmer[urlName].runtime;
	}

	load(data){
		console.log(data);
		this.number = data.numberOfMovies;
	}
	getData(){
	}
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})