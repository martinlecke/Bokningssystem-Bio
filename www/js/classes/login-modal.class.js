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

	register(){
		let that = this;
			$(document).on('click', "#submit-register", function(e){
				e.preventDefault();
				let email = $("#email-input-register").val();
				let password = $("#password-input-register").val();

				let user = new User(
					{
						email: email,
						password: password,
            bookings: []
					}
				);
				that.setLoggedInUser(user);
				JSON._save('users/' + user.email, user);
			});
		}

	onRendered(){
		 let that = this;
		$(document).find(`[data-popover="${that.title}"] [data-toggle="popover"]`).popover({ 
			trigger: "manual", 
			html: true,
			placement: 'top',
			content: function() {
				return `
				<h6 class="mb-0 d-inline">${that.title}</h6><br>
				<p class="description d-inline">
				  ${that.description}
				</p>
				<div class="mt-2 mb-1 text-center">`
			}
		});
	}
}