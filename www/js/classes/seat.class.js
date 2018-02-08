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
        let index = Booking.markedSeats.indexOf(this.id);
        if(index !== -1) {
          Booking.markedSeats.splice(index, 1);
        }
      } else {
        this.marked = true;
        Booking.markedSeats.push(this.id);
      }
      $(event.target).toggleClass('marked')
    }
  }

  mouseenter() {
    $(event.target).addClass('hover-marked')
  }
  
  mouseleave() {
    $(event.target).removeClass('hover-marked')
  }

} // /class