class MinaSidor extends Base {
	
	constructor(){
		super();
    if(User.loggedIn) {
      Object.assign(this, User.loggedIn);
      this.start();
    }
  }

  start() {
    this.myBookedShow = []
    let comingShows = this.bookings.filter((shows)=>{
        // Removes all shows from past todays date 
        let time = new Date(shows.date + ' 23:59:59');
        return new Date() < new Date(time.getTime());
      })
    for(let booking of comingShows){
      this.myBookedShow.push(new MyBookedShow(booking))
    }


    this.myPastShows = []
    let pastShows = this.bookings.filter((shows)=>{
        // Removes all shows from past todays date
        let time = new Date(shows.date + ' 00:00:00');
        return new Date().getTime() > new Date(time).getTime();
      })
    .filter((shows)=>{
        // Removes all shows from past todays date 
        let time = new Date(shows.date + ' 23:59:59');
        return new Date() > new Date(time.getTime());
      })
    for(let booking of pastShows){
      this.myPastShows.push(new MyBookedShow(booking))
    }

  }



}