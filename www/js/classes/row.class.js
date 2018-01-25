class Row extends Base {
  
  constructor(numSeats, seatStartIndex) {
    super();
    this.numSeats = numSeats;
    this.seatStartIndex = seatStartIndex;
    this.seats = [];
    for (var i = seatStartIndex; i < seatStartIndex+numSeats; i++) {
      this.seats.unshift(new Seat(i));
    }
  }
}