class Day extends Base {
  
  constructor(props) {
    // Have to comment out the constructor for JSON Flex to load from here
    super();
    
    // console.log(props);
    this.shows = props.shows;
    this.date = this.shows[0].date;
    this.today = this.getDate(new Date(), 0);
    this.tomorrow = this.getDate(new Date(), 1);
  }

  getDate(date, days) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate() + days;

    date = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`

    return date == this.shows[0].date;
  }
}
