class Data{

	constructor(){
		this.load();
	}
	async load(){
		JSON._classes(Movie, Show);
		Data.movies = await JSON._load("film");
		Data.upcomming = await JSON._load("premiar");
    Data.shows = await JSON._load("shows");
    
		app.start();	
	}
}