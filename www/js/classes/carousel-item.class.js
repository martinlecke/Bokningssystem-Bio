class CarouselItem extends Base {

	constructor(props){
		super();
		for(let name in props){
			if(['title','active','images'].includes(name)){
				this[name] = props[name];
			}
		}
		
	}
}
