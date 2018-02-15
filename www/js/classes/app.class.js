class App {

  start(){
    // Keep/Restore logged in user (on hard page reload)
    if(localStorage.loggedIn){
      User.loggedIn = JSON._parse(localStorage.loggedIn); //Om logout ska fungera så måste det ske en hardpagereload efteråt.
    }
    // Create a navbar
    this.navbar = new Navbar();
    this.navbar.render('header');

    // Create a footer
    this.footer = new Footer();
    this.footer.render('footer');

    // Create a homepage
    this.homePage = new HomePage();

    // Create moviepage
    this.moviePage = new MoviePage();

    // Create kalendarium page
    this.kalendarium = new Kalendarium();

    // Create About page
    this.omOss = new About();

    // Create Mina sidor page
    this.minaSidor = new MinaSidor();

    // Initiate handling of SPA push/pop-state
    new PopStateHandler(this);
  }
} 