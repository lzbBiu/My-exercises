function EventTarget(){
	this.handlers = {};
}
EventTarget.prototype = {
	constructor: EventTarget,
	//添加方法，将一特定类型的事件处理函数放置在一个数组中
	addHandler:function(type,handler){
		if(typeof this.handlers[type] === 'undefined'){
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
	},
	//触发
	fire: function(event){
		if(!event.target){
			event.target = this;
		}
		if(this.handlers[event.type] instanceof Array){
			var handlers = this.handlers[event.type];
			for(var i=0, len = handlers.len; i<len; i++){
				handlers[i](event);
			}
		}
	},
	removeHandler: function(type,handler){
		if(this.handlers[type] instanceof Array){
			var handlers = this.handlers[type];
			for(var i=0,len=handlers.length;i<len; i++){
				if(handlers[i] === handler){
					break;
				}
			}
			handlers.splice(i,1);
		}
	}
};