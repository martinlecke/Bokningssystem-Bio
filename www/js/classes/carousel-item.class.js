class CarouselItem extends Base {

	constructor(props){
    super();
    this.active = false;
    for(let name in props){
    	if(['title','active','images'].indexOf(name)<0){continue;}
    	this[name] = props[name];
    }
    console.log('CarouselItem', this);

	}
}
