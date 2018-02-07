class ModalShowing extends Base {
	
	constructor(props){
		super();
		for(let name in props){
			if(['time', 'date', 'id', 'film'].includes(name)){
				this[name] = props[name];
			}
		}
		
	}
}