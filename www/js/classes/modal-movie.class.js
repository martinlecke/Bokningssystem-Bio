class ModalMovie extends Base {
	
	constructor(props){
		super();
    for (let name in props) {
 			if (name !== 'template') {
   		 this[name] = props[name];
 			}
		}
		this.modalShowing = [] 
    for(let movie of Data.shows.slice(0, 7)){ 
      this.modalShowing.push(new ModalShowing(movie)) 
    } 
    this.render('#modalmovie');
	}		
}