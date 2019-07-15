//DOM获取
var bg = document.getElementById("bg");
var shadow = document.getElementById("shadow");
var container = document.getElementById("container");
var loading = document.getElementsByClassName("loading")[0];
var play = document.getElementById("play");
//promise.all()请求音频与图片
var promiseImgs = ['bg','img'].map(function(id){
	return new Promise(function(resolve,reject){
		var img = new Image();
		img.src = `resource/${id}.jpg`;
		img.onload = function(){
			resolve(img.src);
		}
	});
});
var promiseAudio = new Promise(function(resolve,reject){
	//新建的audio默认设置预加载属性
	var audio = new Audio();
	audio.src = 'resource/audio.mp3';
	audio.oncanplaythrough = function(){
		resolve(audio.src);
	}
});
Promise.all([promiseAudio,...promiseImgs]).then(function(response){
	//完成隐藏操作
	var audio = new Audio();
	audio.src = response[0];
	audio.loop = 'loop';
	document.body.insertBefore(audio,bg);
	//加载play按钮
	play.style.display = 'block';
	loading.classList.remove("loading");
	play.onclick = function(){
		//再次隐藏play
		play.style.display = 'none';
		//显示操作
		loading.classList.add("blank");
		document.body.style.backgroundColor = "gray";
		bg.style.backgroundImage = `url(${response[1]})`;
		shadow.classList.add("shadow");
		container.style.backgroundImage = `url(${response[2]})`;
		//播放音乐
		audio.play();
	}
	
	
});


