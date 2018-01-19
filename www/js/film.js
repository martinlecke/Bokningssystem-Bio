class Movie{
	
	constructor(){
		let urlName = location.pathname.split('/')[2];
		this.number = 0;
		// this.name = jsonFilmer[urlName].title;
		// this.name = jsonFilmer[urlName].releaseYear;
		// this.name = jsonFilmer[urlName].runtime;

		// this.title = title;
		// this.productionYear = productionYear;
		// this.length = length;
		// this.genre = genre;
		// this.language = language;
		// this.director = director;
		// this.actors = actors;
		// this.description = description;
		// this.images = images;
		// this.youtubeTrailers = youtubeTrailers;
	}




	load(data){
		console.log(data);
		this.number = data.numberOfMovies;
	}

	getData(){
	}






}