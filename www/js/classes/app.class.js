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

    // Initiate handling of SPA push/pop-state
    new PopStateHandler(this);
    this.logout();
  }

  logout(){
    $(document).on('click', "a[href='#logout']", function() {
        delete User.loggedIn;
        delete localStorage.loggedIn;
        $('header').empty();
        this.navbar = new Navbar();
        this.navbar.render('header');
        $('.modal').modal('hide');
        $('.modal-backdrop').hide();
        location.hash = "";
        let $alert = $(`<div class="alert alert-danger" role="alert">
            Du är nu <strong>utloggad!</strong>
          </div>`);
        $('header').prepend($alert);
        $alert.slideDown().delay(2000).slideUp();
    });
  }

} 