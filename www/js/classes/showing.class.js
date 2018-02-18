class Showing extends Base {
	
	constructor(showstoday, showstomorrow){
		super();
		Object.assign(this, showstoday);
		Object.assign(this, showstomorrow);
	}
}