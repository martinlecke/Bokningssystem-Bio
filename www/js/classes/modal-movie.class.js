// Används typ


class ModalMovie extends Base {
	
	constructor(props){
		super();
    console.log(props);
    for (let name in props) {
      this[name] = props[name];
    }
    this.render('#filmmodal');
	}
			
		
	}	
