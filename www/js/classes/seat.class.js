class Seat extends Base {
  
  constructor(id) {
    super();
    this.id = id;
  }

  click() {
    if($(event.target)) {
      this.available = false;
      console.log(this);
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