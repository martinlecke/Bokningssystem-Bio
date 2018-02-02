class MoviePage extends Base {
	
	constructor(){
		super();
		this.currentMovie = []
		this.upcomingMovie = []
		
		for(let movie of Data.movies){
			this.currentMovie.push(new CurrentMovie(movie))
		}
		
		for(let movie of Data.upcoming){
			this.upcomingMovie.push(new UpcomingMovie(movie))
		}

	}
}