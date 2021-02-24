var monkey, monkey_running, ground, backdrop, backdrop2, backdroup_Image, bananaImage, stoneImage, score, energy, banana, stone, gameState, monkey_collided;

var bananaGroup;
var stoneGroup;

function preload(){
    monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backdrop_Image = loadAnimation("jungle.jpg");
  
  monkey_collided = loadAnimation("Monkey_01.png")
  
  bananaImage = loadAnimation("banana.png");
  stoneImage = loadAnimation("stone.png");
     
}

function setup() {
  createCanvas(400,400);
  
  gameState = "play";
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  backdrop = createSprite(200,200,20,20);
  backdrop.addAnimation("bg", backdrop_Image);
  backdrop.scale = 1;
  
  backdrop2 = createSprite(200,200,20,20);
  backdrop2.addAnimation("bg", backdrop_Image);
  backdrop2.scale = 1;
  
  monkey = createSprite(50,350,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.08;
  
  ground = createSprite(200,380,400,5);
  ground.visible = false;
  
  score = 0;
  energy = 1000;
 
}

function draw() {
  
  background(0);
  
  if(gameState === "play"){
  
  monkey.scale = monkey.scale - 0.00005;
  
  monkey.collide(ground);
  
  backdropf();
  groundf();
  
  spawnFood();
  spawnStone();
  
  scoref();
  energyf();
  collision();
  
  jump();
    
    if(energy <= 0|| monkey.scale <=0){
      gameState = "end";
      
    }
    
    drawSprites();
  
  fill(255);
  textSize(20);
  text("Survival Time: " + score, 230,50);
  text("Energy: " + energy, 230, 70);
      
    
  }
  
  if(gameState === "end"){
  
  end(); 
  
  
  drawSprites();
  
    fill(255);
    textSize(20);
    text("Press R to Restart", 130, 200);
    
    if(keyDown("r")){
      gameState = "play";
      score = 0;
      energy = 1000;
      monkey.visible = true;
    }

  }
}

function backdropf(){
  backdrop.velocityX = -5
  backdrop2.x = backdrop.x - 50;
  
  if(backdrop.x < 0){
    backdrop.x = backdrop.width / 2;
  }
  
}

function groundf(){
  ground.velocityX = 0;
  ground.x = ground.width/2;
}

function spawnFood(){

  if(frameCount % 100 === 0){
    
    banana = createSprite(400,200,20,20);
    banana.y = Math.round(random(100,200));
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.05;
    
    console.log(banana.y);
    
    banana.velocityX = -(10 + score/100);
    
    banana.lifetime = 40;
    
    bananaGroup.add(banana);
  }
  
}

function spawnStone(){
  
  if(frameCount % 100 === 0){
    
    stone = createSprite(400,360,20,20);
    stone.addAnimation("stone", stoneImage);
    stone.velocityX = -7
    stone.scale = 0.1;  
    
    stone.lifetime = 80;
    
    stoneGroup.add(stone);
    
  }
  
}

function jump(){
  
  if(keyDown("space") && monkey.y <= 379){
      monkey.velocityY = -20;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
  
}

function scoref(){
  
  if(frameCount % 10 === 0){
  score = score + 1;
  }
}

function energyf(){
  
  if(frameCount % 25 === 0){
    energy = energy - 1;
  }
  
  if(bananaGroup.collide(monkey)){
    banana.destroy();
    energy = energy + 30;
    monkey.scale = monkey.scale + 0.01;
  }
}

function collision(){
                     
  if(stoneGroup.collide(monkey)){
    
    stone.destroy();
    energy = energy - 300;
    
  }
}

function end(){
  
  if(energy <= 0 | monkey.scale <=0.0002){
    monkey.velocityY = 0;
    ground.velocityX = 0;
    
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    score = 0
    energy = 0;
    
    stoneGroup.setVelocityXEach = 0;
    bananaGroup.setVelocityXEach = 0;
    
    backdrop.velocityX = 0;
    
    monkey.visible = false;
  }
  
}
  
  