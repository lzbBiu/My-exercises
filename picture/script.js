//DOM
var contains = document.getElementById('contains');


//通过jsonp获取本地的json文件
function jsonp(url){
	var script = document.createElement('script');
	script.src=url;
	document.body.insertBefore(script,document.body.firstChild);
	return new Promise(function(resolve,reject){
		//callback要绑定在window上
		window.handleResponse = function(response){
			if(response){
				resolve(response);
			}
		}
	}); 
}

function check(arr){
	const result = [];
	arr.forEach(function(item){
		const img = new Image();
		img.src = `img/${item}`;
		let getSize = setInterval(() => {
			if(img.width>0){
				item = {
					width: img.width,
					height: img.height
				};
				result.push(item);
				if(result.length === arr.length) setNum(arr,result);
				clearInterval(getSize);
			}
		},10);
	});
}

function setNum(arr,result){
		//获取每个imgrow中应该由几个图片
		//同时此时应再contains建立<ul>
		var imgList = document.createElement('ul');
		contains.insertBefore(imgList,null);
		var imgrows = [];
		imgrows.push(-1);
		var imgrowWidth = 0;
		var imgrowWidths = [];
		const maxHeight = 220;
		var containsWidth = contains.offsetWidth;
		for(let i=0; i<result.length; i++){
			imgWidth = result[i].width * (maxHeight/result[i].height);
			imgrowWidth += imgWidth;
			if(imgrowWidth >= containsWidth){
				imgrowWidths.push(imgrowWidth);
				imgrows.push(i);
				imgrowWidth = 0;
			}
		}
		//此时imgList.length 及为行数， 
		//但每行高度不确定，先再ul中建立对应行数的<li>
		var imgBoxs = [];
		imgrows.push(arr.length-1);
		for(let j=0; j<imgrows.length-1; j++){
			var imgrow = document.createElement('li');
			var note = 0.9 * containsWidth/imgrowWidths[j] || 0.8 * 0.8;
			var actualHeight = maxHeight*note;
			//创建图片框并设置宽高
			for(let i=imgrows[j]+1; i<=imgrows[j+1]; i++){
				var imgBox = document.createElement('div');
				imgBox.id = 'box' + i;
				imgBoxs.push(imgBox);
				imgBox.style.width =  result[i].width * (maxHeight/result[i].height) * note  + 'px';
				imgBox.style.height = `${actualHeight}px`;
				imgrow.appendChild(imgBox);
			}
			
			contains.firstChild.appendChild(imgrow);
		}
		var imgs = [];
		for(let i=0; i<arr.length; i++){
			var img = new Image();
			img.src = 'img/' + arr[i];
			img.id =  i + 'img';
			imgs.push(img);
		}
		imgs.forEach((item) => {
			item.onload = function(){
				var i = parseInt(item.id);
				//20为padding值应动态获取
				item.style.width = document.getElementById(imgBoxs[i].id).offsetWidth - 10;
				item.style.height = document.getElementById(imgBoxs[i].id).offsetHeight - 10;
				document.getElementById(imgBoxs[i].id).appendChild(item);
			}
		});
		
}


jsonp('json.json?callback=handleResponse').then(response => {
	check(response);
});
