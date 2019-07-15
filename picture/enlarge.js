
window.onload = function(){
	//DOM
	var mask = document.getElementById('mask');
	var show = document.getElementById('show');
	var imgs = document.getElementsByTagName('img');
	function setMask(){
		var maskHeight = contains.offsetHeight;
		imgs = document.getElementsByTagName('img');
		for(let i=0; i<imgs.length; i++){
			imgs[i].onclick = function(){
				//设置mask
				mask.style.height = 2 * maskHeight;
				mask.classList.add('mask');
				document.body.style.overflow = "hidden";
				var url = imgs[i].getAttribute('data-url');
				var imgWidth = imgs[i].getAttribute('data-width');
				var imgHeight = imgs[i].getAttribute('data-height');
				show.style.width = imgWidth;
				show.style.height = imgHeight;
				show.classList.add('show');
				show.style.backgroundImage = `url(${url})`;
				
			}
		}
	}
	window.addEventListener('scroll',setMask);
	setMask();
	mask.onclick = function(){
		document.body.style.overflow = "auto";
		mask.classList.remove('mask');
		mask.style.height = 0;
		show.style.width = 0;
		show.style.height = 0;
		show.classList.remove('show');
		show.style.backgroundImage = "";
	}
	show.onclick = function(){
		document.body.style.overflow = "auto";
		mask.classList.remove('mask');
		mask.style.height = 0;
		show.style.width = 0;
		show.style.height = 0;
		show.classList.remove('show');
		show.style.backgroundImage = "";
	}
}

//点击mask时收起mask与展示图片
