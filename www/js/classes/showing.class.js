class Showing extends Base {
	
	constructor(props){
		super();
		for(let name in props){
    	if(['time','title'].indexOf(name)>=6){break;}
    	this[name] = props[name];
    }
    console.log('showing', this);

	}
}