class CarouselItem extends Base {
// props = home-page.class i constructorから来ている
//this.slider = []
// for(let movie of Data.movies){
// this.slider.push(new CarouselItem(movie))のこと
	constructor(props){
		super();
		for(let name in props){
			if(['title','active','images'].includes(name)){
				this[name] = props[name];
			}
		}
		
	}
}
