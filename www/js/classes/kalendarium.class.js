class Kalendarium extends Base {
	
	constructor(props){
		super();

		let showsByDayHash = {};
		for(let show of Data.shows){
		  if(!showsByDayHash[show.date]){
		    showsByDayHash[show.date] = [];
		  }
		  showsByDayHash[show.date].push(show);
		}

		console.log('showsByDay',showsByDayHash);

		let showsByDay = [];
		for(let date in showsByDayHash){
		  showsByDay.push(new Day({shows: showsByDayHash[date]}));
		}

		console.log('showsByDay', showsByDay);
		this.days = showsByDay
	}
} // /class

