class Pipe{
    constructor(w,h)
    {
        this.spacing=100;
        this.space_center=random(50,h-50);
        this.screenWidth=w;
        this.screenHeight=h;
        this.top=this.space_center-this.spacing/2;//to store the top pipes height
        this.bottom=h-this.space_center-this.spacing/2;//to store the bottom pipes height
        this.x=this.screenWidth;//starting x-coordinates of pipes changes as game proceeds
        this.speed=2;//Speed of pipe movements
        this.width=40;// Width of Pipes
        this.hitted=false;//Boolean value to check whether a ball hits a pipe or not
        this.passes=false;
    }
    constructPipes(ball){
        noStroke();
        fill(255);
        if(this.hitted)
        {
            fill(255,0,0);
        }
        if(this.x<ball.x && !this.hitted)
        {
            fill(0,255,0);
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
        if(ball.y<this.top||ball.y>this.screenHeight-this.bottom )
        {
            if(ball.x>this.x && ball.x<this.x+this.width && !this.hitted)
            {
                this.hitted=true;
                return true;
            }
        }
        else{
           return false;
        }
    }
    crosses(ball)
    {
        if(ball.y>this.top && ball.y<this.screenHeight-this.bottom)
        {
            if(this.x<ball.x && !this.hitted && !this.passes )
            {
                this.passes=true;
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
}