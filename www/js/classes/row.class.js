class Row extends Base {
  
  constructor(numSeats, seatStartIndex, unavailable, rowNumber) {
    super();
    this.numSeats = numSeats;
    this.seatStartIndex = seatStartIndex;
    this.seats = [];
    this.unavailable = this.getUnavailable(unavailable);
    for (var i = seatStartIndex; i < seatStartIndex+numSeats; i++) {
      if(this.unavailable.indexOf(i) == -1) {
        this.seats.unshift(new Seat(i, true, rowNumber));
      } else {
        this.seats.unshift(new Seat(i, false, rowNumber));
      }
    }
  }

  getUnavailable(unavailables) {
    let array = [];
    for (let book of unavailables) {
      array.push(book.id);
    }
    return array;
  }
  
}