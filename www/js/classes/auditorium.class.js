class Auditorium extends Base {
  
  constructor() {
    super();
    this.rows = [];
    this.stora = {name: 'Stora Salongen', seats: 81, seatsPerRow: [8, 9, 10, 10, 10, 10, 12, 12]};
    let urlName = location.pathname.split('/')[2];
    this.renderRows();
    setTimeout(() => { 
      this.scale();
    }, 500);

  }

  renderRows() {
    let salong = this.stora; // hardcoded stora salongen
    let rowStartIndex = 1;
    for (let row of salong.seatsPerRow) {
      this.rows.push(new Row(row, rowStartIndex));
      rowStartIndex += row;
    }
  }

  scale() {
    let numberOfSeats = Math.max.apply(null, this.stora.seatsPerRow);
    let seatSize = 960 / numberOfSeats;
    let salongSize = seatSize * numberOfSeats;
    let windowWidth = $(window).width();
    const widthScale = windowWidth / salongSize;
    let seatSizeResize = (salongSize * widthScale) / numberOfSeats;
    $('.salong').width(salongSize > 960 ? 960 : salongSize * widthScale).css('max-width', 960);
    $('.seat').width(seatSizeResize).height(seatSizeResize).css('max-width', 80).css('max-height', 80);
  }
}