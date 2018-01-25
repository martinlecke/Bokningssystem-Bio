class Data{

	constructor(){
		this.load();
	}
	async load(){
		 JSON._classes(Movie);
		Data.movies = await JSON._load("film");
		Data.shows = await JSON._load("shows");
		
		app.start();	
	}
}