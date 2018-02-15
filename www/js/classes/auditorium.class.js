class Auditorium extends Base {
  
  constructor(showid) {
    super();
    this.show = this.find(showid, 'shows', 'showid');
    this.stora = this.find(this.show.auditorium, 'salong', 'auditorium');
    this.rows = [];
    this.renderRows();
    setTimeout(() => {
      this.scale();
    }, 100);
    this.setupHandler();
  }

  find(find, where, property) {
    // Finds the show/auditorium and returns it by input arguments
    for (let i = 0; i < Data[where].length; i++) {
      if (Data[where][i][property] == find) {
        return Data[where][i]
      }
    }
  }

  renderRows() {
    let salong = this.stora;
    let rowStartIndex = 1;
    let rowNumber = 1;
    for (let row of salong.seatsPerRow) {
      this.rows.push(new Row(row, rowStartIndex, this.show.unavailable, rowNumber));
      rowStartIndex += row;
      rowNumber += 1;
    }
  }

  scale() {
    // returns largest number in row
    let numberOfSeats = Math.max.apply(null, this.stora.seatsPerRow);
    // seatsize in px on width on 960px
    let seatSize = 960 / numberOfSeats;
    if (seatSize > 96) seatSize = 96;
    // window sizes
    let w = $('.salong-holder').width();
    let h = $(window).height();
    // getting the scales in both axis
    let wScale = w / 960;
    let hScale = h / 500; // 50% of viewport
    // Sets sizes for .seat
    $('.seat').css('width', seatSize).css('height', seatSize);
    // Change salong scale if height is too big
    $('.salong').css('width', '960px').css('transform', `scale(${Math.min(hScale, wScale) > 1 ? 1 : Math.min(hScale, wScale)})`).css('height', ((seatSize * this.stora.seatsPerRow.length) * Math.min(hScale, wScale) * 1.2)+'px');
  }

  setupHandler() {
    $(window).on('resize', () => {
      this.scale();
    });

    $(document).on('mouseenter', '.seat', function() {
      // grabs data-id and loops through the selection and adds hover
      let id = $(this).data('id');
      for (let i = id; i < (id + Booking.selection - Booking.markedSeats.length); i++) {
        let row = $(this).data('row');
        $(`[data-id='${i}'][data-row='${row}']`).addClass('hover');
      }
    });
    $(document).on('mouseleave', '.seat', function() {
      $('.seat').removeClass('hover');
    });
  }

}