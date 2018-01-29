class Show {
  
  constructor(props) {
    // Have to comment out the constructor for JSON Flex to load from here
    for (let name in props){
      this[name] = props[name];
    }
    // this.auditorium = data.auditorium;
    // this.film = data.film;
    // this.date = data.date;
    // this.time = data.time;

  }
}
