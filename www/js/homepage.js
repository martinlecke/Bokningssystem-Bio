class Homepage{
	constructor(){
		let urlName = location.pathname.split('/')[2];
		// this.name = jsonFilmer[urlName].title;
		// this.name = jsonFilmer[urlName].releaseYear;
		// this.name = jsonFilmer[urlName].runtime;
	}

	// this method will get run right after the template (html) has been loaded
	// this method is available in all "classes"
	afterTemplate(){
		// now that the html has been loaded
		// when we attach events to $('[data-toggle="popover"]')
		// they will actually "be in the DOM" (no need for $(document))
		this.attachEventListeners();
	}

	attachEventListeners(){
		$('[data-toggle="popover"]').popover({ 
			trigger: "manual" , 
			html: true,
			placement: 'bottom',
			content: function() {
				return `
				<h5 class="mb-0 d-inline">Handling: </h5>
				<p class="description d-inline">
				Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares for battle with the First Order.</p>
				<div class=" my-auto">
					<a href="/film" class="">
						<button type="button" class="btn btn-dark btn-sm btn-outline-dark mx-auto">Klicka här för att boka biljetter</button>
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

	load(data){
	}

	getData(){
		return {
			numberOfMovies: 42
		}
	}
}