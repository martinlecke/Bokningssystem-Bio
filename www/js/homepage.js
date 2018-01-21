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
				<h6 class="mb-0 d-inline">Handling: </h6>
				<p class="description d-inline">
				Den episka Skywalker-sagan fortsätter när hjältarna från The Force Awakens ansluter sig till de galaktiska legenderna i ett storslaget äventyr som avslöjar Kraftens uråldriga mysterier och chockerande sanningar från det förflutna.</p>
				<div class="mt-2 mb-1 text-center">
				<a href="/film">
				<button type="button" class="btn btn-danger btn-sm">Klicka här för att boka biljetter</button>
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