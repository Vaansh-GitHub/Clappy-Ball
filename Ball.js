class Ball{
    gravity=0.4;//downward force on the ball
    speed=0;//speed of the ball
    lift=-10;//upward force on the ball
    constructor(x,y,d,w,h)
    {
        this.x=x;//X-coordinates of the ball
        this.y=y;//Y-coordinates of the ball
        this.d=d;//diameter of the ball
        this.screenWidth=w;
        this.screenHeight=h;
    }
    show()
    {
        noStroke();
        stroke(255);
        fill(255);
        ellipse(this.x,this.y,this.d);
    }
    fallDown()//Function to make the ball falldown each time
    {
        this.speed+=this.gravity
        this.y+=this.speed;
        if(this.y>600)
        {
            this.y=height;
            this.speed=0;
        }
        if(this.y<0)
        {
            this.y=0;
            this.speed=0;
        }
    }
    moveUp()//Function to make the ball move up each time using any of the interactive features available
    {
        this.speed+=this.lift;
    }
}