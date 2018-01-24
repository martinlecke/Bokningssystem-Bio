class Auditorium extends Base {
  
  constructor() {
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
