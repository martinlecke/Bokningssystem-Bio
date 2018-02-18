class CurrentMovie extends Base {
	
	constructor(props){
		super();
		Object.assign(this, props);

		setTimeout(() => {
      this.url = this.makeUrl();
      $('#filmmodal').modal('show');
		}, 0);
	}

	onRendered(){
		 let that = this;
		$(document).find(`[data-popover="${that.title}"] [data-toggle="popover"]`).popover({ 
			trigger: "manual", 
			html: true,
			placement: 'top',
			content: function() {
				return `
				<h6 class="mb-0 d-inline">${that.title}</h6><br>
				<p class="description d-inline">
				  ${that.description}
				</p>`
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
				if (!$(".popover:hover").length) {
					$(that).popover("hide");
				}
			}, 300);
		});
	}

  click() {
  	$('#modalmovie').empty();
    $('.popover').popover('hide');
  }

  makeUrl() {
    let title = this.title;
    title = title.replace(/[, :']/g, "").toLowerCase();
    title = title.replace(/[åä]/g, "a");
    title = title.replace(/[ö]/g, "o");
    return title;
  }
}