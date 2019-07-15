//解析版

//获取dom
	//user的复选框
var userInputs = document.getElementsByTagName("input");
	//已订阅的频道
	selectList = document.getElementsByClassName('selected'),
	
	//获取到每个频道
	channel = document.getElementsByClassName('channel')[0],
	channelList = channel.getElementsByTagName('div'),
	
	//每个user中的new
	newsList = document.getElementsByClassName('news');

//发布，每隔1s在已订阅相应频道的user中发布消息
var public = {
	
	//存放每个频道有哪些订阅者
	channels: {
		channelA: [],
		channelB: [],
		channelC: [],
		channelD: [],
		channelE: []
	},
	//每秒调用发送
	intv: function(send){
		setTimeout(function(){
			public.send();
			public.intv();
		},1000);
	},
	//判断文本
	text: function(channel){
		var channelText = 'A频道'; 
		switch(channel){
			case 'channelA':
				channelText = 'A频道';
				break;
			case 'channelB':
				channelText = 'B频道';
				break;
			case 'channelC':
				channelText = 'C频道';
				break;
			case 'channelD':
				channelText = 'D频道';
				break;
			case 'channelE':
				channelText = 'E频道';
				break;	
		}
		return channelText;
	},
	//耦合dom
	setNews: function(channel,user){
		var channelText = public.text(channel);
		//在当前频道为当前用户创建消息
		channelText += '消息: ...................';
		var newsText = document.createTextNode(channelText);
		var newsP = document.createElement('p');
		newsP.appendChild(newsText);
		//为当前用户添加文本
		newsList[user].appendChild(newsP);
		
	},
	//发送函数
	send: function(){
		//遍历users取出里面的频道
		for(channel in public.channels){
			//查看channel中的订阅者
			public.channels[channel].forEach(function(user){
				//传入当前频道和频道里的user
				public.setNews(channel,user);
			});
		}
	}
}

//订阅者
var subscribe = {
	//存放选中的user
	select: [],
	//将选中的user加入select, 耦合dom
	setSelect: function(user){
		if(userInputs[user].checked){
			//选中
			subscribe.select.push(user);
		}else{
			//取消选中
			var index = subscribe.select.indexOf(user);
			subscribe.select.splice(index,1);
		}
	}
}

//调度中心
var dispatch = {
	setDom: function(channel,user){
		var btn = document.createElement('div'), 
			btnName = document.createElement('span'), 
			btnCut = document.createElement('span'), 
			cutText = document.createTextNode(' - ');
		//获取到当前元素的对应文本	
		var text = public.text(channel);
		var channelText = document.createTextNode(text);
		btnName.appendChild(channelText);
		btnCut.appendChild(cutText);
		btn.appendChild(btnName);
		btn.appendChild(btnCut);
		selectList[user].appendChild(btn);
		btnName.className = 'text';
		btnCut.className = 'remove';
	},
	add: function(channel){
		//channel为当前点击的频道
		subscribe.select.forEach(function(user){
			var index = public.channels[channel].indexOf(user);
			if(index === -1){
				public.channels[channel].push(user);
				//创建dom
				dispatch.setDom(channel,user);
			}
		})
	},
	//耦合dom
	remove: function(event,user){
		if(event.target.tagName.toLowerCase() === 'span'){
			//获取频道名
			var channelText = event.target.parentNode.firstChild.innerText;
			//移除channels中channel中的user
			var channel = 'channelA';
			switch(channelText){
				case "A频道":
					var channel = 'channelA';
					break;
				case "B频道":
					var channel = 'channelB';
					break;
				case "C频道":
					var channel = 'channelC';
					break;
				case "D频道":
					var channel = 'channelD';
					break;
				case "E频道":
					var channel = 'channelE';
					break;	
			}
			var index = public.channels[channel].indexOf(user);
			public.channels[channel].splice(index,1);
			//移除dom
			var now = event.target.parentNode;
			selectList[user].removeChild(now);
		}
	}
}
//绑定dom
for(var i=0; i<userInputs.length; i++){
	//为复选框绑定函数
	(function(user){
		userInputs[user].onclick = function(){
			subscribe.setSelect(user);
		}
	}(i))
}
for(var i=0; i<channelList.length; i++){
	//为所有频道绑定函数
	(function(j){
		var channel = 'channelA';
		switch(j){
			case 0:
				channel = 'channelA';
				break;
			case 1:
				channel = 'channelB';
				break;
			case 2:
				channel = 'channelC';
				break;
			case 3:
				channel = 'channelD';
				break;
			case 4:
				channel = 'channelE';
				break;	
		}
		channelList[j].onclick = function(){
			dispatch.add(channel);
		}
	}(i))
}
for(var i=0; i<selectList.length; i++){
	//为已订阅的频道绑定函数
	(function(user){
		selectList[user].onclick = function(event){
				dispatch.remove(event,user);
		}
	}(i))
}

public.intv();





