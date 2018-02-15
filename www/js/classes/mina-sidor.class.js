class MinaSidor extends Base {
	
	constructor(){
		super();
		this.myBookedShow = []
		for(let show of Data.booking){
			this.myBookedShow.push(new MyBookedShow(show))
		}

		this.myPastShows = []
		for(let show of Data.booking){
			this.myPastShows.push(new MyPastShows(show))
		}

	}
}