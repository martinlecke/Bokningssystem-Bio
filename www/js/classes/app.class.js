class App {

  start(){
    // Create a navbar
    this.navbar = new Navbar();
    $('header').empty();
    this.navbar.render('header');
    // Create a homepage
    this.homePage = new HomePage();
    $('main').empty();
    this.homePage.render('main');
    // // create moviepage
    this.moviePage = new MoviePage();
    $('main').empty();
    this.moviePage.render('main');
   
    // Initiate handling of SPA push/pop-state
    new PopStateHandler(this);
  } 

}
