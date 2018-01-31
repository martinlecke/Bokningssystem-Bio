class PopStateHandler {

  // Note: Only instantiate PopStateHandler once!

  constructor(app){　　// ４．App クラスから送られた、引数
  
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
  }

  // ５．urlのデーターの文字の大文字、スペース、コンマを消してくれる
  shortenUrl(url){
    url = url.replace(/,/g, "");
    url = url.replace(/ /g, "");
    url = url.toLowerCase();
    return url;
  }

  addEventHandler(){
    // make "that" the PopStateHandler object (since this will be the a tag inside the click function)
    let that = this;
    $(document).on('click','a.pop',function(e){
      // Create a push state event
      let href = $(this).attr('href');
      // href = that.shortenUrl(href);
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


    // 6.urlを追加する時にここに書く
    let urls = {
      '/': 'home',
      '/filmer': 'filmsida',
      '/auditorium': 'auditorium',
      '/kalendarium': 'kalendarium',
      '/bokningssida': 'bokningssida',
      '/All the Money in the World': 'allTheMoney',
      '/Django': 'django',
    };

    // Call the right method
    let methodName = urls[url];
    this[methodName]();
    // Set the right menu item active
    this.app.navbar.setActive(url);
  

    let hash = location.hash.replace(/^#/, '');
    console.log("hash", hash);

    let hashes = {
      'login': 'login'
    }

    if(!hash || !hashes[hash]){
      return;
    }

    methodName = hashes[hash];
    this[methodName]();

  }


  // 6.urlを追加する時にここにも書く(line:53)
  home(){
    $('main').empty();
    this.app.homePage.render('main');   // app クラスで作った、クラス（オブジェクト）をここで使う。　render - app クラスにもあるが、他のページを読んだ時に、一度ここで消して、再度読み込むため
  }

  filmsida(){
    $('main').empty();
    this.app.moviePage.render('main');
  }

  auditorium(){
    $('main').empty();
    this.app.auditorium.render('main');
  }

  bokningssida(){
    $('main').empty();
    this.app.booking.render('main');   // app クラスで作った、クラス（オブジェクト）をここで使う。　render - app クラスにもあるが、他のページを読んだ時に、一度ここで消して、再度読み込むため
  }

  login(){
    this.app.login = new Login();
    this.app.login.render('main');

  }

}
