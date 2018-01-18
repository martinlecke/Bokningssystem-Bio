class App{
	constructor() {
		JSON._classes(Movie);
		this.movie = {};
		JSON._load('film.json').then(movie=>{
  		this.movie = movie;
  		// console.log(this.movie);
  		this.movie.forEach(thing=>{
  			// console.log(thing.title);
  		})
      new PopStateHandler();
		});
	}
}

