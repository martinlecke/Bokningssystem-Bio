class ModalMovie extends Base {
	
	constructor(props){
		super();
    for (let name in props) {
 			if (name !== 'template') {
   		 this[name] = props[name];
 			}
		}
    this.render('#modalmovie');
	}		
}