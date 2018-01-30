class App {

// ３．すべてのページをここで作って、観れるようになる（bookningpageもここに追加しないといけない）

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
    // Create booking page
    this.booking = new Booking();
    $('main').empty();
    this.booking.render('main');

    // Initiate handling of SPA push/pop-state
    new PopStateHandler(this);　　　// this = App クラス（Appクラスに書かれているものが、全てpopStateHandlerに送られる）
    }
} 