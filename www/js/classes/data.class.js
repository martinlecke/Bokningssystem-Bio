class Data{

	constructor(){
		this.load();
	}
	async load(){
		JSON._classes(Movie, Show);
		Data.movies = await JSON._load("film");　　// 7. film = film.json, もしjsonファイルを増やしたらここに追加
		Data.upcomming = await JSON._load("premiar");
    Data.shows = await JSON._load("shows");
    
		app.start();	// ２．上のが読み込まれたら、appクラスがスタートする
	}
}