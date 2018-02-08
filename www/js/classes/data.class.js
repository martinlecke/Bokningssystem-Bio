class Data{

	constructor(){
		this.load();
	}
	async load(){
		JSON._classes(Movie, UpcomingMovie, Show, User, BookingData);
		Data.movies = await JSON._load("film");　　// 7. film = film.json, もしjsonファイルを増やしたらここに追加
		Data.upcoming = await JSON._load("premiar");
    Data.shows = await JSON._load("shows");
		Data.user = await JSON._load("users");
		Data.booking = await JSON._load("booking");
    Data.salong = await JSON._load("salong");

    
		app.start();	// ２．上のが読み込まれたら、appクラスがスタートする
	}
}