class Seat extends Base {
  
  constructor(id, available) {
    super();
    this.id = id;
    this.available = available;
    this.marked = false;
  }

  click() {
    if(!$(event.target).hasClass('booked')) {
      if(this.marked == true) {
        this.marked = false;
        $(event.target).removeClass('clicked')
        let index = Booking.markedSeats.indexOf(this.id);
        if(index !== -1) {
          Booking.markedSeats.splice(index, 1);
        }
      } else if (Booking.selection - Booking.markedSeats.length !== 0 )  {
        this.marked = true;
        Booking.markedSeats.push(this.id);
        $(event.target).addClass('clicked')
      }
    }
    console.log(this);
  }

} // /class