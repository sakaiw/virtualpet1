var dog, dogImage, happyDog;
var database;
var foodS, foodStock;

function preload() {
   dogImage = loadImage("images/doggo.png");
   happyDog = loadImage("images/happydog.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(500,500);

  dog = createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",  readStock);
  textSize(20); 
}

function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  fill("darkred");
  stroke("black");
  text("Food Left: " + foodS, 170, 200);
  textSize(13);
  text("Hint: Feed the Dog 🥛 by Pressing the Up Arrow!", 130, 10, 300, 20);
}

//Function to read values from database
function readStock(data) {
  foodS = data.val();
}

//Function to write values in database
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  } 
  database.ref('/').update({
    Food: x
  })
}

