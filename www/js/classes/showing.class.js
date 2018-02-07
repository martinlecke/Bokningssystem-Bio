class Showing extends Base {
	constructor(showstoday, showstomorrow){
		super();
		Object.assign(this, showstoday);  // this = showwing.jsonのすべてのデータの意味(carousel-item i constructorの for（）,line10-13と同じ意味
		Object.assign(this, showstomorrow);
	}
  click() {
    Showing.x = new Booking(this.showid);
  }

}