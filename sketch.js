var Balloon;
var database,position;
var ball1,ball2,bg;

function preload(){
    bg = loadImage("Hot Air Ballon-01.png");
    ball1  = loadAnimation("Hot Air Ballon-02.png");
    ball2 = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}


function setup(){
    database = firebase.database();

    createCanvas(1000,700);
    Balloon = createSprite(470,518,10,10);
    Balloon.scale = 0.5;
    Balloon.addAnimation("b",ball1);
   Balloon.addAnimation("t",ball2)

    var ballPosition = database.ref("balloon/position");
    ballPosition.on("value",readPosition);
}



function draw(){
    background(bg);


    fill(0,0,0);
    textSize(40);
    text("use arrows to move",100,100)

    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
            Balloon.scale  = 0.2; 
            Balloon.changeAnimation("t",ball2);
            text("let's start",100,500);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
            Balloon.scale = 0.5;
            Balloon.changeAnimation("b",ball1);
            text("thank you come again",100,500);
        }
    }

    
    drawSprites();
}


function readPosition(data){
    position = data.val();
    Balloon.x = position.x;
    Balloon.y = position.y
}

function writePosition(x,y){
    database.ref("balloon/position").set({
     "x":position.x+x,
     "y":position.y+y
    })
}