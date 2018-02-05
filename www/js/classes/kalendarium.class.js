class Kalendarium extends Base {
	
	constructor(){
		super();

		this.days = [];
		let array = [];
		for(let show of Data.shows){
			let day = new Date(show.date).getDate();
			let month = new Date(show.date).getMonth() + 1;
			if (  ) {
				array.push(show);
			} else {
				this.days.push({ [show.date]: array});
			}

		}	// /loop
		console.log(this.days);
	} // /constructor

} // /class

