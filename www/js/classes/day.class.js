class Day extends Base {
  
  constructor(props) {
    // Have to comment out the constructor for JSON Flex to load from here
    super();
    let day = [];
      for(let show of shows)
        if(day && day.date == show.date){
          day.shows.push(show);
        }
        else{
          if(!day){
            let day ={shows:[]};
          }
          day.shows.push(show);
        }
        show.date
  }
}
