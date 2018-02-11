class Row extends Base {
  
  constructor(numSeats, seatStartIndex, unavailable, rowNumber) {
    super();
    this.numSeats = numSeats;
    this.seatStartIndex = seatStartIndex;
    this.seats = [];
    this.unavailable = unavailable;
    for (var i = seatStartIndex; i < seatStartIndex+numSeats; i++) {

      if(this.unavailable.indexOf(i) == -1) {
        this.seats.unshift(new Seat(i, true, rowNumber));
      } else {
        this.seats.unshift(new Seat(i, false, rowNumber));
      }
      console.log(seatStartIndex);
    }
  }
}