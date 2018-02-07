class App {

// ３．すべてのページをここで作って、観れるようになる（bookningpageもここに追加しないといけない）

  start(){
    // Create a navbar
    this.navbar = new Navbar();
    this.navbar.render('header');

    // Create a footer
    this.footer = new Footer();
    this.footer.render('footer');

    // Create a homepage
    this.homePage = new HomePage();

    // // create moviepage
    this.moviePage = new MoviePage();

    // Create auditorium page
    this.auditorium = new Auditorium();

    // // Create booking page
    // this.booking = new Booking();

    // Create About page
    this.omOss = new About();

    // Create ModalMovie
    this.modalMovie = new ModalMovie();

    // Initiate handling of SPA push/pop-state
    new PopStateHandler(this);　　　// this = App クラス（Appクラスに書かれているものが、全てpopStateHandlerに送られる）
    }
} 