class Data{

	constructor(){
		this.load();
	}
	async load(){
		JSON._classes(Movie, UpcomingMovie, Show, User, BookingData);
		Data.movies = await JSON._load("film");
		Data.upcoming = await JSON._load("premiar");
    Data.shows = await JSON._load("shows");
		Data.booking = await JSON._load("booking");
    Data.salong = await JSON._load("salong");
    
		app.start();
	}
}