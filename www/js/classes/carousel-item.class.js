class CarouselItem extends Base {

	constructor(props){
		super();
    Object.assign(this, props);
	}

  click() {
    $('#modalmovie').empty();
    /// its not this that should be passed to modalmovie
    this.clickedMovie = new ModalMovie(this);
  }

}
