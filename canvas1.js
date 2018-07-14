var canvas = document.getElementById('can')
context = canvas.getContext('2d')
var x = canvas.width/2
var y = canvas.height*2/3
var dx = 2
var dy = -2
var speed = 9
var color = "yellow"
var radious =15
var paddlewidth = 80
var paddleheight = 25
var leftkey = false
var rightkey = false
var paddlex = (canvas.width- paddlewidth)/2
var paddley = canvas.height - paddleheight
var move =8
var brickRowCount = 3;
var brickOffsetLeft = 30;
var brickWidth = 50;
var brickColumnCount = (canvas.width/(brickWidth))-4;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brick = []
var score = 0
var maxscore = 0


// create brick and add parameters in it to track it's position and state 
function createBrick(){
    
for( var i = 0;i<brickRowCount;i++){
    brick[i]=[]
    for(var j=0;j<brickColumnCount;j++){
        brick[i][j] = { X: 0, Y: 0, paint:true };
    }
}
}
// collision detector between ball and brick


function brickcollision(){
    for(var i=0;i<brickRowCount;i++){
        for(var j=0;j<brickColumnCount;j++){
            if(brick[i][j].paint){
            if(x>brick[i][j].X && x<brick[i][j].X+brickWidth && y>brick[i][j].Y && y<brick[i][j].Y+brickHeight){
                brick[i][j].paint=false
                score++
                dy = -dy
            }
            }
        }
    }
}

function drawScore(){
    context.beginPath()
    context.font = '16px Arial'
    context.fillStyle = '#0f0080'
    context.fillText('SCORE : '+score,410,20)
    context.closePath()
}

// eventListeners

    document.addEventListener('keydown',keyPress,false)
    document.addEventListener('keyup',keyRelease,false)

// event Handlers

function keyPress(e){
    if(e.keyCode==39){
        rightkey=true
    }
    else if(e.keyCode==37){
        leftkey=true
    }
    
}
   

function keyRelease(e){
    if(e.keyCode==39){
        rightkey=false
    }
    else if(e.keyCode==37){
        leftkey=false
    }
}

//





// draw Brick

drawBrick = function(){
    
    for(var i=0;i<brickRowCount;i++){
      
        for(var j=0;j<brickColumnCount;j++){
            if(brick[i][j].paint){
            brick[i][j].X = (j*(brickWidth+brickPadding)+brickOffsetLeft)
            brick[i][j].Y = (i*(brickHeight+brickPadding)+brickOffsetTop)
            context.beginPath()
            context.rect(brick[i][j].X,brick[i][j].Y,brickWidth,brickHeight)
            context.fillStyle= "#"+((1<<24)*Math.random()|0).toString(16)
            context.fill()
            context.closePath()
            }
            
        }
        
    }
    
    
    
}







// draw paddle

drawPaddle = function(){
    context.clearRect(0,0,paddlewidth,paddleheight)
    context.beginPath()
    context.rect(paddlex,paddley,paddlewidth,paddleheight)
    context.fillStyle="blue"
    context.fill()
    context.closePath()
}

// draw canvas

//setup = function(){
//    canvas.height = 500
//    canvas.width = 500
//    drawBall()
//    
//}

// draw ball

drawBall = function(){
    context.clearRect(0,0,canvas.width,canvas.height)
    context.beginPath()
    context.arc(x,y,radious,0,360)
    context.fillStyle=color
    context.fill()
    context.closePath()
    brickcollision()
    drawPaddle()
    drawBrick()
    drawScore()
}



update = function(){
    drawBall()
    
    // update ball
    
    if(x+dx<=radious || x+dx>=canvas.width){
       dx = -dx
       color = "#"+((1<<24)*Math.random()|0).toString(16)
   } 
       
       
   
    if(y+dy<=radious){
        dy = -dy
        color ="#"+((1<<24)*Math.random()|0).toString(16)
     }
    else if(y+dy>canvas.height-radious){
               if(x>paddlex && x<paddlewidth+paddlex){
                       dy = -dy 
                       color = "#"+((1<<24)*Math.random()|0).toString(16)

                }
                else{
                  
                    stopGame(startGame)
                    startGame = null
                    //context.clearRect(0,0,canvas.width,canvas.height)
                    context.beginPath()
                    context.font="40px Arial"
                    context.fillStyle="Red"
                    context.fillText('Game Over',canvas.width/2-100, canvas.height/2)
                    context.fillStyle="green"
                    if(maxscore<score){
                     maxscore = score

                        context.fillText('New Max Score : '+maxscore,canvas.width/2-100, canvas.height/2+50)
                    }
                    else{
                    context.fillText('Max Score : '+maxscore,canvas.width/2-100, canvas.height/2+50)
                    }
                    if(maxscore == brickColumnCount*brickRowCount){
                        context.fillStyle="steelblue"
                        context.fillText('You Won !',canvas.width/2-100, canvas.height/2+100)
                    }
                    context.closePath()
                    
                }
        

        }
            x +=dx
            y +=dy

    //update paddle
    
    
    
    if(paddlex<canvas.width-paddlewidth && rightkey){
        paddlex += move
    }
    if(paddlex-move>=0 && leftkey){
        paddlex -= move
    }
    
       
    
}
var startGame=null 

function Restart(){
      score =0
      brick.splice(0,brick.length);
      x = canvas.width/2
      y = canvas.height*2/3
      createBrick()
      startGame  = setInterval(update,speed)  
}

start = function(){
    createBrick()
    startGame  = setInterval(update,speed)
}

start()

//setup()

//GameLoop = function(){
//    update()
//    requestAnimationFrame(GameLoop)
//}
//GameLoop()
function stopGame(game){
    clearInterval(game)
}