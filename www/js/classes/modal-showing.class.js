class ModalShowing extends Base {
	
	constructor(props){
		super();
		for(let name in props){
			if(['time', 'date', 'showid', 'film', 'unavailable', 'auditorium'].includes(name)){
				this[name] = props[name];
			}
		}
    this.salong = this.find(this.auditorium, 'salong', 'auditorium');
    this.seatsLeft = this.seatCalc();
	}

  find(find, where, property) {
    // Finds the show/auditorium and returns it by input arguments
    for (let i = 0; i < Data[where].length; i++) {
      if (Data[where][i][property] == find) {
        return Data[where][i]
      }
    }
  }

  seatCalc() {
    let calc = this.salong.seats - this.unavailable.length;
    return calc;
  }

  click() {
    if($(event.target).hasClass('pop')) {
      $('.modal-backdrop').remove();
    }
  }

}