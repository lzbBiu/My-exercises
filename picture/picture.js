//DOM
var contains = document.getElementById('contains');
//读取json文件
function jsonp(url){
	var script = document.createElement('script');
	script.src=url;
	document.body.insertBefore(script,document.body.firstChild);
	return new Promise(function(resolve,reject){
		//callback绑定在window上
		window.handleResponse = function(response){
			if(response){
				resolve(response);
			}
		}
	}); 
}
//随机数
function randomColor(){
	var colorArr = ['#ccffff','#ccff99','#ffccff','#ff9966','#ffffb3','#ffcc66'];
	var num = Math.floor(Math.random()*6);
	return colorArr[num];
}

//check函数，图片Ping, 发送图片请求，通过定时器监听返回结果
var index = -1;
function check(arr){
	index++;
	//初始化一个result来保存建立好的图片，传递给setBox
	const result = new Array(arr.length).fill(0);
	arr.forEach((item) =>{
		const img = new Image();
		img.src = `img/${item}`;
		//将返回结果存储到对应图片的data-属性中
		
		//这里新生成的图片要生成新的data
		/*
			在全局变量中创建一个索引，每调用一次check增加一次
			新图片的data-num 属性为 indexof(item) + index * (arr.length)
		*/
		
		
		img.setAttribute('data-num',`${arr.indexOf(item) + index * (arr.length)}`);
		img.setAttribute('data-url',`img/${item}`);
		let getSize = setInterval(() => {
			if(img.width>0){
				img.setAttribute('data-width',`${img.width}`);
				img.setAttribute('data-height',`${img.height}`);
				var imgNum = img.getAttribute('data-num') - index * (arr.length);
				result.splice(imgNum,1,img);
				//如果这是最后一次循环，及所有图片都获取到了size
				if(parseInt(item) === arr.length){
					setBox(result);
				}
				clearInterval(getSize);
			}
		},10);
	});
}

//创建图片底框，获取从相应图片的data-属性中取得尺寸，设置到自身
function setBox(result){
	const maxHeight = 200;
	var bodyWidth = document.body.clientWidth;
	var boxListWidth = 0;
	var boxListArr = [];
	var rates = [];
	boxListArr.push(-1);
	for(let i=0; i<result.length; i++){
		boxListWidth += result[i].getAttribute('data-width') * (maxHeight/(result[i].getAttribute('data-height')));
		if(boxListWidth >= bodyWidth){
			boxListArr.push(i);
			var rate = bodyWidth/boxListWidth * 0.9;
			rates.push(rate);
			boxListWidth = 0;
		}
		
	}
	rates.push(0.8);
	boxListArr.push(result.length-1);
	for(let i=0; i<boxListArr.length-1; i++){
		var list = document.createElement('ul');
		contains.appendChild(list);
		for(let j=boxListArr[i]+1; j<=boxListArr[i+1]; j++){
			//创建li
			var box = document.createElement('li');
			box.setAttribute('data-num',`${j}`);
			var boxWidth = result[j].getAttribute('data-width') * (maxHeight/(result[j].getAttribute('data-height'))) * rates[i];
			var boxHeight = rates[i] * maxHeight;
			box.style.width = boxWidth;
			box.style.height = boxHeight;
			box.setAttribute('data-width',`${boxWidth}`);
			box.setAttribute('data-height',`${boxHeight}`);
			//设置随机底色
			box.style.backgroundColor = randomColor();
			//添加到对应的ul中
			list.appendChild(box);
		}
	}
	setImg(result);
}
//将图片放进对应的box中并且每放入一个就消除对应box的底色
function setImg(result){
	for(let i=0; i<result.length; i++){
		var num = result[i].getAttribute('data-num');
		var box = document.getElementsByTagName('li')[num];
		var imgWidth = box.getAttribute('data-width') - 12;
		var imgHeight = box.getAttribute('data-height') - 12;
		result[i].style.width = imgWidth;
		result[i].style.height = imgHeight;
		box.appendChild(result[i]);
		box.style.backgroundColor = 'white';
	}
}
jsonp('json.json?callback=handleResponse').then(response => {
	window.response = response;
	check(response);
});

//节流
function throttle(method,context){
	clearTimeout(method.tId);
	method.tId = setTimeout(() => {
		method.call(context);
	},100);
}
function resize(){
	//此时应重排序，待完善
	if(contains.lastChild){
		contains.innerHTML = '';
	}
	check(window.response);
}
function load(){
	if(document.body.scrollHeight - document.body.scrollTop < document.body.clientHeight+100){
		jsonp('json.json?callback=handleResponse').then(response => {
			check(response);
			//将新图片加入到新的盒子中
		});
		
	}
	
}
//resize重新布局
window.onresize = function(){
	throttle(resize);
}
//滚动
function setScroll(){
	throttle(load);
}
window.addEventListener('scroll',setScroll);

