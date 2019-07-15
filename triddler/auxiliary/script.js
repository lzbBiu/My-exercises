var Q = Quintus()
	.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI");
	
	
	SPRITE_TIDDLER = 0,
	SPRITE_SHARK = 1,
	SPRITE_FLOWER = 2,
	SPRITE_LOTUS = 4,
	SPRITE_BIGSTONE = 8,
	SPRITE_LITTLE = 16,
	SPRITE_BG = 32,
	
	size = 8000;
Q.setup({maximize: true}).touch(Q.SPRITE_ALL);	
Q.gravityX = 0;
Q.gravityY = 0;

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


	
//创建tiddler Sprites	
Q.Sprite.extend('Tiddler',{
	init: function(p){
		this._super(p,{
			x: size/2,
			y: size/2,
			asset: 'tiddler.png',
			
			type: SPRITE_TIDDLER,
			speed: 1200,
			vx: 0,
			vy: 0,
			angle: 0,
			targetX: size/2,
			targetY: size/2
		});
	},
	
	step: function(dt){
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

//创建大鱼
Q.Sprite.extend('Shark',{
	init: function(p){
		this._super(p,{
			sheet: "shark",
			sprite: "shark",
			x: 0,
			y: 0,
			targetX: 0,
			targetY: 0,
			
			collisionMask: SPRITE_TIDDLER,
			
			angle: 0,
			speed: 1000,
			vx: 0,
			vy: 0
			
			
		});
		this.add("2d,animation");
		
		this.on("hit");
		
		this.p.x = Math.floor( Math.random() * (size - 0 + 1) + 0);
		this.p.y = Math.floor( Math.random() * (size - 0 + 1) + 0);
		
		this.p.targetX = Math.floor( Math.random() * (size - 0 + 1) + 0);
		this.p.targetY = Math.floor( Math.random() * (size - 0 + 1) + 0);
		
		this.p.angle = getAngle(this.p.x,this.p.y,this.p.targetX,this.p.targetY);
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
	
	hit: function(){
		alert('碰到了');
	}
});

//创建花瓣
Q.Sprite.extend('Flower',{
	init: function(p){
		var imgArr = ["flower1.jpg","flower2.jpg","flower3.jpg"];
		this._super(p,{
			x: size/2,
			y: size/2,
			angle: 0,
			asset: 'flower1.png'
		}); 
		var range =  size - 200;
		this.p.x = Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.y = Math.floor( Math.random() * (range - 200 + 1) + 200);
	},
});

//创建小石头
Q.Sprite.extend('LittleStone',{
	init: function(p){
		var imgArr = ["LittleStone1.jpg","LittleStone2.jpg","LittleStone3.jpg"];
		this._super(p,{
			x: size/2,
			y: size/2,
			angle: 0,
		}); 
		var range =  size - 200;
		this.p.x = Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.y = Math.floor( Math.random() * (range - 200 + 1) + 200);
	},
});
//创建大石头
Q.Sprite.extend('BigStone',{
	init: function(p){
		var imgArr = ["BigStone1.jpg","BigStone2.jpg","BigStone3.jpg"];
		this._super(p,{
			x: size/2,
			y: size/2,
			angle: 0,
		}); 
		var range =  size - 200;
		this.p.x = Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.y = Math.floor( Math.random() * (range - 200 + 1) + 200);
	},
});
//创建荷花
Q.Sprite.extend('Lotus',{
	init: function(p){
		var imgArr = ["Lotus1.jpg","Lotus2.jpg","Lotus3.jpg"];
		this._super(p,{
			x: size/2,
			y: size/2,
			angle: 0,
		}); 
		var range =  size - 200;
		this.p.x = Math.floor( Math.random() * (range - 200 + 1) + 200);
		this.p.y = Math.floor( Math.random() * (range - 200 + 1) + 200);
	},
});


//创建一个承载背景的sprite
Q.Sprite.extend('bgImg',{
	init: function(p){
		this._super(p,{
			x: size/2,
			y: size/2,
			w: size*6,
			h: size*6
		});
		this.on('touch');
	},
	//重置tiddler的属性
	touch: function(touch){
		var	tiddler = Q("Tiddler"),
			tiddlerX = Math.floor(tiddler.first().c.x),
			tiddlerY = Math.floor(tiddler.first().c.y),
			touchX = Math.floor(touch.x),
			touchY = Math.floor(touch.y),
			angle = getAngle(tiddlerX,tiddlerY,touchX,touchY);
			
		tiddler.set('angle',angle);
		
		tiddler.set('targetX',touch.x);
		tiddler.set('targetY',touch.y);
	}
});
Q.scene('pond',function(stage){
	stage.insert(new Q.Repeater({asset: "bg.jpg"}));
	stage.insert(new Q.Repeater({
		x:0,
		repeatX: false,
		asset: 'wall.jpg'
	}));
	stage.insert(new Q.Repeater({
		x: size/2,
		repeatX: false,
		asset: 'wall.jpg'
	}));
	stage.insert(new Q.Repeater({
		y: 0,
		repeatY: false,
		asset: 'wall.jpg'
	}));
	stage.insert(new Q.Repeater({
		y: size/2,
		repeatY: false,
		asset: 'wall.jpg'
	}));
	
	stage.insert(new Q.Shark());
	stage.insert(new Q.Shark());
	stage.insert(new Q.Shark());
	stage.insert(new Q.Shark());
	stage.insert(new Q.Shark());
	//该为由时间添加，设置上限
	
	
	
	
	var bg = stage.insert(new Q.bgImg()),
		tiddler = stage.insert(new Q.Tiddler());
	
	
	stage.add('viewport').follow(tiddler);
});


Q.load('tiddler.png,bg.jpg,shark.png,wall.jpg,flower1.png',function(){
	Q.sheet("shark",
        "shark.png",{
			cols: 12,
			tilew: 200, 
			tileh: 446, 
			sx: 0, 
			sy: 0 ,
			frames: 12	
        });
	
	Q.animations("shark",{
		walk: { frames: [0,1,2,3,4,5,6,7,8,9,10,11],rate: 1/15, flip: false, loop: true }
	});
	
	Q.stageScene('pond');
})





















