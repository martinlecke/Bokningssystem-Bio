class Navbar extends Base {

  constructor(){
    super();
    this.items = [
      new NavbarItem('Startsida', '/'),
      new NavbarItem('Filmer','/filmer'),
      new NavbarItem('Kalendarium','/kalendarium'),
      new NavbarItem('Om oss','/om-oss')
    ];
    console.log(!User.loggedIn == undefined);
    if (!User.loggedIn) {
      this.items.push(new NavbarItem('Logga in','#login'));
    } else {
      this.items.push(new NavbarItem('Mina sidor','/mina-sidor'));
      this.items.push(new NavbarItem('Logga ut','#logout'));
  }
   this.setActive('/');
  }

  setActive(url){
    for(let item of this.items){
      item.active = url == item.url;
    }
    // this.render();
  }
}