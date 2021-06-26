//Create variables here
var dogImg, happyDogImg, dog, database, foodS, foodStock;


function preload()
{
	//load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("happyDogImg.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(250, 350, 10, 60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
}


function draw() {  
  background("pink");
  if(foodS!== undefined){
    textSize(20);
    fill(255);
    text("Note: press UP ARROW key to feed Drago milk", 50,50);
    text("Food remaining: "+foodS,150,150);


    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }

    if(keyWentDown(UP_ARROW)){
      dog.addImage(dogImg);
    }

    if(foodS === 0){
      dog.addImage(happyDogImg);
      
    }
  

 drawSprites();
  //add styles here

     
}

}

function writeStock(x){
  if(x<=0){
    x = 0;

  }
  else{
    x = x-1;
  }

  database.ref("/").update({
    Food: x
  });
}

function readStock(data){
  foodS = data.val();
}