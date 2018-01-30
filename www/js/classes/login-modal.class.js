class Login extends Base {
	
	constructor(){
		super();
		$(document).ready(function() {
  		if(window.location.href.indexOf('#login') != -1) {
    		
    			$('#login').modal('show');
				
			}
		});
	}
}

// $(document).on("click", "#login", function(){
	// });