class CarouselItem extends Base {

	constructor(props){
		super();
    Object.assign(this, props);
	}

  click() {
    $('#modalmovie').empty();
    this.clickedMovie = new ModalMovie(this);
  }

}
