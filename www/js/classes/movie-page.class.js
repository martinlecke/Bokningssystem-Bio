class MoviePage extends Base {
	
	constructor(){
		super();
		this.currentMovie = []
		for(let movie of Data.movies){
				this.currentMovie.push(new CurrentMovie(movie))
		}
	}
}