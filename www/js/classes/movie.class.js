class Movie extends Base {

	constructor(props){
		super();
		for(let name in props){
			if(['title','poster', 'description'].includes(name)){ 
				this[name] = props[name];
			}
		}

		setTimeout(()=>{
			this.title && this.attachEventListeners();
		}, 100);
	}

	onRendered(){
		 let that = this;

		 //Denna funktionen körs efter den körts 1 gång tidigare. Nu körs den som en tom funktion. 
		that.attachEventListeners = ()=>{};
		$(document).find(`[data-movie="${that.title}"] [data-toggle="popover"]`).popover({ 
			trigger: "manual", 
			html: true,
			placement: 'top',
			content: function() {
				return `
				<h6 class="mb-0 d-inline">Handling: </h6>
				<p class="description d-inline">
				${that.description}
				</p>
				<div class="mt-2 mb-1 text-center">
				<a class="pop" href="${that.title}">
				<button type="button" class="btn btn-danger btn-sm">Klicka här för biljettbokning</button>
				</a>
				</div>`
			}
		})
		.on("mouseenter", function () {
			let that = this;
			$(that).popover("show");
			$(".popover").on("mouseleave", function () {
				$(that).popover('hide');
			});
		})
		.on("mouseleave", function () {
			let that = this;
			setTimeout(function () {
				if (!$(".popover:hover").length) {　　// hoverの時間をキープできる
					$(that).popover("hide");
				}
			}, 300);
		});
	}
	attachEventListeners(){
		let that = this;
		//Denna funktionen körs efter den körts 1 gång tidigare. Nu körs den som en tom funktion.
		that.attachEventListeners = ()=>{};

		// $(document).on("click", "#modalid", function(){
		// 	that.mymodal = new ModalMovie();

		// 	// ９．　console.log("this", this);  this = '#modalid' を指している　(例: line 28,29)
		// 	// console.log("that", that);   that = 'class Movie' (= class)
			
		// 	that.mymodal.render('.modal-container');
		// 	// $('#modalbutton').data("toggle", 'modal');
		// 	// $("#modalbutton").data("target", "film-info");
		// });

		
	}
}