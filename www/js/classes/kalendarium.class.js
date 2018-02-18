class Kalendarium extends Base {
	
	constructor(props){
		super();
		let showsByDayHash = {};
    this.upcomingShows = Data.shows.filter((shows)=>{
        // Removes all shows from past todays date 
        let time = new Date(shows.date + ' 23:59:59');
        return new Date() < new Date(time.getTime());
      })

		for(let show of this.upcomingShows){
		  if(!showsByDayHash[show.date]){
		    showsByDayHash[show.date] = [];
		  }
		  showsByDayHash[show.date].push(show);
		}

		let showsByDay = [];
		for(let date in showsByDayHash){
		  showsByDay.push(new Day({shows: showsByDayHash[date]}));
		}
    
		this.days = showsByDay;
	}


} // /class

