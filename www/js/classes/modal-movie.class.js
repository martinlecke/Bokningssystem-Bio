class ModalMovie extends Base {
	
	constructor(props){
		super();
    this.modalShowing = [];
    for (let name in props) {
 			if (name !== 'template') {
   		 this[name] = props[name];
 			}
		}
    let filteredShows = Data.shows.filter((shows)=>{
        // Removes all shows from past todays date 
        let time = new Date(shows.date + ' 23:59:59');
        console.log(new Date() < new Date(time.getTime()) && this.title == shows.film);
        return new Date() < new Date(time.getTime()) && this.title == shows.film;
      })
    filteredShows.forEach((show) => {
      this.modalShowing.push(new ModalShowing(show));
    });
    this.render('#modalmovie');
  }

  click() {
    $('#filmmodal').on('hidden.bs.modal', function (e){
      location.hash = "";
    });
  }

}