let mic;
let ball;
let pipes=[];
let sliderTop,sliderBottom;
let clapping=false;
let back,topPipe,bottomPipe,bird;
let score,lost;
let pipe_creation=false,hitted=false;
function preload()
{
    back=loadImage("Images/background.png");
}

function setup() {
	createCanvas(500,600);
	mic=new p5.AudioIn();
	mic.start();
	ball=new Ball(width/2,height/2,20,width,height);
	pipes.push(new Pipe(width,height));
	sliderTop=createSlider(0,1,0.3,0.01);
	sliderBottom=createSlider(0,1,0.1,0.01);
	score=createP("Score = 0");
	lost=createP("");
	lost.position(width+100,height/2+50);
	lost.style("font-size","30px");
	score.position(width+100,height/2);
	score.style("font-size","30px");
}

function draw() {
	background(back);
    ball.show();
	ball.fallDown();
    let vol= mic.getLevel();

	if(ball.lift==0)
	{
		pipe_creation=false;
		pipe_creation=false;
		hitted=true;
        lost.html("You Lost ! Better Luck Next Time");
		score.html("Final Score = "+ball.score);
	}
	if(pipe_creation)
	{
		if(frameCount%100==0)
		{
			pipes.push(new Pipe(width,height));
		}
		for(let i=pipes.length-1;i>0;i--)
		{
			pipes[i].constructPipes(ball);
			pipes[i].movePipes();
			if(pipes[i].hits(ball))
			{
				console.log("HIT");
				pipe_creation=false;
				hitted=true;
                lost.html("You Lost ! Better Luck Next Time");
				score.html("Final Score = "+ball.score);
				if(pipes[i].passes)
				{
					ball.score-=1;
					score.html("Score = "+ball.score);
				}
			}
			if(pipes[i].offscreen())
			{
				pipes.splice(i,1);
			}
			if(pipes[i].crosses(ball))
			{
				ball.score+=1;
				score.html("Score = "+ball.score);
			}
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
	if(key==" " && ball.lift!=0 && !hitted)
	{
		ball.gravity=0.4;
		pipe_creation=true;
		ball.moveUp();
	}
}