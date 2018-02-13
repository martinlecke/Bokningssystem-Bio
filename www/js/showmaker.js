class Showmaker {

   constructor() {
    this.movies = this.getMovies();
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

   makeMovieUrl(movie) {
    movie = movie.replace(/[, :']/g, "").toLowerCase();
    movie = movie.replace(/[åä]/g, "a");
    movie = movie.replace(/[ö]/g, "o");
    return movie;
   }

   getMovies() {
    let array = [];
    for (let movie of Data.movies) {
      array.push(movie.title);
    }
    return array;
   }

   makeObject() {
    let day = this.date.day;
    let month = this.date.month;
    let year = this.date.year;
      for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 3; j++) {
          let movie = this.movies[this.random(this.movies.length)];
          let salong = this.auditorium[this.random(this.auditorium.length)];
          let urlMovie = this.makeMovieUrl(movie);
          let date = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
          let showid = (date.replace(/[-]/g, "") + j + i);
          this.showlist.push( new Show(
          {
            auditorium: salong,
            film: movie,
            date: date,
            time: this.showtimes[j],
            showid: showid.slice(2, showid.length),
            unavailable: [],
            url: urlMovie
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
    JSON._save('showsNew.json', array);
  }
}