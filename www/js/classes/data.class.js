class Data{

	constructor(){
		this.load();
	}
	async load(){
		JSON._classes(Movie, Show, User);
		Data.movies = await JSON._load("film");　　// 7. film = film.json, もしjsonファイルを増やしたらここに追加
		Data.upcomming = await JSON._load("premiar");
    Data.shows = await JSON._load("shows");
    Data.user = await JSON._load("users");
    
		app.start();	// ２．上のが読み込まれたら、appクラスがスタートする
	}
}