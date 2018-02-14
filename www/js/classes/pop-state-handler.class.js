class PopStateHandler {

  constructor(app){  
    this.app = app;
    // Add event handlers for a.pop-links once
    this.addEventHandler();
    // Call changePage on initial page load
    this.changePage();    
    // Call changePage on pop events
    // (the user clicks the forward or backward button)
    // from an arrow function to keep "this"
    // inside changePage pointing to the PopStateHandler object
    window.addEventListener('popstate', () => this.changePage());
    this.modalClosing();
  }

  addEventHandler(){
    // make "that" the PopStateHandler object (since this will be the a tag inside the click function)
    let that = this;
    $(document).on('click','a.pop',function(e){
      // Create a push state event
      let href = $(this).attr('href');
      history.pushState(null, null, href);
      // Call the changePage function
      that.changePage();
      // Stop the browser from starting a page reload
      e.preventDefault();
    });
  }

  changePage(){
    // React on page changed
    // (replace part of the DOM etc.)
    // Get the current url
    let url = location.pathname;
        
    // Change which menu link that is active
    $('header nav div ul li a').removeClass('active');
    $(`header nav div ul li a[href="${url}"]`).addClass('active');
    
    // A small "dictionary" of what method to call on which url
    let urls = {
      '/': 'home',
      '/filmer': 'filmsida',
      '/om-oss': 'omOss',
      '/kalendarium': 'kalendarium',
    };

    for (let i = 0; i < Data.shows.length; i++) {
      let idUrls = {['/'+ Data.shows[i].showid] : 'bokningssida'};
      Object.assign(urls, idUrls);
    }

    // Call the right method
    let methodName = urls[url];
    this[methodName]();

    // Set the right menu item active
    this.app.navbar.setActive(url);
  
    let hash = location.hash.replace(/^#/, '');

    let hashes = {
      'login': 'login',
      // 'movie': 'movie'
    };

    for (let i = 0; i < Data.movies.length; i++) {
      let movieUrls = Data.movies[i].title;
      movieUrls = movieUrls.replace(/[, :']/g, "").toLowerCase();
      movieUrls = movieUrls.replace(/[åä]/g, "a");
      movieUrls = movieUrls.replace(/[ö]/g, "o");
      hashes[movieUrls] = 'movie';  // Object.assign(hashes, {movieUrls : 'movie'}); Samma sak
    }

    if(!hash || !hashes[hash]){
      return;
    }
    methodName = hashes[hash];
    this[methodName]();

    }


  home(){
    $('main').empty();
    this.app.homePage.render('main');
  }

  filmsida(){
    $('main').empty();
    this.app.moviePage.render('main');
  }

  omOss(){
    $('main').empty();
    this.app.omOss.render('main');
  }

  kalendarium(){
    $('main').empty();
    this.app.kalendarium.render('main');
  }

  bokningssida(){
    let id = location.pathname;
    $('main').empty();
    Showing.x = new Booking(id.slice(1, id.length));
    Showing.x.render('main');
  }

  login(){
    this.app.login = new Login();
  }

  movie(){
    this.app.movie = new ModalMovie();
    
  }
  modalClosing() {
    $(document).on('click', '.pop', function () {
      $('.modal').modal('hide');
    });
  }
}
