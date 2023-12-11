let ball;

function setup() {
	createCanvas(500,600);
	ball=new Ball(50,height/2,20);
}

function draw() {
	background(0);
    ball.show();
	ball.fallDown();
}	
function keyPressed()
{
	if(key==" ")
	{
		ball.moveUp();
	}
}