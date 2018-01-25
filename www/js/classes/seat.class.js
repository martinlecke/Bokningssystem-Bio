class Seat {
  
  constructor(props) {
    for (let name in props){
      this[name] = props[name];
    }
  }


}