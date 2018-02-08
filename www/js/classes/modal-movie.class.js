class ModalMovie extends Base {
	
	constructor(props){
		super();
    for (let name in props) {
 			if (name !== 'template') {
   		this[name] = props[name];
 			}
		}

		this.modalShowing = []
		for(let movie of Data.shows.slice(0, 7)){
				this.modalShowing.push(new ModalShowing(movie))
		}

		// let movie = $(this).data('movie');
    //   movie = movie.replace(/[, :']/g, "").toLowerCase();
    //   movie = movie.replace(/[åä]/g, "a");
    //   movie = movie.replace(/[ö]/g, "o");
    //   return movie;

    this.render('#modalmovie');

	}		
}