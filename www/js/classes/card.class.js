class Card extends Base {
  
  constructor(props) {
    // Have to comment out the constructor for JSON Flex to load from here
    super();
    for (let name in props){
    	if(['date','film','auditorium','time'].includes(name)){
      this[name] = props[name];
    }
    // this.auditorium = data.auditorium;
    // this.film = data.film;
    // this.date = data.date;
    // this.time = data.time;

  }
 }
}
