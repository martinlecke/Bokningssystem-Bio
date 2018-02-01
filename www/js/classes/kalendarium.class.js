class Kalendarium extends Base {
	
	constructor(){
		super();

		this.blocks = [];
		for(let show of Data.shows){
				this.blocks.push(new Show(show))
		}	

	}

}