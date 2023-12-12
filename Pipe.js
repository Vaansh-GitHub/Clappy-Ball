class Pipe{
    constructor(w,h)
    {
        this.screenWidth=w;
        this.screenHeight=h;
        this.top=random(this.screenHeight/4,this.screenHeight/2-25);
        this.bottom=random(this.screenHeight/4,this.screenHeight/2-25);
        this.x=this.screenWidth;//starting x-coordinates of pipes changes as game proceeds
        this.speed=2;//Speed of pipe movements
        this.width=20;// Width of Pipes
        this.hitted=false;//Boolean value to check whether a ball hits a pipe or not
    }
    constructPipes(){
        noStroke();
        fill(255);
        if(this.hitted)
        {
            fill(255,0,0);
        }
        if(this.x<50 && !this.hitted)
        {
            fill(0,255,0)

        }
        noStroke();
        rect(this.x,0,this.width,this.top);
        rect(this.x,this.screenHeight-this.bottom,this.width,this.bottom);
    }
    movePipes(){
        this.x-=this.speed;
    }
    offscreen()//function to check whether a pipe has already gone out of the screen
    {
        if(this.x<-this.screenWidth)
        {
            return true;
        }
        return false;
    }
    hits(ball)//function to check whether a pipe is hit by the ball
    {
        if(ball.y<this.top||ball.y>this.screenHeight-this.bottom)
        {
            if(ball.x>this.x && ball.x<this.x+this.width)
            {
                this.hitted=true;
                return true;
            }
        }
        else{
           return false;
        }
    }
}