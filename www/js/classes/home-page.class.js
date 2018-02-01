class HomePage extends Base {
	
	constructor(){
		super();
		this.slider = []
		for(let movie of Data.movies){
				this.slider.push(new CarouselItem(movie))
		}

		this.today = Data.shows
				.filter((shows)=>{
				// Removes all shows from past todays date 
				let time = new Date(shows.date + ' 23:59:59');
				return new Date() < new Date(time.getTime());
			})
			.filter((shows)=>{
				// Remove all shows past todays date // 24*60*60*1000 = 86400000
				let time = new Date(shows.date + ' 00:00:00')// tomorrow should  + 86400000;
				return new Date() > new Date(time.getTime());
			})
			.map((shows)=>new Showing(shows));  // shows = shows.today i showing.class
		this.tomorrow = Data.shows
			.filter((shows)=>{
				// Removes all shows from past todays date
				let time = new Date(shows.date + ' 23:59:59');
				return new Date().getTime() < new Date(time).getTime() - 86400000;
			})
			.filter((shows)=>{
				// Remove all shows past tomorrows date
				let time = new Date(shows.date + ' 00:00:00').getTime(); // 24h*60min*60sek*1000ms = 86400000ms
				return new Date().getTime() > time - 86400000;
			})
			.map((shows)=>new Showing(undefined, shows)); 　// undefined = line20 (shows) のことで、既に作っているからundefinedになる, shows = shows.tomorrow i showing.class
		// Startar slider om 0 sekunder! (nästa frame). Tidintervall på slider är 5 sekunder
		setTimeout(function(){
			$("#movieslider").carousel('cycle');
		}, 0);

		this.poster = Data.movies.slice(0, 6);    
		// ８．Dataクラスからきた(Data.moviesは、film.json ファイル i Dataクラス), これをhome-page.class.js(0から6個)で使える。
		// this.poster はData.movies (JSONの全部の映画), ...slice(0,6)で数を指定

		// $(document).on('click', '.close', function (e) {
  // 		$('#filmmodal').modal('hide');
		// });

// 		$(function () {
//     $(".close").on('click', function() {
//         $('#filmmodal').modal('hide');
//     });
// });

	}
}
