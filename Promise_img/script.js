var container = document.getElementById("container");
var rotate = document.getElementById("rotate");
//jsonp获取本地json

function jsonp(url){
	var script = document.createElement('script');
	script.src=url;
	document.body.insertBefore(script,document.body.lastChild);
	return new Promise(function(resolve,reject){
		//callback要绑定在window上
		window.handleResponse = function(response){
			if(response){
				resolve(response);
			}else{
				reject(new Error('失败了'));
			}
		}
	}); 
}
//setTimeout模拟加载
setTimeout(function(){
	jsonp('arr.json?callback=handleResponse').then(response => {
		//加载图片
		var img = new Image();
		img.src = "img/" + response[0];
		img.onload = function(){
			//去掉container内部加载动画子元素
			container.removeChild(rotate);
			//获取图片原始大小，修改container大小
			container.style.width = img.width;
			container.style.height = img.height;
			container.style.backgroundImage = `url(${img.src})`;
			console.log(container.style.backgroundImage);
		}
		

	})
},1000)
