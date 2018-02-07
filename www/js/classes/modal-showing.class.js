class ModalShowing extends Base {
	
	constructor(props){
		super();
	    // let film = film.replace(/[, :']/g, "").toLowerCase();
     //  		film = film.replace(/[åä]/g, "a");
     //  		film = film.replace(/[ö]/g, "o");
		for(let name in props){
			if(['time', 'date', 'id', 'film'].includes(name)){
				this[name] = props[name];
			}
		}
		
	}
}