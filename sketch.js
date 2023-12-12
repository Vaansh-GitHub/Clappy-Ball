let mic;
let ball;
let pipes=[];
let sliderTop,sliderBottom;
let clapping=false;
function setup() {
	createCanvas(500,600);
	ball=new Ball(50,height/2,20,width,height);
	pipes.push(new Pipe(width,height));
	mic=new p5.AudioIn();
	mic.start();
	sliderTop=createSlider(0,1,0.3,0.01);
	sliderBottom=createSlider(0,1,0.1,0.01);
}

function draw() {
	background(0);
    ball.show();
	ball.fallDown();
    let vol= mic.getLevel();
	if(frameCount%100==0)
	{
		pipes.push(new Pipe(width,height));
	}
	for(let i=pipes.length-1;i>0;i--)
	{
		pipes[i].constructPipes();
		pipes[i].movePipes();
		if(pipes[i].hits(ball))
		{
			console.log("HIT");
		}
		if(pipes[i].offscreen())
		{
			pipes.splice(i,1);
		}
	}

	let thresholdTop=sliderTop.value();
	let thresholdBottom=sliderBottom.value();
	if(vol>thresholdTop && !clapping)
	{
		ball.moveUp();
		clapping = true;
	}
	if(vol<thresholdBottom)
	{
		clapping = false;
	}
	fill(0,255,0)
	let y=map(vol,0,1,height,0);
	rect(width-50,y,50,height-y);

	let ty=map(thresholdTop,0,1,height,0);
	stroke(255,0,0);
    strokeWeight(4);
	line(width-50,ty,width,ty);

	let by=map(thresholdBottom,0,1,height,0);
	stroke(0,0,255);
    strokeWeight(4);
	line(width-50,by,width,by);
}	
function keyPressed()
{
	if(key==" ")
	{
		ball.moveUp();
	}
}