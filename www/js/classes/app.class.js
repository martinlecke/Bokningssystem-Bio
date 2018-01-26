class App {

  start(){
    // Create a navbar
    this.navbar = new Navbar();
    $('header').empty();
    this.navbar.render('header');
    // Create a homepage
    this.homePage = new HomePage();
    this.homePage.render('main');
    $('main').empty();
    // // create moviepage
    this.moviePage = new MoviePage();
    $('main').empty();
    this.moviePage.render('main');
    // Create auditorium page
    this.auditorium = new Auditorium();
    $('main').empty();
    this.auditorium.render('main');
    // Initiate handling of SPA push/pop-state
    new PopStateHandler(this);
    }
} 