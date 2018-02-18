class MyBookedShow extends Base {
	
	constructor(props){
		super();
    Object.assign(this, props);
    this.seatAndRows = [];
		for (let seat of this.seats) {
      this.seatAndRows.push(new MyBookedSeats(seat.id, seat.row))
    }
	}
}