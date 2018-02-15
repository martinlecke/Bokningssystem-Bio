class Login extends Base {
	
	constructor(){
		super();
		if(window.location.hash.indexOf('login') != -1) {
  		$('#login').modal('show');
		}
		$('#login').on('hidden.bs.modal', function (e){
			location.hash = "";
      $('.alert').alert('close');
      $('#email-input-login').val('');
      $('#password-input-login').val('');
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
          $('.wronguser').alert('close');
          $('#email-input-login').parent().append(`
            <div class="alert alert-danger my-3 wronguser" role="alert">
              Användarnamnet finns inte.
            </div>
          `);
				}
				if(fromJson && fromJson.password == password){
					that.setLoggedInUser(fromJson);
          $('.modal').modal('hide');
          $('.modal-backdrop').hide();
          location.hash = "";
          $('header').empty();
          this.navbar = new Navbar();
          this.navbar.render('header');
          $('.alert').alert('close');
          let $alert = $(`<div class="alert alert-success" role="alert">
              Du är nu inloggad som <strong>${User.loggedIn.email}</strong>.
            </div>`);
          $('header').prepend($alert);
          $alert.slideDown().delay(2000).slideUp();
				}
				else {
          $('.wrongpassword').alert('close');
					$('#password-input-login').parent().append(`
            <div class="alert alert-danger my-3 wrongpassword" role="alert">
              Fel lösenord.
            </div>
          `);
				}
		});
	}


	register(){
		let that = this;
			$(document).on('click', "#submit-register", (e) => {
				e.preventDefault();
				let email = $("#email-input-register").val();
				let password = $("#password-input-register").val();
        if(this.validateEmail(email) && this.doesUserExist(email)) {
          let user = new User(
            {
              email: email,
              password: password,
              bookings: []
            }
          );
          that.setLoggedInUser(user);
          JSON._save('users/' + user.email, user);
          $('.modal').modal('close');
          $('.modal-backdrop').hide();
          location.hash = "";
          $('header').empty();
          this.navbar = new Navbar();
          this.navbar.render('header');
        }

			});
		}

  validateEmail(email) {
    if (!email.includes('@') || !email.includes('.') || email === '') {
      $('.wronguser').alert('close');
      $('#email-input-register').parent().append(`
        <div class="alert alert-danger my-3 wronguser" role="alert">
          Ange en korrekt emailadress.
        </div>
      `);
      return false;
    }
    return true;
  }
  doesUserExist(email) {
    //checks if file exist on server
    $.ajax({
        url:'/json/user/' + email,
        type:'HEAD',
        error: function()
        {
          $('.wronguser').alert('close');
          $('#email-input-register').parent().append(`
            <div class="alert alert-danger my-3 wronguser" role="alert">
             Oops! Användaren tycks redan finnas.
            </div>
          `);
          return false;
        },
        success: function()
        {
          return true;
        }
    });
  }
}