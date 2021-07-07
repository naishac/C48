var monkey,monkeyImg;
var bg;
var rocket, rocketImg;
var moon, moonImg;
var radius;
var banana, bananaImg, redBanana, redBananaImg, greenBanana, greenBananaImg;
var meteor, meteor2,meteorImg,meteorImg2;
var scoreSound;
var gameOverSound;
var gameState = "play"; 

function preload(){

bg = loadImage("sprites/SPACE.jpg");
monkeyImg = loadImage("sprites/SPACEMONKEY.png");
rocketImg = loadImage("sprites/ROCKET.png");
moonImg = loadImage("sprites/MOON.png");
bananaImg = loadImage("sprites/BANANA.png");
meteorImg = loadImage("sprites/METEOR.png");
meteorImg2 = loadImage("sprites/METEOR2.png");
scoreSound = loadSound("sprites/SOUND.wav");
gameOverSound = loadSound("sprites/GAMEOVER.wav");
redBananaImg = loadImage("sprites/REDBANANA.png");
greenBananaImg = loadImage("sprites/GREENBANANA.png");

}


function setup() {
  createCanvas(displayWidth, displayHeight-60);
 monkey= createSprite(400, 200, 50, 50);
 monkey.addImage(monkeyImg);
  monkey.scale = .3;

  rocket = createSprite(1150,330, 50, 50);
  rocket.addImage(rocketImg);
  rocket.scale = .5;
  rocket.rotation= -40;

  moon = createSprite(600,1000,50,50)
  moon.addImage(moonImg);
  moon.scale= 2.5;

  edges = createEdgeSprites();

  radius = moon.radius;
  moon.setCollider("circle",0,0,230);

  bananaGroup = createGroup();
  meteorGroup = createGroup();
  meteor2Group = createGroup();
  redBananaGroup = createGroup();
  greenBananaGroup = createGroup();

  score = 0;

  monkey.debug = true;
  monkey.setCollider("rectangle",0,0,100,monkey.height);
}

function draw() {
  background(bg);  

  textSize(18);
  fill("white");
  text("Score:"+ score,1100,50);

  if(gameState==="play"){

    if(keyDown("DOWN_ARROW")){
      monkey.y = monkey.y+3;
    }
  
    if(keyDown("UP_ARROW")){
      monkey.y = monkey.y-2;
    }
  
    if(keyDown("RIGHT_ARROW")){
      monkey.x = monkey.x+3;
    }
  
    if(keyDown("LEFT_ARROW")){
      monkey.x = monkey.x-3;
    }
  
    monkey.bounceOff(edges);
    monkey.bounceOff(moon);
  
    
  
    if(bananaGroup.isTouching(monkey)){
      banana.destroy();
      scoreSound.play();
      score++
  
    }

    if(redBananaGroup.isTouching(monkey)){
      score--
      redBanana.destroy();
    }

    if(greenBananaGroup.isTouching(monkey)){
      score+= 2
      
    if(keyDown("DOWN_ARROW")){
      monkey.velocityY = monkey.velocityY+3;
    }
  
    if(keyDown("UP_ARROW")){
      monkey.velocityY = monkey.velocityY-3;
    }
  
    if(keyDown("RIGHT_ARROW")){
      monkey.velocityX = monkey.velocityX+3;
    }
  
    if(keyDown("LEFT_ARROW")){
      monkey.velocityX = monkey.velocityX-3;
    }
  
    }
  
    if(meteorGroup.isTouching(monkey)){
      monkey.destroy();
      gameOverSound.play();
      gameState = "end";
    }
  
    if(meteor2Group.isTouching(monkey)){
      monkey.destroy();
      gameOverSound.play();
      gameState = "end";
    }
  
    spawnBananas();
  
    spawnMeteors();
  
    spawnMeteors2();

    spawnRedBananas();

    spawnGreenBananas();

  }

  else if(gameState==="end"){

    stroke("white");
    textSize(25);
    text("Game Over",width/2-50, height/2);

  }

  drawSprites();
}

function spawnBananas(){
  if (frameCount % 60=== 0) {
 
    banana = createSprite(300,300, 50,50);
    banana.addImage("banana",bananaImg);
    banana.scale = .1;
    banana.x = Math.round(random(200,1000));
    banana.y = Math.round(random(100,400));
    
    banana.lifetime = 50;
    
    bananaGroup.add(banana);
  }
}

function spawnRedBananas(){

  if (frameCount % 100=== 0) {

    redBanana = createSprite(300,300,50,50);
    redBanana.addImage(redBananaImg);
    redBanana.scale = .1;  
    redBanana.x = Math.round(random(200,1000));
    redBanana.y = Math.round(random(100,400));
    
    redBanana.lifetime = 50;
    
    redBananaGroup.add(redBanana);
  }

}

function spawnGreenBananas(){

  if (frameCount % 100=== 0) {

    greenBanana = createSprite(300,300,50,50);
    greenBanana.addImage(greenBananaImg);
    greenBanana.scale = .1;  
    greenBanana.x = Math.round(random(200,1000));
    greenBanana.y = Math.round(random(100,400));
    
    greenBanana.lifetime = 50;
    
    greenBananaGroup.add(greenBanana);
  }


}

function spawnMeteors(){
  if (frameCount % 1000===0) {

    meteor = createSprite(900,100,50,50);
    meteor.addImage(meteorImg);
    meteor.scale = .4;
    meteor.rotation= -30;
    meteor.velocityX = -2;
    meteor.velocityY = 1.5;
    meteor.x = Math.round(random(600,900));
    meteor.y = Math.round(random(-100,0));

    meteor.lifetime = 200;

    meteorGroup.add(meteor);
  }
}

function spawnMeteors2(){
  if (frameCount % 500===0) {

    meteor2 = createSprite(900,100,50,50);
    meteor2.addImage(meteorImg2);
    meteor2.scale = .4;
    meteor2.rotation= -30;
    meteor2.velocityX = -2;
    meteor2.velocityY = 1.5;
    meteor2.x = Math.round(random(700,900));
    meteor2.y = Math.round(random(-50,0));

    meteor2.lifetime = 200;

    meteor2Group.add(meteor2);
  }



}