class Movie extends Base {

	constructor(props){
		super();
		for(let name in props){
			if(['title','poster'].includes(name)){
				this[name] = props[name];
			}
		}

		setTimeout(()=>{
			this.title && this.attachEventListeners();
		}, 100);
	}

	attachEventListeners(){
		//Denna funktionen körs efter den körts 1 gång tidigare. Nu körs den som en tom funktion.
		this.attachEventListeners = ()=>{};
		$(`[data-movie="${this.title}"] [data-toggle="popover"]`).popover({ 
			trigger: "manual" , 
			html: true,
			placement: 'bottom',
			content: function() {
				return `
				<h6 class="mb-0 d-inline">Handling: </h6>
				<p class="description d-inline">
				Dummy Text......
				</p>
				<div class="mt-2 mb-1 text-center">
				<a class="pop" href="${this.title}">
				<button type="button" class="btn btn-danger btn-sm">Klicka här för biljettbokning</button>
				</a>
				</div>`
			}
		})
		.on("mouseenter", function () {
			let that = this;
			$(this).popover("show");
			$(".popover").on("mouseleave", function () {
				$(that).popover('hide');
			});
		}).on("mouseleave", function () {
			let that = this;
			setTimeout(function () {
				if (!$(".popover:hover").length) {
					$(that).popover("hide");
				}
			}, 300);
		});
	}
}
