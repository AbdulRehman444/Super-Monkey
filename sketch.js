  var monkey , monkey_running;
  var banana,bananaImage,rock,obstacleImage;
  var FoodGroup, enemyGroup;
  var score;
  var ground;
  var gameOverImg,survivalTimeImage,survival
  var Score,ScoreImage
  
  PLAY=1
  END=0
  gameState = PLAY;

 score = 0;
 survivalTime = 0;

function preload(){  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  gameOverImg = loadImage("gameOver.png")
 
  survivalTimeImage=loadImage("Survival time.jpg")
  ScoreImage=loadImage("OIP score.jfif")
  
  
}

function setup() {
  createCanvas(600,600)
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey=createSprite(80,520);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.15;
  
  ground=createSprite(500,555,900,10);
  ground.velocityX=-4; 
  console.log(ground.x)
  
  gameOver = createSprite(270,200);
  gameOver.addImage(gameOverImg);
  
  survival = createSprite(140,40);
  survival.addImage(survivalTimeImage);
  
  Score = createSprite(420,40);
  Score.addImage(ScoreImage); 
  
  gameOver.scale = 0.7;
  survival.scale=0.4;
  Score.scale=0.5;
}

function draw() {
 background(255);

 monkey.collide(ground);

if (gameState === PLAY){
    ground.velocityX=-4;
    food();
    obstacles();

  gameOver.visible = false;

if (ground.x < 200){
    ground.x = 450;
}

if (keyDown("space") && monkey.y >=500){
    monkey.velocityY = -18;
}

    monkey.velocityY = monkey.velocityY + 0.8;

if (monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach(); 
    score=score+1;
}

if (monkey.isTouching(obstacleGroup)){
    gameState=END;
} 

    survivalTime=Math.ceil(frameCount/frameRate());
}
 else  if (gameState=== END) {
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);

    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);   

    ground.velocityX=0;
    monkey.velocityY=0;

    gameOver.visible = true;
   
}
  drawSprites();
  stroke("black");
  textSize(30);
  fill("black");
  text(""+ survivalTime,240,49);
  text(""+ score,480,52);
}

function food(){
if (World.frameCount%80===0){
banana=createSprite(610,Math.round(random(400,300)),10,10);
banana.addImage("b",bananaImage);
banana.scale=0.10;
banana.lifetime=200;
banana.velocityX=-7;
FoodGroup.add(banana);
}
}

function obstacles(){
if (World.frameCount%120===0){
rock=createSprite(610,513,10,10);
rock.addImage("stone",obstacleImage);
rock.scale=0.2;
rock.lifetime=150;
rock.velocityX=-6;
rock.setCollider("circle",10,60,200);
obstacleGroup.add(rock);
  }
}
