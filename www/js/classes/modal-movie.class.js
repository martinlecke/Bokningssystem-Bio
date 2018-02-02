class ModalMovie extends Base {
	
	constructor(props){
		super();
    // console.log('ModalMovie props', props);
    for (let name in props) {
 			if (name !== 'template') {
   		this[name] = props[name];
 			}
		}
    // this.title = title;
    // this.productionYear
    // this.length 
    // this.active
    // this.genre
    // this.language
    // this.director 
    // this.actors
    // this.description 
    // this.images 
    // this.poster
    // this.youtubeTrailers 
    // this.productionYear = props.productionYear;
    // this.length = props.length;
    this.render('#modalmovie');
	}
			
		
	}	
