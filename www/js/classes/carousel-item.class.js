class CarouselItem extends Base {

	constructor(props){
    super();
    this.active = false;
    for(let name in props){
    	if(['title','active','images'].includes(name)){
    	this[name] = props[name];
    }
  }
    console.log('CarouselItem', this);

	}
}
