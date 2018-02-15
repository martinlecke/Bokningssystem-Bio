class Login extends Base {
	
	constructor(){
		super();
		if(window.location.hash.indexOf('login') != -1) {
  		$('#login').modal('show');
		}
		$('#login').on('hidden.bs.modal', function (e){
			location.hash = "";
		});
		this.register();
		this.login();
    this.logout();
		App.logout = this.logout; // So we can test from console
	}

 	setLoggedInUser(user){
		User.loggedIn = user;
		localStorage.loggedIn = JSON._stringify(user);
	}

	login(){
		let that = this;
		$(document).on('click', "#submit-login", async function(e){
        e.preventDefault();
				let email = $('#email-input-login').val();
				let password = $('#password-input-login').val();
				let fromJson;
				try {
				  fromJson = await JSON._load("users/" + email);
				} catch(e){
					alert("Användaren finns inte!");
				}
				console.log(fromJson);
				console.log(fromJson.password, password)
				if(fromJson && fromJson.password == password){
					that.setLoggedInUser(fromJson);
				}
				else {
					alert("Fel lösenord!");
				}
        $('.modal').modal('hide');
        $('.modal-backdrop').hide();

        $('header').empty();
        this.navbar = new Navbar();
        this.navbar.render('header');
		});
	}

	logout(){
		$(document).on('click', "a[href='#logout']", function() {
        delete User.loggedIn;
        delete localStorage.loggedIn;
        console.log('deleted');
        // setTimeout(function() {
          $('header').empty();
          this.navbar = new Navbar();
          this.navbar.render('header');
          console.log('ny navbar')
        // },0);
    });

	}

	register(){
		let that = this;
			$(document).on('click', "#submit-register", function(e){
				e.preventDefault();
				let email = $("#email-input-register").val();
				let password = $("#password-input-register").val();

				let user = new User(
					{
						email: email,
						password: password
					}
				);
				that.setLoggedInUser(user);
				JSON._save('users/' + user.email, user);
			});
		}

	// onRendered(){ // Tänkt att aktivera en popover när man klickat på logga ut, för att säkerställa att man vill logga ut.
	// 	 let that = this;
	// 	$(document).find(`[data-popover=""] [data-toggle="popover"]`).popover({ 
	// 		trigger: "manual", 
	// 		html: true,
	// 		placement: 'top',
	// 		content: function() {
	// 			return ` `
	// 		}
	// 	});
	// }  
}