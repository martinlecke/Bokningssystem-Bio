class ModalMovie extends Base {
	
	constructor(props){
		super();
    for (let name in props) {
 			if (name !== 'template') {
   		 this[name] = props[name];
 			}
		}
		this.modalShowing = []
    for(let i = 0; i < Data.shows.length; i++){ 
    	if(Data.shows[i].film === this.title){
      	this.modalShowing.push(new ModalShowing(Data.shows[i])); 
    	}
    } 
    this.render('#modalmovie');

  }


  click() {
    $('#filmmodal').on('hidden.bs.modal', function (e){
      location.hash = "";
    });
  }

}