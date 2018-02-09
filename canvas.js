var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var astroImg = new Image();
astroImg.src = "images/astronaut.png"

var myObstacles = [];
var frameNo = 0;
var asteroidsHit = 5;

function interval(){
    setInterval(updateCanvas, 20);
}
var clearCanvas = () => {
    ctx.clearRect(0,0,812,580); 
}

var astronaut = {
    x: 200,
    y: 400,
    width: 90,
    height: 90,
    moveUp: function(){
        this.y -= 35;
    },
    moveDown: function(){
        this.y += 35;
    },
    moveLeft: function() {
        this.x -= 35;
    },
    moveRight: function() {
        this.x += 35;
    },
    update: () => {
        ctx.drawImage(astroImg, astronaut.x, astronaut.y, astronaut.width, astronaut.height)
    },
};

function Obstacle(x,y,width,height){
 this.width = width;
 this.height = height;
 this.x = x;
 this.y = y;
 this.speedX = random(-4, 4) ;
 this.speedY = random(-4, 4);
 this.angle = 0;
 this.update = function() {
   var asteroidImg = new Image();
   asteroidImg.src = "images/asteroid.png"; 
//    asteroidImg.onload = function() {
        // ctx.save();
        // ctx.translate(this.x + 20, this.y + 20);
        // ctx.rotate(this.angle += .002);
        ctx.drawImage(asteroidImg, this.x, this.y, 50, 50);
        this.x -= this.speedX;
        this.y -= this.speedY
        // ctx.strokeRect(this.x, this.y, 50, 50);
        // ctx.restore();
    // };
  }
  this.collide = function(astronaut) {
      console.log('niggu')
    // collision detection based on coordinates
    var left = astronaut.x;
    var right = astronaut.x + (astronaut.width);
    var top = astronaut.y;
    var bottom = astronaut.y + (astronaut.height);
    //asteroid
    var asteroidImgLeft = this.x;
    var asteroidImgRight = this.x + (this.width);
    var asteroidImgTop =this.y;
    var asteroidImgBottom = this.y + (this.height);
    var collided = true;
    if ((bottom < asteroidImgTop) ||
        (top > asteroidImgBottom) ||
        (right < asteroidImgLeft) ||
        (left > asteroidImgRight)) {
        collided = false;
        
    }
    return collided; 
   }
}
ctx.fillText("Lives left: " + asteroidsHit, 100, 100);
ctx.fillStyle = "red";

var  everyInterval = ((n) => {
 if ((frameNo / n) % 1 === 0) {
   return true
 }
 return false
});

var pushRandObstacle = () => {
 if (everyInterval(800) && myObstacles.length < 100) {
   var asteroidX = Math.floor(Math.random() * 778);
   var asteroidY = Math.floor(Math.random() * 530);
   var asteroidWidth = 50;
   var asteroidHeight = 50;
   myObstacles.push(new Obstacle(asteroidX, asteroidY, asteroidWidth, asteroidHeight));
 }
}


var updateObstacles = () => {
 pushRandObstacle()
 myObstacles.forEach((elem) => {
   elem.update();

 });
}

var updateCanvas = () => {   
    clearCanvas();
    astronaut.update()
    updateObstacles();
    frameNo += 20;
    
    myObstacles.forEach((elem) => {
        elem.update();
        if(elem.collide(astronaut)) {
            document.location.reload();
            document.location.href = "gameOver.html";
        }
        
    }); 
}
var timerElem = document.getElementById("timer");
var seconds = 30;
var counter = function (){
    seconds--;
    timerElem.innerHTML =("Time Remaining: " + seconds);
    if(seconds === 0){
        document.location.href = "youWin.html";
    }
}

// timer interval is every second (1000ms)
setInterval(counter, 1000);
// The main game loop
var main = function () {
// run the update function
  update(0.02); // do not change
// run the render function
  render();
// Request to do this again
  requestAnimationFrame(main);
// };
}


document.onkeydown = function(e) {
     switch (e.keyCode) {
       case 37:
         astronaut.moveLeft();
         break;
       case 38:
         astronaut.moveUp();
         break;
       case 39:
         astronaut.moveRight();
         break;
       case 40:
         astronaut.moveDown();
         break;
     }

   };
   
interval();

var random = (min, max) => {
    result = Math.floor(Math.random() * (max - min + 1) + min);
    return result;
}
