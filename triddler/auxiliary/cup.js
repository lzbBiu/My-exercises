points: [[19,-92],[38,-46],[38,46],[0,92],[-38,46],[-38,46],[-19,-92]],

for(var i=0; i<10; i++){
	stage.insert(new Q.Shark());
}



(function(){
	var i =1;
	var timer = setInterval(function(){
		i++;
		if(i > 10){
			clearInterval(timer);
		}
		stage.insert(new Q.Shark());
	},1000);
})();