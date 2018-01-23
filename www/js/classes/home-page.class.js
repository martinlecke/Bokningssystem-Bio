class HomePage extends Base {
	constructor(){
		super();
		this.slider = []
		for(let movie of Data.movies){
			if (movie.title == "All the Money in the World"){
				this.slider.push(new CarouselItem(movie))
			}
			if (movie.title == "Django"){
				this.slider.push(new CarouselItem(movie))
			}
			if (movie.title == "Transformers: The Last Knight"){
				this.slider.push(new CarouselItem(movie))
			}
		}
		this.today = [
		// for(let movie of Data.movies){
		// 	if (movie.title == "All the Money in the World"){
		// 		this.today.push(new Showing);
		// 	}
		// }
		];
		this.tomorrow = [
		// for(let movie of Data.movies){
		// 	if (movie.title == "All the Money in the World"){
		// 		this.today.push(new Showing);
		// 	}
		// }
		]; 

	}
}