class CurrentMovie extends Base {
	
	constructor(props){
		super();
		for(let name in props){
			if(['title','poster'].includes(name)){
				this[name] = props[name];
			}
		}
	}
}