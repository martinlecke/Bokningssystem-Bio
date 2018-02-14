class Seat extends Base {
  
  constructor(id, available, rowNumber) {
    super();
    this.id = id;
    this.available = available;
    this.marked = false;
    this.row = rowNumber;
  }

  click() {
    if(!$(event.target).hasClass('booked')) {
      if(this.marked == true) {
        this.marked = false;
        $(event.target).removeClass('clicked');
        let co = 0;
        for (let marked of Booking.markedSeats) {
          if (marked.id == this.id) Booking.markedSeats.splice(co, 1);
          co++;
        }
      } else if (Booking.selection - Booking.markedSeats.length !== 0 )  {
        this.marked = true;
        Booking.markedSeats.push({id: this.id, row: this.row});
        $(event.target).addClass('clicked')
      }
      Booking.showSeatNumber();
    }
  }

} // /class