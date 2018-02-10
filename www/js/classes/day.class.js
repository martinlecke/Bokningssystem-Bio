class Day extends Base {
  
  constructor(props) {
    // Have to comment out the constructor for JSON Flex to load from here
    super();
    console.log(props);
    this.shows = props.shows;
    this.date = this.shows[0].date;

  }
}
