class CurrentMovie extends Base {
	
	constructor(props){
		super();
		for(let name in props){
			if(['title','poster', 'description'].includes(name)){
				this[name] = props[name];
			}
		}
	}

	onRendered(){
		 let that = this;
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

  click() {
    console.log( this);
    $('#modalmovie').empty();
    this.clickedMovie = new ModalMovie(this);
  }
	

}