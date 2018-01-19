class Showmaker {

   constructor() {
    this.movies = ["All the Money in the World", "Transformers: The Last Knight", "Call me by your name", "Your Name", "Let The Sunshine In", "Star Wars: The Last Jedi", "Ballerinan och uppfinnaren"];
    this.showtimes = ['16.00', '18.30', '21.00'];
    this.auditorium = ['Lilla Salongen', 'Stora Salongen'];
    this.date = this.getDate();
    this.makeObject();
   }

   random() {
    return Math.floor(Math.random() * this.movies.length);
   }

   getDate() {
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let day = new Date().getDate();
    let date = `${year}-${month < 10 ? '0' + month : day}-${day < 10 ? '0'+day : day}`;
    return date;
   }

   makeObject() {

    let randomMovie = this.auditorium[this.random()];

    return {
      auditorium: randomMovie,
      film: this.movies[this.random()],
      date: 'date',
      time: 'time'
    }
   }


   saveToJSON(array){
    JSON._save('shows.json', array);
  }
}
let maker = new Showmaker();



// {
//   "auditorium": "Stora Salongen",
//   "film": "Call me by your name",
//   "date": "2018-01-22",
//   "time": "18.40"
// }