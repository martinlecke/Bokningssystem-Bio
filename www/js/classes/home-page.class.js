class HomePage extends Base {
	constructor(){
		super();
		this.slider = []
		for(let movie of Data.movies){
				this.slider.push(new CarouselItem(movie))
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

		// Startar slider om 0 sekunder! (nästa frame). Tidintervall på slider är 5 sekunder
		setTimeout(function(){
			$("#movieslider").carousel('cycle');
		}, 0);

	}
}