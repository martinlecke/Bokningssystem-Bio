class User extends Base {
	
	constructor(props){
	super();
		for(let name in props){
			this[name] = props[name];
		}
	}
}