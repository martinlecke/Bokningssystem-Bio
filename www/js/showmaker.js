class Showmaker {

   constructor() {
    this.movies = ["All the Money in the World", "Transformers: The Last Knight", "Call me by your name", "Your Name", "Let The Sunshine In", "Star Wars: The Last Jedi", "Ballerinan och uppfinnaren"];
    this.showtimes = ['16.00', '18.30', '21.00'];
    this.auditorium = ['Lilla Salongen', 'Stora Salongen'];
    this.showlist = [];
    this.date = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
      }
    this.makeObject();
    this.saveToJSON(this.showlist);
   }

   random(length) {
    return Math.floor(Math.random() * length);
   }

   makeObject() {
    let day = this.date.day;
    let month = this.date.month;
    let year = this.date.year;

      for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 3; j++) {
          this.showlist.push( new Show(
          {
            auditorium: this.auditorium[this.random(this.auditorium.length)],
            film: this.movies[this.random(this.movies.length)],
            date: `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`,
            time: this.showtimes[j]
          }));  
        }
        if (day == 31 && month == 12) {
          year += 1;
          month = 1;
          day = 1;
        } else if ( 
          day == 31 && month == 1 || // jan
          day == 28 && month == 2 || // Feb
          day == 31 && month == 3 || // Mar
          day == 30 && month == 4 || // Apr
          day == 31 && month == 5 || // May
          day == 30 && month == 6 || // Jun
          day == 31 && month == 7 || // Jul
          day == 31 && month == 8 || // Aug
          day == 30 && month == 9 || // Sep
          day == 31 && month == 10 || // Okt
          day == 30 && month == 11    // nov
          ) {
            day = 1;
            month += 1
          } else {
            day += 1;
          }
      } // /for loop
   }
   saveToJSON(array){
    JSON._save('shows.json', array);
  }
}