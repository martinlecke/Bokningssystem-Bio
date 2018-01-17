class PopStateHandler {

  // Note: Only instantiate PopStateHandler once!

  constructor(){
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

  addEventHandler(){

    // make "that" the PopStateHandler object
    // (since this will be the a tag inside the click function)
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
    $('header a').removeClass('active');
    $(`header a[href="${url}"]`).addClass('active');

    // A small "dictionary" of what class to call
    // on which url
    let urls = {
      '/': Homepage,
      '/filmer': Film,
      // '/schedule': Schedule
    };

    // Sparar "gamla sidan" om man behöver spara variabel, sträng etc. för annan sida.
    let oldPage = this.currentPage; 
    this.currentPage = (urls[url] && new urls[url]) || undefined;

    //Kollar om oldPage har getData och CurrentPage har load. load funktion laddar data från oldPage.
    if (this.currentPage && oldPage && oldPage.getData && this.currentPage.load){
      this.currentPage.load( oldPage.getData() );
    }
    // Call the template method of current page or load default method.
    // 'bind' binder "currentPage" till classen som .this
    let method = (this.currentPage && this.currentPage.template.bind(this.currentPage)) || this.default;
    $('main').html(method());
  }

  default(){
    return `hittade ingen template för ${location.pathname}`;
  }
}

// Create an instance of the class
new PopStateHandler();