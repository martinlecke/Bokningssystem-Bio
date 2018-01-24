class Auditorium extends Base {
  
  constructor() {
    let urlName = location.pathname.split('/')[2];
    super();
    JSON._load('salong.json').then(salong=>{
      this.salong = salong;
      this.start();
    });
  }

  start() {

  }

  renderTheatre() {
    html = '';
 
  }


}
