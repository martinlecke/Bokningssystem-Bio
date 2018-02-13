class Login extends Base {
	
	constructor(){
		super();
		this.reset();
		if(window.location.hash.indexOf('login') != -1) {
  		$('#login').modal('show');
		}
		$('#login').on('hidden.bs.modal', function (e){
			location.hash = "";
		});
		this.register();
		this.login();
		window.logout = this.logout; // So we can test from console
	}

	reset(){
   	this.name = '';
   	this.pass = '';
 	}

 	setLoggedInUser(user){
		User.loggedIn = user;
		localStorage.loggedIn = JSON._stringify(user);
	}

	login(){
		let that = this;
		$(document).on('click', "#submit-login", async function(e){
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
		});
	}

	logout(){
		// Put this inside an event handler
		delete User.loggedIn;
		delete localStorage.loggedIn;
	}

	register(){
		let that = this;
			$(document).on('click', "#submit-register", function(e){
				e.preventDefault();
				let email = $("#email-input-register").val();
				let password = $("#password-input-register").val();
				// let generateId = that.generateId(); 

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
}