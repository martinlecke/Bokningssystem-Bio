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
    // returns largest number in row
    let numberOfSeats = Math.max.apply(null, this.stora.seatsPerRow);
    // seatsize in px on width on 960px
    let seatSize = 960 / numberOfSeats;
    if (seatSize > 50) seatSize = 50;
    // window sizes
    let w = $(window).width();
    let h = $(window).height();
    // getting the scales in both axis
    let wScale = w / 960;
    let hScale = h / 500; // 50% of viewport
    // Sets sizes for .seat
    $('.seat').css('width', seatSize).css('height', seatSize);
    // Change salong scale if height is too big
    $('.salong').css('transform', `scale(${Math.min(hScale, wScale) > 1 ? 1 : Math.min(hScale, wScale)})`);
  }
}