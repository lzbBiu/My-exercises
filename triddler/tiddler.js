var Q = Quintus()
	.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI,Audio");
/*	
	Q.SPRITE_NONE     = 0;
	Q.SPRITE_DEFAULT  = 1;
	Q.SPRITE_PARTICLE = 2;
	Q.SPRITE_ACTIVE   = 4;
	Q.SPRITE_FRIENDLY = 8;
	Q.SPRITE_ENEMY    = 16;
	Q.SPRITE_UI       = 32;
	Q.SPRITE_ALL   = 0xFFFF;
*/	

Q.setup({maximize: true}).touch(Q.SPRITE_ALL);
Q.gravityX = 0;
Q.gravityY = 0;

Q.SPRITE_TIDDLER = 1;
Q.SPRITE_FLOWER = 2;
Q.SPRITE_SHARK = 4;
Q.SPRITE_DECORATE = 8;
var size = 8000;
function getAngle(px,py,mx,my){//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
	var x = Math.abs(px-mx);
	var y = Math.abs(py-my);
	var z = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	var cos = y/z;
	var radina = Math.acos(cos);//用反三角函数求弧度
	var angle = Math.floor(180/(Math.PI/radina));//将弧度转换成角度
	if(mx>px&&my>py){//鼠标在第四象限
		angle = 180 - angle;
	}
	if(mx==px&&my>py){//鼠标在y轴负方向上
		angle = 180;
	}
	if(mx>px&&my==py){//鼠标在x轴正方向上
		angle = 90;
	}
	if(mx<px&&my>py){//鼠标在第三象限
		angle = 180+angle;
	}
	if(mx<px&&my==py){//鼠标在x轴负方向
		angle = 270;
	}
	if(mx<px&&my<py){//鼠标在第二象限
		angle = 360 - angle;
	}
		return angle;
}


	
//tiddler
Q.Sprite.extend('Tiddler',{
	init: function(p){
		this._super(p,{
			sheet: "tiddler",
			sprite: "tiddler",
			x: size/2,
			y: size/2,
			points : [[-20,-80],[20,-80],[40,0],[-40,0]],
			type: Q.SPRITE_TIDDLER,
			collisionMask: Q.SPRITE_SHARK | Q.SPRITE_FLOWER,
			speed: 500,
			vx: 0,
			vy: 0,
			angle: 0,
			targetX: size/2,
			targetY: size/2,
			score:0
		});
		this.add("animation");
	},
	
	step: function(dt){
		this.stage.collide(this);
		this.play("run");
		if(this.p.x !== this.p.targetX || this.p.y !== this.p.targetY){
			this.p.vx = this.p.speed * Math.sin(this.p.angle * Math.PI/180);
			this.p.vy = this.p.speed * Math.cos(this.p.angle * Math.PI/180);
			this.p.x += this.p.vx * dt;
			this.p.y -= this.p.vy * dt;
			
		}
		
		if(this.p.x >= size){
			this.p.x = size;
		}
		if(this.p.x <= 0){
			this.p.x = 0;
		}
		
		if(this.p.y >= size){
			this.p.y = size;
		}
		if(this.p.y <= 0){
			this.p.y = 0;
		}
	}
});

//大鱼
Q.Sprite.extend('Shark',{
	init: function(p){
		this._super(p,{
			sheet: "shark",
			sprite: "shark",
			x: 0,
			y: 0,
			targetX: 0,
			targetY: 0,
			points : [[-50,-200],[50,-200],[100,0],[-100,0]],
			type: Q.SPRITE_SHARK,
			collisionMask: Q.SPRITE_TIDDLER,
			angle: 0,
			speed: 500,
			vx: 0,
			vy: 0
			
		});
		this.add("animation");
		
		this.p.x = Math.floor( Math.random() * (size - 0 + 1) + 0);
		this.p.y = Math.floor( Math.random() * (size - 0 + 1) + 0);
		
		this.p.targetX = Math.floor( Math.random() * (size - 0 + 1) + 0);
		this.p.targetY = Math.floor( Math.random() * (size - 0 + 1) + 0);
		
		this.p.angle = getAngle(this.p.x,this.p.y,this.p.targetX,this.p.targetY);
		this.on("hit");
	},
	
	hit:function(col){
		Q.stageScene("endGame",1,{ color:"white",label: " 当前分数：" + col.obj.p.score });
		var tiddler = Q('Tiddler');
			tiddler.set('speed',0);
	},
	step: function(dt){
			this.p.vx = this.p.speed * Math.sin(this.p.angle * Math.PI/180);
			this.p.vy = this.p.speed * Math.cos(this.p.angle * Math.PI/180);
			this.p.x += this.p.vx * dt;
			this.p.y -= this.p.vy * dt;
			
			this.play("walk");
			
			if(this.p.x > size){
				this.p.x = size;
				this.p.angle = Math.random() * 360;
			}else if(this.p.x < 0){
				this.p.x = 0;
				this.p.angle = Math.random() * 360;
			}
			if(this.p.y > size){
				this.p.y = size;
				this.p.angle = Math.random() * 360;
			}else if(this.p.y < 0){
				this.p.y = 0;
				this.p.angle = Math.random() * 360;
			}
	},
	
});

//花瓣
Q.Sprite.extend('Flower',{
	init: function(p){
		this._super(p,{
			x: size/2,
			y: size/2,
			angle: 0,
			asset: 'flower.png',
			type: Q.SPRITE_FLOWER,
			collisionMask: Q.SPRITE_TIDDLER
		}); 
		var range =  size - 200;
		this.p.x = Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.y = Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.scale = Math.floor( Math.random() * (1.5-1+1) + 1);
		this.on('hit');
	},
	
	hit: function(col){
		var range =  size - 200;
		this.p.x =  Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.y =  Math.floor( Math.random() * (range - 200 + 1) + 200);
		col.obj.p.score += 10;
		Q.stageScene('UI',1,col.obj.p);
	}
	
});

//大石头
Q.Sprite.extend('BigStone',{
	init: function(p){
		var imgArr = ["BigStone1.png","BigStone2.png","BigStone3.png","BigStone4.png"];
		this._super(p,{
			x: size/2,
			y: size/2,
			angle: 0,
			points : [[-1,-1],[1,-1],[1,0],[-1,0]],
			asset:"BigStone1.png",
			type: Q.SPRITE_DECORATE,
			collisionMask: Q.SPRITE_NONE
		}); 
		var range =  size - 200;
		this.p.asset = "" + imgArr[Math.floor( Math.random() * (3-0+1) + 0)];
		this.p.x = Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.y = Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.scale = Math.floor( Math.random() * (1.5-0.8+1) + 0.8);
		this.p.angle = Math.floor( Math.random() * (360-0+1) + 0);
	}
});
//荷叶
Q.Sprite.extend('Lotus',{
	init: function(p){
		var imgArr = ["Lotus1.png","Lotus2.png","Lotus3.png","Lotus4.png"];
		this._super(p,{
			x: size/2,
			y: size/2,
			angle: 0,
			asset:"Lotus1.png",
			points : [[-1,-1],[1,-1],[1,0],[-1,0]],
			type: Q.SPRITE_DECORATE,
			collisionMask: Q.SPRITE_NONE
		}); 
		var range =  size - 200;
		this.p.asset = imgArr[Math.floor( Math.random() * (3-0+1) + 0)];
		this.p.x = Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.y = Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.scale = Math.floor( Math.random() * (1.5-0.8+1) + 0.8);
		this.p.angle = Math.floor( Math.random() * (360-0+1) + 0);
	}
});
//光点
Q.Sprite.extend('Bright',{
	init: function(p){
		this._super(p,{
			x: size/2,
			y: size/2,
			asset: "bright.png",
			points : [[-1,-1],[1,-1],[1,0],[-1,0]],
			type: Q.SPRITE_DECORATE,
			collisionMask: Q.SPRITE_NONE
		}); 
		var range =  size - 200;
		this.p.x = Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.y = Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.scale = Math.floor( Math.random() * (0.6-0.1+1) + 0.1);
	}
});
//波纹
Q.Sprite.extend('Ripple',{
	init: function(p){
		this._super(p,{
			x: 0,
			y: 0,
			points : [[-1,-1],[1,-1],[1,0],[-1,0]],
			asset: "ripple.png",
			type: Q.SPRITE_DECORATE,
			scale: 0.000001,
			opacity: 1,
			collisionMask: Q.SPRITE_NONE
		}); 
		this.add("tween");
	},
	
	
});
//创建一个承载背景的sprite
Q.Sprite.extend('Undertake',{
	init: function(p){
		this._super(p,{
			x: size/2,
			y: size/2,
			w: size*6,
			h: size*6,
			type: Q.SPRITE_DECORATE,
			collisionMask: Q.SPRITE_NONE
		});
		this.on('touch');
		this.add("animation,tween");
	},
	//重置tiddler的属性
	touch: function(touch){
		var	tiddler = Q("Tiddler"),
			tiddlerX = Math.floor(tiddler.first().p.x),
			tiddlerY = Math.floor(tiddler.first().p.y),
			touchX = Math.floor(touch.x),
			touchY = Math.floor(touch.y),
			angle = getAngle(tiddlerX,tiddlerY,touchX,touchY);
			
		tiddler.set('angle',angle);
		tiddler.set('targetX',touch.x);
		tiddler.set('targetY',touch.y);
		
		var	ripple = Q("Ripple");
		ripple.set("x",touch.x);
		ripple.set("y",touch.y);
		ripple.first().animate({scale: 0.5,opacity: 0,},0.5,Q.Easing.Quadratic.Out,{
			callback: function(){
				ripple.set("scale",0.000001);
				ripple.set("opacity",1);
			}
		});
		
	}
});

//开始页背景
Q.Sprite.extend("Background",{
    init: function(p) {
      this._super(p,{
        x: Q.width/2,
        y: Q.height/2,
        asset: 'index.jpg'
      });
    }
});

//开始页
Q.scene('start',function(stage){
	var bg = stage.insert(new Q.Background());
	bg.on("touch",function() {  Q.stageScene("pond");  });
	stage.insert( new Q.UI.Text({
		label: 'START GAME',
		align: 'center',
		x: Q.width/2,
		y: Q.height/2+200,
		weight: 'normal',
		size: 30,
		color: "white"
	}));
	stage.insert(new Q.UI.Text({
      label: "游戏说明：躲避大鱼并捡拾花朵增加积分",
      align: 'center',
      x: Q.width/2,
      y: Q.height/2 - 240,
      weight: "normal",
      size: 20,
	  color: "white"
    }));
})

//重新开始页
Q.scene('endGame',function(stage){
	var tiddler = Q('Tiddler');
		tiddler.set('speed',1000);
	var container = stage.insert(new Q.UI.Container({
		x: Q.width/2 , y: Q.height/2, fill: "rgba(70,172,178,0.5)"
	}));
	
	var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#73b8ff",color:"white",
                                                  label: "再试一次" })); 
	var label = container.insert(new Q.UI.Text({x:0, y:30 + button.p.h, size:18,color:"white",
                                                   label: "请 注 意 躲 避 大 鱼" }));												  
	var label = container.insert(new Q.UI.Text({x:0, y: -30 - button.p.h, color:"white",
                                                   label: stage.options.label }));
	
	button.on("click",function() {
		Q.clearStages();
		Q.stageScene('pond');
	});
	container.fit(50);
	
});

//游戏页
Q.scene('pond',function(stage){
	stage.insert(new Q.Repeater({asset: "bg.jpg"}));
	stage.insert(new Q.Repeater({
		x:0,
		repeatX: false,
		asset: 'wall.png'
	}));
	stage.insert(new Q.Repeater({
		x: size/2,
		repeatX: false,
		asset: 'wall.png'
	}));
	stage.insert(new Q.Repeater({
		y: 0,
		repeatY: false,
		asset: 'wall.png'
	}));
	stage.insert(new Q.Repeater({
		y: size/2,
		repeatY: false,
		asset: 'wall.png'
	}));
	for(var i=0; i<20; i++){
		stage.insert(new Q.BigStone());
	}
	
	for(var i=0; i<300; i++){
		stage.insert(new Q.Bright());
	}
	//由时间添加，设置上限
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
	
	
	var bg = stage.insert(new Q.Undertake()),
		tiddler = stage.insert(new Q.Tiddler());
	
	stage.insert(new Q.Ripple());
	
	for(var i=0; i<50; i++){
		stage.insert(new Q.Lotus());
	}
	//添加小花
	for(var i=0; i<20; i++){
		stage.insert(new Q.Flower());
	}
	stage.add('viewport').follow(tiddler);
	stage.viewport.offsetY = 100;
	stage.viewport.offsetX = 50;
});

Q.scene('UI',function(stage){
	var container = stage.insert(new Q.UI.Container({
		x: Q.width/2-220, y: 20
	}));

	var label = container.insert(new Q.UI.Text({x:200, y: 20,
		label: "Score:  " + stage.options.score, color: "white" }));
});

Q.load('bg.jpg,index.jpg,BigStone1.png,BigStone2.png,BigStone3.png,BigStone4.png,bright.png,flower.png,Lotus1.png,Lotus2.png,Lotus3.png,Lotus4.png,ripple.png,shark.png,tiddler.png,wall.png',function(){
	Q.sheet("shark",
        "shark.png",{
			cols: 13,
			tilew: 179, 
			tileh: 446, 
			sx: 0, 
			sy: 0 ,
			frames: 13	
        });
	
	Q.animations("shark",{
		walk: { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12],rate: 1/15, flip: false, loop: true }
	});
	Q.sheet("tiddler",
        "tiddler.png",{
			cols: 12,
			tilew: 96, 
			tileh: 197, 
			sx: 0, 
			sy: 0 ,
			frames: 12	
        });
	
	Q.animations("tiddler",{
		run: { frames: [0,1,2,3,4,5,6,7,8,9,10,11],rate: 1/15, flip: false, loop: true }
	});
	Q.stageScene('start');
	//Q.debug = true;
	},{
		progressCallback: function(loaded,total) {
		var element = document.getElementById("loading_progress");
		element.style.width = Math.floor(loaded/total*100) + "%";
		if (loaded == total) {
			document.getElementById("loading").remove();
		}
	}	
});
















