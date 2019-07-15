//保存全部式神编号列表
const figIdMap = new Map([		
	[101,'彼岸花呱'],
	[102,'赤舌'],
	[103,'茨木呱'],
	[104,'大天狗呱'],
	[105,'盗墓小鬼'],
	[106,'灯笼鬼'],
	[107,'花鸟卷呱'],
	[108,'荒川呱'],
	[109,'荒呱'],
	[110,'辉夜姬呱'],
	[111,'寄生魂'],
	[112,'酒吞呱'],
	[113,'两面佛呱'],
	[114,'青行灯呱'],
	[115,'唐纸伞妖'],
	[116,'提灯小僧'],
	[117,'天邪鬼赤'],
	[118,'天邪鬼黄'],
	[119,'天邪鬼绿'],
	[120,'天邪鬼青'],
	[121,'涂壁'],
	[122,'小鹿男呱'],
	[123,'阎魔呱'],
	[124,'妖刀姬呱'],
	[125,'一目连呱'],
	[126,'帚神'],
	
	[201,'兵勇'],
	[202,'独眼小僧'],
	[203,'恶鬼'],
	[204,'古笼火'],
	[205,'管狐'],
	[206,'河童'],
	[207,'蝴蝶精'],
	[208,'椒图'],
	[209,'觉'],
	[210,'九命猫'],
	[211,'狸猫'],
	[212,'鲤鱼精'],
	[213,'青蛙瓷器'],
	[214,'三尾狐'],
	[215,'山童'],
	[216,'山兔'],
	[217,'食发鬼'],
	[218,'首无'],
	[219,'数珠'],
	[220,'天井下'],
	[221,'跳跳弟弟'],
	[222,'跳跳妹妹'],
	[223,'跳跳犬'],
	[224,'铁鼠'],
	[225,'童男'],
	[226,'童女'],
	[227,'兔丸'],
	[228,'巫盅师'],
	[229,'武士之灵'],
	[230,'小袖之手'],
	[231,'鸦天狗'],
	[232,'萤草'],
	[233,'雨女'],
	[234,'座敷童子'],
	[235,'虫师'],
	[236,'丑时之女'],
	
	[301,'白狼'],
	[302,'白童子'],
	[303,'百目鬼'],
	[304,'般若'],
	[305,'二口女'],
	[306,'凤凰火'],
	[307,'姑获鸟'],
	[308,'骨女'],
	[309,'鬼女红叶'],
	[310,'鬼使白'],
	[311,'鬼使黑'],
	[312,'海坊主'],
	[313,'黑童子'],
	[314,'化鲸'],
	[315,'惠比寿'],
	[316,'金鱼姬'],
	[317,'傀儡师'],
	[318,'镰鼬'],
	[319,'络新妇'],
	[320,'猫掌柜'],
	[321,'孟婆'],
	[322,'判官'],
	[323,'青坊主'],
	[324,'清姬'],
	[325,'犬神'],
	[326,'人面树'],
	[327,'日和坊'],
	[328,'入殓师'],
	[329,'食梦貘'],
	[330,'书翁'],
	[331,'桃花妖'],
	[332,'跳跳哥哥'],
	[333,'万年竹'],
	[334,'吸血姬'],
	[335,'匣中少女'],
	[336,'小松丸'],
	[337,'雪女'],
	[338,'熏'],
	[339,'烟烟罗'],
	[340,'妖琴师'],
	[341,'妖狐'],
	[342,'夜叉'],
	[343,'一反木绵'],
	[344,'以津真天'],
	[345,'弈'],
	[346,'於菊虫'],
	[347,'鸩'],
	[348,'追月神'],
	[349,'樱花妖'],
	
	[401,'苍风一目连'],
	[402,'赤影妖刀姬'],
	[403,'稻荷神御馔津'],
	[404,'炼狱茨木童子'],
	[405,'少羽大天狗'],
	
	[501,'阿香'],
	[502,'八歧大蛇'],
	[503,'白藏主'],
	[504,'彼岸花'],
	[505,'不知火'],
	[506,'茨木童子'],
	[507,'大天狗'],
	[508,'鬼灯'],
	[509,'鬼切'],
	[510,'花鸟卷'],
	[511,'荒'],
	[512,'荒川之主'],
	[513,'辉夜姬'],
	[514,'酒吞童子'],
	[515,'桔梗'],
	[516,'两面佛'],
	[517,'卖药郎'],
	[518,'蜜桃&芥子'],
	[519,'面灵气'],
	[520,'奴良陆生'],
	[521,'青行灯'],
	[522,'犬夜叉'],
	[523,'杀生丸'],
	[524,'山风'],
	[525,'小鹿男'],
	[526,'雪童子'],
	[527,'阎魔'],
	[528,'妖刀姬'],
	[529,'一目连'],
	[530,'玉藻前'],
	[531,'御馔津']
]);

//保存全局变量
var level,	//等级范围
	figNumber,	//式神编号
	figName,	//式神名称
	figFrequency,	//式神次数
	exList, 	//保存现有式神列表
	recordText = 0;	//点击次数
//保存dom
var	drawCanvas = document.getElementsByClassName("draw-canvas")[0],	//画板
	knapsackStatisticRecord  = document.getElementsByClassName("knapsack-statistic-record")[0],	//抽卡次数span
	knapsackContent = document.getElementsByClassName("knapsack-content")[0],	//背包
	knapsackClearBtn = document.getElementsByClassName("knapsack-clear-btn")[0],	//清除按钮
	drawBtn = document.getElementsByClassName("draw-btn")[0],		//按钮
	drawLoadingContent = document.getElementsByClassName("draw-loading-content")[0],		//加载动画
	drawBg = document.getElementsByClassName("draw-bg")[0],			//背景
	drawBf = document.getElementsByClassName("draw-bf")[0],			//底框
	drawContentBg = document.getElementsByClassName("draw-content-bg")[0],  //底图
	drawBfGrade = document.getElementsByClassName("draw-bf-grade")[0],	//等级
	drawColseBtn = document.getElementsByClassName("draw-colse-btn")[0],	//关闭
	drawContentImg = document.getElementsByClassName("draw-content-img")[0],	//式神图片
	drawBfName = document.getElementsByClassName("draw-bf-name")[0],		//名称	
	knapsack = document.getElementsByClassName("knapsack")[0],	//背包
	knapsackTrigger  =  document.getElementsByClassName("knapsack-trigger")[0];	//背包 - 切换按钮
//快排
function quickSort(arr,i,j){
  if((j-i)<=1){
    return arr;
  }
  var left = i,
	right = j,
	pivot = left,
	center = arr[left];
  while(left<right){
    while(left<right && arr[right]>=center){
      right--;
    }
    if(left<right){
      arr[left] = arr[right];
      left++;
    }
    while(left<right && arr[left]<center){
      left++;
    }
    if(left<right){
      arr[right] = arr[left];
      right--;
    }
  }
  pivot = left;
  arr[pivot] = center;
  quickSort(arr,i,pivot-1);
  quickSort(arr,(pivot+1),j);
  return arr;
}	
	
//初始化	
function init(){
	//初始化背包位置
	knapsack.style.marginRight = - (knapsack.offsetWidth) + "px";
	knapsackTrigger.innerText = " << 背包 ";
	//初始化抽卡次数
	if(localStorage.clickNum !== undefined){
		recordText = Number(localStorage.clickNum);
		knapsackStatisticRecord.innerText = Number(recordText);
	}else{
		recordText = 0;
		knapsackStatisticRecord.innerText = Number(recordText);
	}
	//初始化背包
	var childs = knapsackContent.childNodes; 
	for(var i = childs.length - 1; i >= 0; i--) {
	  knapsackContent.removeChild(childs[i]); 
	}
	if(localStorage.exList !== undefined){
		exList = new Map(JSON.parse(localStorage.exList));
		var arrKey = [];
		for(let key of exList.keys()){
			arrKey.push(key);
		}
		console.log(arrKey);
		quickSort(arrKey,0,arrKey.length-1);
		console.log(arrKey);
		arrKey.reverse();
		for(let key of arrKey){
			//根据编号获取式神名称
			figName = figIdMap.get(key);
			//li 保存等级,名称与次数
			var lis = document.createElement("li");
			//img 保存等级图片
			var gradeImg = document.createElement("img");
			//向img中添加图片
			switch(true){
				case key>100 && key<200:
					gradeImg.src = "bg/N.png";
					break;
				case key>200 && key<300:
					gradeImg.src = "bg/R.png";
					break;
				case key>300 && key<400:
					gradeImg.src = "bg/SR.png";
					break;
				case key>400 && key<500:
					gradeImg.src = "bg/SP.png";
					break;
				case key>500 && key<600:
					gradeImg.src = "bg/SSR.png";
					break;		
			}
			//span 保存名称
			var spans = document.createElement("span");
			//保存名称文本
			var figNameText = document.createTextNode(figName);
			//将名称文本添加到span中
			spans.appendChild(figNameText);
			//small 保存收到的次数
			var figFreSmall = document.createElement("small");
			//获取次数
			figFrequency = exList.get(key);
			//创建次数文本
			var figFreText = document.createTextNode(figFrequency);
			//添加次数文本
			figFreSmall.appendChild(figFreText);
			
			//将各个节点依次添加到li
			lis.appendChild(gradeImg);
			lis.appendChild(spans);
			lis.appendChild(figFreSmall);
			//将li添加到ul
			knapsackContent.appendChild(lis);
		}
	}else{
		exList = new Map();
	}
}
//函数节流
function throttle(method,context){
	clearTimeout(method.tId);
	method.tId = setTimeout(function(){
		method.call(context);
	},100);
}
//重置函数
function reset(){
	knapsack.style.marginRight = - (knapsack.offsetWidth) + "px";
}
//随机等级
function randomNum(min,max){
	return Math.floor(Math.random()*(max-min+1)+min);
}
//随机编号
function conNum(num){
	switch(true){
		case num>=1&&num<= 31:
			figNumber = randomNum(101,126);
			break;
		case num>=32&&num<= 72:
			figNumber = randomNum(201,236);
			break;
		case num>=73&&num<= 96:
			figNumber = randomNum(301,348);
			break;
		case num>=97&&num<= 97:
			figNumber = randomNum(401,405);
			break;
		case num>=98:
			figNumber = randomNum(501,531);
			break;
	}
}
//松开鼠标运行抽卡函数
function pumping(){
	//获得等级范围
	level = randomNum(1,100);
	//获得编号
	conNum(level);
	//获得名称
	figName = figIdMap.get(figNumber);
	//确定exList是否存在该式神编号
	if(exList.has(figNumber)){
		//如果存在则次数加1
		var preRecord = Number(exList.get(figNumber)) + 1;
		exList.set(figNumber,preRecord);
	}else{
		//如果没有将式神编号加入exList中，次数为1
		exList.set(figNumber,1);
	}
	//更新localStorage.exList
	localStorage.exList = JSON.stringify([...exList]);
	//更新背包
	init();
	//抽卡次数+1
	recordText = Number(recordText)+1;
	knapsackStatisticRecord.innerText = Number(recordText);
	localStorage.clickNum = Number(recordText);
	//播放动画
	 play();
}
//播放动画函数
function play(){
	//加载
	drawLoadingContent.parentNode.classList.add("draw-load");
	//加载中间式神主图片
	var srcText =  "img/" + figNumber+ ".png";
	drawContentImg.src = srcText;
	
	drawContentImg.onload = function(){
		drawLoadingContent.parentNode.classList.remove("draw-load");
		drawBg.classList.remove("hide");
	
		//底图
		drawContentBg.style.backgroundImage = "url('bg/bg.jpg')";
		
		//添加底框图片
		drawBf.style.backgroundImage = "url('bg/bf.png')";
		//添加等级图片
		switch(true){
			case figNumber>100 && figNumber<200:
				drawBfGrade.src = "bg/N.png";
				break;
			case figNumber>200 && figNumber<300:
				drawBfGrade.src = "bg/R.png";
				break;
			case figNumber>300 && figNumber<400:
				drawBfGrade.src = "bg/SR.png";
				break;
			case figNumber>400 && figNumber<500:
				drawBfGrade.src = "bg/SP.png";
				break;
			case figNumber>500 && figNumber<600:
				drawBfGrade.src = "bg/SSR.png";
				break;		
		}
		//	添加名称
		figName = figIdMap.get(figNumber);
		drawBfName.innerText = figName;
	}
}
//清除
function clear(){
	//重置所有localStorage并初始化
	localStorage.clear();
	init();
}

//运行
window.onload = function(){
	init();
}
window.onresize = function(){
	throttle(reset);
};
knapsackTrigger.onclick = function handover(){
	if(parseInt(knapsack.style.marginRight)>=0){
		knapsack.style.marginRight = - (knapsack.offsetWidth) + "px";
		knapsackTrigger.innerText = " << 背包 ";
	}else{
		knapsack.style.marginRight=0;
		knapsackTrigger.innerText = " 背包 >> ";
	}
}

//点击事件展开画板
drawBtn.onclick = function(){
	drawCanvas = document.getElementsByClassName("draw-canvas")[0],
	drawCanvas.width = 304;
	drawCanvas.height = 542;
	cxt = drawCanvas.getContext("2d"); 	//2d绘图对象
}
//在画板上按下鼠标开始画图，松开鼠标开始抽卡
drawCanvas.onmousedown = function(e) {
	var e = e || window.e;
	cxt.beginPath();
	cxt.moveTo(e.clientX - drawCanvas.offsetLeft, e.clientY - drawCanvas.offsetTop);
	document.onmousemove = function(e) {
		var e = e || window.e;
		cxt.lineTo(e.clientX - drawCanvas.offsetLeft, e.clientY - drawCanvas.offsetTop);
		cxt.lineWidth = 10;
		cxt.stroke(); //链接起始点和终结点
		cxt.strokeStyle = "green"; //笔触的颜色
	};
	
	document.onmouseup = function() {
		document.onmousemove = null;
		document.onmouseup = null;
		//清空画板
		cxt.clearRect(0,0,drawCanvas.width,drawCanvas.height);
		drawCanvas.width = 0;
		drawCanvas.height = 0;
		//释放draw
		drawCanvas = null;
		cxt = null;
		//运行函数
		pumping();		
	}
}
//手机触摸
drawCanvas.addEventListener("touchstart",function(e){
	var e = e || window.e;
	var touch = e.touches[0];
	cxt.beginPath();
	cxt.moveTo(touch.clientX - drawCanvas.offsetLeft, touch.clientY - drawCanvas.offsetTop);
});
drawCanvas.addEventListener("touchmove",function(e){
	var e = e || window.e;
	e.preventDefault();
	var touch = e.touches[0];
	cxt.lineTo(touch.clientX - drawCanvas.offsetLeft, touch.clientY - drawCanvas.offsetTop);
	cxt.lineWidth = 10;
	cxt.stroke(); //链接起始点和终结点
	cxt.strokeStyle = "green"; //笔触的颜色
});
drawCanvas.addEventListener("touchend",function(e){
	var e = e || window.e;
	var touch = null
	//清空画板
	cxt.clearRect(0,0,drawCanvas.width,drawCanvas.height);
	drawCanvas.width = 0;
	drawCanvas.height = 0;
	//释放draw
	drawCanvas = null;
	cxt = null;
	//运行函数
	pumping();
});
 
//关闭
drawColseBtn.onclick = function(){
	drawBg.classList.add("hide");
}

//清除localSrorage
knapsackClearBtn.onclick = function(){
	//是否确认清除
	var isConfirm = confirm('确认清除所有现有数据,重新开始抽卡嘛？');
	if(isConfirm){
		//清除
		clear();
	}
}




























