class Login extends Base {
	
	constructor(){
		super();
		if(window.location.hash.indexOf('login') != -1) {
  		$('#login').modal('show');
		}
		$('#login').on('hidden.bs.modal', function (e){
			location.hash = "";
		});
		this.saveDataToJson();
	}
	saveDataToJson(){
		let that = this; 
			$(document).on('click', "#submit-register", function(){
				let email = $("#email-input-register").val();
				let password = $("#password-input-register").val();
				Data.user.push(new User(
					{
						email: email,
						password: password
					}
				));
			console.log(Data.user)
				that.saveToJSON(Data.user);
			});
		}

	saveToJSON(array){
    JSON._save('users.json', array);
  }
}