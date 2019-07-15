var text = document.getElementById("text");
var ball = document.getElementById("ball");
var button = document.getElementById("button");

function transform(arr){
	if(arr === '结束了'){
		text.textContent = '结束了~';
		button.textContent = '不要再点了';
		//解绑按键事件函数
		button.removeEventListener('click',handler,false);
	}
	ball.style.transform = `matrix(${arr[0]},0,0,${arr[1]},${arr[2]},${arr[3]})`;
}

function *generator(){
	yield [1,1.2,-20,-150];
	yield [1,0.8,-20,120];
	yield [1,1,-500,-500];
	return '结束了';
}
var progress = generator();

//绑定事件处理程序
function handler(){
	var data = progress.next().value;
	transform(data);
}
button.addEventListener('click',handler,false);