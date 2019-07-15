var container = document.getElementById("container");
var box1 = container.getElementsByTagName("div")[0];
//当主体动画end时,fire观察者

function Observer(){
	//存放观察者处理函数
	this.handlers = {};
}
Observer.prototype = {
	constructor: Observer,
	add: function(type,handler){
		if(typeof this.handlers[type] == 'undefined'){
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
	},
	//传入一个对象，包含type与handler及参数值
	fire: function(event){
		if(!event.target){
			event.target = this;
		}
		if(this.handlers[event.type] instanceof Array){
			var handlers = this.handlers[event.type];
			for(var i=0;i<handlers.length;i++){
				//把对象作为参数
				handlers[i](event);
			}
		}
	},
	
	remove: function(type,handler){
		if(this.handlers[type] instanceof Array){
			var handlers = this.handlers[type];
			for(var i=0;i<handlers.lenght;i++){
				if(handlers[i] === handler){
					break;
				}
			}
			handlers.splice(i,1);
		}
	}
}

var observer = new Observer();
var box2 = container.getElementsByTagName("div")[1];


function follow(){
	box2.classList.toggle("follow");
	
}

observer.add('follow',follow);
box1.addEventListener("transitionend",function(){
	follow({type:'follow'});
},false);