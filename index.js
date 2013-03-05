/*
//keyCode checker(Checks numerical keycode of pressed key)
document.onkeydown = checkKeycode
function checkKeycode(e) {
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
alert("keycode: " + keycode);
}
*/

//Getting the background canvas and setting its context
var canvasBG=document.getElementById('canvasBG');
var ctxBG=canvasBG.getContext('2d');
//Getting the guy canvas and setting its context
var canvasGuy=document.getElementById('canvasGuy');
var ctxGuy=canvasGuy.getContext('2d');
//Getting the cloud canvas and setting its context
var canvasCloud=document.getElementById('canvasCloud');
var ctxCloud=canvasCloud.getContext('2d');

var Guy1=new Guy();
//var Cloud1;

//Grabbing the width and the height of the canvas and setting them to variables called gameWidth & gameHeight for later use
var gameWidth=canvasBG.width;
var gameHeight=canvasBG.height;

//Start of drawInterval/animation loop
//This was for fps but now I'm rAF
var fps=15;//How fast you want to call a function that clears the image and redraws
var drawInterval;

/*var isPlaying=false;
var rAF=window.requestAnimationFrame ||//Checks what browser your using, NOTE: Browser needs to be up to date
        window.webkitRequestAnimationFrame||
         window.mozRequestAnimationFrame|| //Mozilla
         window.msRequestAnimationFrame||//Internet Explorer
         window.oRequestAnimationFrame;//Opera
         */
//End of drawInterval/animation loop

//Spawn interval and its properties
var spawnInterval;
var spawnRate=3000; //Every 3 seconds
var spawnAmount=1;
var totalClouds=0;
var clouds=[];
/*
//Test to see if clouds are actually spawning
if(totalClouds>0){
  alert("Clouds are spawning");
}
*/
//Stop of spawn interval and its properties

//KeyCodes for later use in user controls
var keyCodeW=87;
var keyCodeA=65;
var keyCodeS=83;
var keyCodeD=68;

//Setting the directory of the sprite sheet and telling the game not to start till the sheet is loaded.
var imgSprite=new Image();
imgSprite.src='Images/SS.png';
imgSprite.addEventListener('load',init,false);//When the image is loaded then execute the init function


//Main Functions
function init(){
	//Cloud1=new Cloud();
	drawBG();
	startSpawning();
	startDrawing();
	document.addEventListener('keydown',checkKeyDown,false);//Listens for the event of the key going down then executes the code within the checkKeyDown function
	document.addEventListener('keyup',checkKeyUp,false);//Listens for the event of the key going Up then executes the code within the checkKeyUp function
	
}
//Drawing the background...NOTE:: Not updated ever just drawn once and left alone
function drawBG(){
	var srcX=0;
	var srcY=0;
	var drawX=0;
	var drawY=0;
	ctxBG.drawImage(imgSprite,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth,gameHeight);
}
//Cloud related
function spawnClouds(){
	///* Testing Purposes
	for(var i=totalClouds;i<totalClouds+spawnAmount;i+=1){
      clouds[i]=new Cloud();
	}
	//*/
	/*
	Testing purposesfor(var i=0;i<totalClouds;i++){
		clouds[i]=new Cloud();
	}
	//*/
	 totalClouds+=spawnAmount;
   
	
}
function drawClouds(){
	///*Testing purposes
	for(i=0;i<totalClouds;i++){
		clouds[i].draw();
	}
	//*/
	//clouds[0].draw();

}

function startSpawning(){
stopSpawning();
spawnInterval=setInterval(spawnClouds,spawnRate);

}

function stopSpawning(){
	clearInterval(spawnInterval);
}
//End of cloud related

//User related
function draw(){
	Guy1.draw();
	drawClouds();
	//Cloud1.draw();
	
	/*if(isPlaying){
	Guy1.draw();
	Cloud1.draw();
	rAF(draw);
   }*/

}

function startDrawing(){ //Or use requestAnimationFrame?
	//For old method
	stopDrawing();
	drawGuyInterval=setInterval(draw,fps);//Set interval takes two parameters. The function that you want and the rate at which to call it in miliseconds
	
    /*isPLaying=true;
    draw();*/
}

function stopDrawing(){
	//For old method
	 clearInterval(drawInterval);//Takes one parameter, the interval were drawing at which is saved as var drawInterval
	//isPlaying=false;
}
//End of Main functions


//Cloud functions
function Cloud(){
	this.srcX=0;
	this.srcY=500;
	this.drawX=Math.floor(Math.random()*gameWidth);
	this.drawY=0-150;
	this.width=200;
	this.height=150;
	this.speed=1+Math.floor(Math.random()*2); //Number between 
}

Cloud.prototype.draw=function(){
	clearCtxCloud();
	this.drawY+=this.speed;
	ctxCloud.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
};

function clearCtxCloud(){
	ctxCloud.clearRect(0,0,gameWidth,gameHeight);
}
//End of cloud functions

//Guy functions
function Guy(){
	this.srcX=200;
	this.srcY=500;
	this.drawX=400;
	this.drawY=300;
	this.width=50;
	this.height=90;
	this.upSpeed=2;
	this.downSpeed=0.93;
	this.strafeSpeed=2;
	this.keyW=false;
	this.keyA=false;
	this.keyS=false;
	this.keyD=false;  //Main Guy Object
}


Guy.prototype.draw=function(){
	clearCtxGuy();//Clears the old frame if moved
	this.checkKeys();
	ctxGuy.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
};

Guy.prototype.checkKeys=function(){
	if(this.keyW){
		this.drawY-=this.upSpeed;

	}
	if(this.keyA){
		this.drawX-=this.strafeSpeed;
		
	}
	if(this.keyS){
		this.drawY+=this.downSpeed;
		
	}
	if(this.keyD){
		this.drawX+=this.strafeSpeed;
		
	}
};

function clearCtxGuy(){
	ctxGuy.clearRect(0,0,gameWidth,gameHeight);
}
//End of guy functions

//User controls
//Note: 4 if statements allow diagnols by allowing more than one event to happen at the same time
function checkKeyDown(e){
	var keyPressed=e.keyCode|| e.which;
if(keyPressed===keyCodeW){
	Guy1.keyW=true;
	e.preventDefault();

}
if(keyPressed===keyCodeA){
	Guy1.keyA=true;
	e.preventDefault();	
}
if(keyPressed===keyCodeS){
	Guy1.keyS=true;
	e.preventDefault();	
}
if(keyPressed===keyCodeD){
	Guy1.keyD=true;
	e.preventDefault();	
}
}

function checkKeyUp(e){ 
	var keyPressed=e.keycode||e.which;
if(keyPressed===keyCodeW){
	Guy1.keyW=false;
	e.preventDefault();
}
if(keyPressed===keyCodeA){
	Guy1.keyA=false;
	e.preventDefault();	
}
if(keyPressed===keyCodeS){
	Guy1.keyS=false;
	e.preventDefault();	
}
if(keyPressed===keyCodeD){
	Guy1.keyD=false;
	e.preventDefault();
}
}
//end of user controls
