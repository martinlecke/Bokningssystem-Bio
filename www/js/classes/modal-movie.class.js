class ModalMovie extends Base {
	constructor(){
		super();
		$(document).on("click", "#film-info", function(){
			$('#film-info').modal('show');
		});
  	

		// $('#film-info').on('hidden.bs.modal', function (e){
		// 	location.hash = "";
		// });
	}
}




	// .modal({
 //  			keyboard: true,
 //  			show: true,
 //  			focus: true

			// ９．　console.log("this", this);  this = '#modalid' を指している　(例: line 28,29)
			// $('#modalbutton').data("toggle", 'modal');
			// $("#modalbutton").data("target", "film-info");
		// });