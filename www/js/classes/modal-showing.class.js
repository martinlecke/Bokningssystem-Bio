class ModalShowing extends Base {
	
	constructor(props){
		super();
		for(let name in props){
			if(['time', 'date', 'showid', 'film'].includes(name)){
				this[name] = props[name];
			}
		}
	}
  click() {
    if($(event.target).hasClass('pop')) {
      $('.modal-backdrop').remove();
    }
  }
}