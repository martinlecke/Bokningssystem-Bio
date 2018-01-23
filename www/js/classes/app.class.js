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
    // Create filmer page
    this.filmer = new Movie();
    $('main').empty();
    this.filmer.render('main');
    // Initiate handling of SPA push/pop-state
    new PopStateHandler(this);
  } 

}
