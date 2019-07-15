class Object{
	constructor(){
		this.handlers = {}
	}
	add(type,handler){
		if(typeof this.handlers[type] == 'undefined'){
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler)
	}
	fire(type,...rest){
		if(this.handlers[type] instanceof Array){
			this.handlers[type].forEach((item) => {
				item.apply(this,rest);
			});
		}
	}
	remove(type,handler){
		if(this.handlers[type] instanceof Array){
			this.handlers[type] = this.handlers[type].filter((item) => {
				item !== handler;
			});
		}
	}
}