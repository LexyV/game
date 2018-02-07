var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var myObstacles = [];

function interval(){
    setInterval(updateCanvas, 20);
}
var frameNo = 0;
var clearCanvas = () => {
    ctx.clearRect(0,0,812,580); 
    ctx.fillStyle = "white";
    ctx.fillText("Time: " + count + "s." , 5 , 20); 
}

var astronaut = {
    x: 200,
    y: 400,
    astrWidth: 90,
    astrHeight: 90,
    moveUp: function(){
        this.y -= 25;
    },
    moveDown: function(){
        this.y += 25;
    },
    moveLeft: function() {
        this.x -= 25;
        console.log("left");
    },
    moveRight: function() {
        this.x += 25;
        console.log("right");
    },
    update: () => {
        var astroImg = new Image();
        astroImg.src = "images/astronaut.png"
        ctx.drawImage(astroImg, astronaut.x, astronaut.y, astronaut.astrWidth, astronaut.astrHeight)
        ctx.strokeStyle= "black" ;
        ctx.strokeRect(astronaut.x , astronaut.y, 80, 90);
    },
};

function Obstacle(x,y,width,height){
 this.width = width;
 this.height = height;
 this.x = x;
 this.y = y;
 this.speedX = 0;
 this.speedY = 0;
 this.angle = 0;
 this.update = function() {
   var asteroidImg = new Image();
   asteroidImg.src = "images/asteroid.png"; 
//    asteroidImg.onload = function() {
        ctx.save();
        ctx.translate(this.x + 5, this.y + 5);
        ctx.rotate(this.angle += .01);
        ctx.drawImage(asteroidImg, this.x, this.y, 50, 50);
        ctx.strokeRect(this.x, this.y, 50, 50);
        ctx.restore();
    // };
  }
//     this.collide = function(rectangle) {
//     // collision detection based on coordinates
//     var left = this.x;
//     var right = this.x + (this.width);
//     var top = this.y;
//     var bottom = this.y + (this.height);
//     var rectangleLeft = rectangle.x;
//     var rectangleRight = rectangle.x + (this.width);
//     var rectangleTop =rectangle.y;
//     var rectangleBottom = rectangle.y + (this.height);
//     var collided = true;
//     if ((bottom < rectangleTop) ||
//         (top > rectangleBottom) ||
//         (right < rectangleLeft) ||
//         (left > rectangleRight)) {
//         collided = false;
        
//     }
//     return collided;
//    }
}

var  everyInterval = ((n) => {
 if ((frameNo / n) % 1 === 0) {
   return true
 }
 return false
});

var pushRandObstacle = () => {
 if (everyInterval(800) && myObstacles.length < 65) {
   var asteroidX = Math.floor(Math.random() * 778);
   var asteroidY = Math.floor(Math.random() * 530);
//    ctx.rotate(this.angle += .002);
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
//  for (var i = 0; i < myObstacles.length; i++) {
//     if (astronaut.collide(myObstacles[i])){
//          // document.location.reload();
//         //  document.location.href = "index.html";
//  //        alert("game over");
//     }
// } 
}

document.onkeydown = function(e) {
     switch (e.keyCode) {
       case 37:
         astronaut.moveLeft();
         console.log("left", astronaut);
         break;
       case 38:
         astronaut.moveUp();
         console.log("up", astronaut);
         break;
       case 39:
         astronaut.moveRight();
         console.log("right", astronaut);
         break;
       case 40:
         astronaut.moveDown();
         console.log("down", astronaut);
         break;
     }
    //  if (
    //     astronaut.x <= (asteroidImg.x + 32)
    //     && asteroidImg.x <= (astronaut.x + 50)
    //     && astronaut.y <= (asteroidImg.y + 50)
    //     && asteroidImg.y <= (astronaut.y + 120)
    //   ) {
    //     // ++coinsCaught;
    //     reset();
    //   }
   };
   
interval();
var count = 30; // how many seconds the game lasts for - default 30
var finished = false;
var counter = function(){

  count = count - 1; // countown by 1 every second
  // when count reaches 0 clear the timer
    if (count <= 0)
    { 
      // stop the timer
       clearInterval(counter);
       // set game to finished
       finished = true;
       count = 0;
    // alert('over')
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
};




// window.onload = function() {
//     function interval(){
//       setInterval(updateCanvas, 33);
//       console.log("interval")
//     }
// //   interval();
  
//     var canvas = document.getElementById("canvas");
//     var ctx = canvas.getContext("2d");
    
//     var myObstacles = [];
//     var board = {
//       frames: 0
//     }
    
//   // astronaut object
//     var astronaut = {
//       x: 200,
//       y: 400,
//       astrWidth: 120,
//       astrHeight: 120,
//       moveUp: function(){
//         this.y -= 25;
//       },
//       moveDown: function(){
//         this.y += 25;
//       },
//       moveLeft: function() {
//         this.x -= 10;
//         console.log("left");
//       },
//       moveRight: function() {
//         this.x += 10;
//         console.log("right");
//       }
//     };
//     function drawAsteroid(asteroid) {
       
//         var asteroidImg = new Image();
    
//           asteroidImg.onload = function() {
//           ctx.drawImage(asteroidImg, 50, 50, 90, 70);
//         };
//         asteroidImg.src = "images/asteroid.png";  
//       }
//     function Obstacle(x,y,width,height){
//       this.width = width;
//       this.height = height;
//       this.x = Math.floor(Math.random() * 812);
//       this.y = Math.floor(Math.random() * 580);
//       this.sprite = drawAsteroid();
//       this.update = function(){
//           this.y -= 2;
//           this.x -= 2;
//           console.log("hi");
//       }
//       this.drawAsteroid=function(){
//           ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)

//       }
//     }
//     //   this.speedX = 0;
//     //   this.speedY = 0;
//     //   this.update = function() {
//     //     console.log('updating asteroids')
//     //     var asteroidImg = new Image();
//     //     asteroidImg.onload = function() {
//     //       ctx.drawImage(asteroidImg, this.x, this.y, this.width, this.height);
//     //       };
//     //     asteroidImg.src = "images/asteroid.png";  
//     //   }
//     // }
  
  
  
//   // create astronaut
//     function drawAstronaut(astronaut) {
       
//       var astroImg = new Image();
  
//         astroImg.onload = function() {
//         ctx.drawImage(astroImg, astronaut.x, astronaut.y, astronaut.astrWidth, astronaut.astrHeight);
//       };
//       astroImg.src = "images/astronaut.png";  
//     }
  
//     document.onkeydown = function(e) {
//       switch (e.keyCode) {
//         case 37:
//           astronaut.moveLeft();
//           console.log("left", astronaut);
//           break;
//         case 38:
//           astronaut.moveUp();
//           console.log("up", astronaut);
//           break;
//         case 39:
//           astronaut.moveRight();
//           console.log("right", astronaut);
//           break;
//         case 40:
//           astronaut.moveDown();
//           console.log("down", astronaut);
//           break;
//       }
//       updateCanvas();
//       for (i=0; i<myObstacles.length;i++){
//         myObstacles[i].update();
//       }
//     };
  
//     function updateCanvas(){
//       ctx.clearRect(0, 0, 1500, 1700);
//       drawAstronaut(astronaut);
//     //   drawAsteroid(asteroid);
  
//       board.frames ++;
//       if(board.frames % 60 === 1){
//         asteroidX = Math.floor(Math.random() * 400);
//         asteroidY = Math.floor(Math.random() * 400);
//         asteroidWidth = 100;
//         asteroidHeight = 100;
//         myObstacles.push(new Obstacle(asteroidX, asteroidY, asteroidWidth, asteroidHeight));
//         board.frames = 2;
//         console.log(myObstacles);
//       }
//       for (i = 0; i < myObstacles.length; i++) {
//         myObstacles[i].y += 10;
//         myObstacles[i].update();    
//       }
//     }
//     updateCanvas();
  
//   };






// //create canvas for game display
// var canvas = document.getElementById('canvas');
// var ctx = canvas.getContext('2d');
// document.body.appendChild(canvas);
// var astronaut = drawAstronaut();
// // var asteroid;
// var myObstacles = [];
// // var objects = [];
// // var startTime = Date.now();
// // animate();
// // startGame();
// // updateCanvas();

// // window.onload = function() {
// //     document.getElementById("start-button").onclick = function() {
// //       startGame();
// //     };
// function drawAstronaut() {
//     //     //load astronaut image
//     //     // var astroReady = false;
//         var astroImg = new Image();
//         astroImg.src = "images/astronaut.png";

//         astroImg.onload = function() {
//     //         //show image
//     //     // astroReady = true;
//            ctx.drawImage(astroImg, 400, 400, 120, 120);
//         }

//         return astroImg;
// }
// document.onkeydown = function(e) {
//     switch (e.keyCode) {
//     case 38: astroImg.moveUp();    console.log('up',    astroImg); break;
//     case 40: astroImg.moveDown();  console.log('down',  astroImg); break;
//     case 37: astroImg.moveLeft();  console.log('left',  astroImg); break;
//     case 39: astroImg.moveRight(); console.log('right', astroImg); break;
//     }
// updateCanvas();
// }
//     function startGame() {
//       myGameArea.myObstacles = [];
//       myGameArea.start();
//       player = new Component(220, 150, "./images/astronaut.png", 150, 100, "player");
//     }
//     var lines = 0;

// var myGameArea = {
//     canvas: document.createElement("canvas"),
//     start: function() {
//       this.context = this.canvas.getContext("2d");
//       document.getElementById("canvas").append(this.canvas);
//       this.reqAnimation = window.requestAnimationFrame(updateGameArea);
//     },
//     myObstacles: [],
//     frames: 0,
//     clear: function() {
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     },
//     score: function() {
//         points = (Math.floor(this.frames / 5));
//         this.context.font = '20px Verdana';
//         this.context.fillStyle = 'white';
//         this.context.fillText('Score: ' + points, 60, 40);
//       },
//       stop: function() {
//         cancelAnimationFrame(this.reqAnimation);
//         this.gameOver();
//       },
//       gameOver: function() {
//         this.clear();
//         this.drawFinalPoints();
//       },
//       drawFinalPoints: function() {
//         this.context.fillStyle = "black";
//         this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
//         this.context.font = '34px Verdana';
//         this.context.fillStyle = '#870007';
//         this.context.fillText('Game Over!', 100, 250);
//         this.context.fillStyle = 'white';
//         this.context.fillText('Your final score', 70, 300);
//         this.context.fillText(points, 150, 340);
//       }
//     };
//     function Component(width, height, color, x, y, type) {
//     this.width = width;
//     this.height = height;
//     this.type = type;
//     this.x = x;
//     this.y = y;
//     if (this.type == "player") { this.image = new Image(); }
//     this.update = function() {
//       ctx = myGameArea.context;
//       if(this.type == "player"){
//         this.image.src = color;
//         ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//       } else {
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//       }
//     };
//     this.left = function() { return this.x; };
//     this.right = function() { return (this.x + this.width); };
//     this.top = function() { return this.y; };
//     this.bottom = function() { return this.y + (this.height); };
//     this.crashWith = function(obstacle) {
//       return !((player.bottom() < obstacle.top()) ||
//         (player.top() > obstacle.bottom()) ||
//         (player.right() < obstacle.left()) ||
//         (player.left() > obstacle.right()));
//     };
//   }
//   function updateGameArea() {
//     for (i = 0; i < myGameArea.myObstacles.length; i += 1) {
//       if (player.crashWith(myGameArea.myObstacles[i])) {
//         myGameArea.stop();
//         return;
//       }
//     }
//     myGameArea.clear();
//     myGameArea.backgroud();
//     drawObstacles();
//     myGameArea.frames += 1;
//     for (i = 0; i < myGameArea.myObstacles.length; i += 1) {
//       myGameArea.myObstacles[i].y += 1;
//       myGameArea.myObstacles[i].update();
//     }
//     player.update();
//     myGameArea.score();
//     myGameArea.reqAnimation = window.requestAnimationFrame(updateGameArea);
//   }
//   function drawObstacles() {
//     if (myGameArea.frames % 140 === 0) {
//       minWidth = (myGameArea.canvas.width - 80)*0.3;
//       maxWidth = (myGameArea.canvas.width - 80)*0.7;
//       width = minWidth + Math.floor(Math.random()*(maxWidth-minWidth));
//       posX = 40 + (Math.floor(Math.random() * (myGameArea.canvas.width-80-width)));
//       myGameArea.myObstacles.push(new Component(width, 20, "#870007", posX, 0));
//     }
//   }
// //   document.onkeydown = function(e) {
// //     if (e.keyCode == 39 && player.x < (myGameArea.canvas.width - player.width - 55)) {
// //       player.x += 10;
// //     }
// //     if (e.keyCode == 37 && player.x > 55) {
// //       player.x -= 10;
// //     }
// //   };



















// window.onload = function() {
//     document.getElementById("start-btn").onclick = function() {
//       document.getElementById("canvas").style.display = 'block';
//       gameStart();
// };

// function spawnRandomObject() {
//     var t;
//     if (Math.random() < 0.50) {
//         t = "red";
//     } else {
//         t = "blue";
//     }
//     var object = {
//         // set this objects type
//         type: t,
//         // set x randomly but at least 15px off the canvas edges
//         x: Math.random() * (canvas.width - 30) + 15,
//         // set y to start on the line where objects are spawned
//         y: spawnLineY,
//     }

//     // add the new object to the objects[] array
//     objects.push(object);
// }


// function animate() {

//     // get the elapsed time
//     var time = Date.now();

//     // see if its time to spawn a new object
//     if (time > (lastSpawn + spawnRate)) {
//         lastSpawn = time;
//         spawnRandomObject();
//     }

//     //animation frame
//     requestAnimationFrame(animate, drawAstronaut());

//     // clear the canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // move each object down the canvas
//     for (var i = 0; i < objects.length; i++) {
//         var object = objects[i];
//         object.y += spawnRateOfDescent;
//         ctx.beginPath();
//         ctx.arc(object.x, object.y, 8, 0, Math.PI * 2);
//         ctx.closePath();
//         ctx.fillStyle = object.type;
//         ctx.fill();
//     }

// }
// function updateCanvas() {

//     clearCanvas();
//     // draw2(asteroid);
//     drawAstronaut();
// }

    // setInterval(update, 20)
// function clearCanvas() {
//     ctx.clearRect(0,0,812,550);
// }


// var gameZone = {
//     canvas : document.createElement("canvas"),
//     start : function() {
//         this.canvas.width = 812;
//         this.canvas.height = 580;
//         this.context = this.canvas.getContext("2d");
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//         this.interval = setInterval(updateGameArea, 20);
//     },
//     clear : function() {
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     }
// }

// function startGame() {
//     this.draw(astronaut);
//     this.draw2(asteroid); 
//     myGameArea.start();
// }
    
// function draw2(asteroid) {
//         //load asteroid
//     // var asterReady = false;
//     var asterImg = new Image();
//     asterImg.onload = function() {
//         //show asteroid
//     // asterReady = true;
//         ctx.drawImage(asterImg, asteroid.x, asteroid.y, 120, 120);
//      }
//      asterImg.src = "../game/images/asteroid.png";
// }
//     //game objects


// document.addEventListener("keydown", function (key) {
//     keysDown[key.keyCode] = true;
//   }, false);
// document.addEventListener("keyup", function (key) {
//     delete keysDown[key.keyCode];
//   }, false);
  //reset positions
//   var reset = function () {
//       //reset player
//     astronaut.x = canvas.width / 2;
//     astronaut.y = canvas.height / 2;
//     //place asteroid somewhere
//     asteroid.x = 32 + (Math.random() * (canvas.width - 64));
//     asteroid.y = 32 + (Math.random() * (canvas.height - 64));
// };
//update objects - player  
// var update = function () {
//     if (38 in keysDown) { //holding up key
//       astroImg.y -= astroImg.speed;
//     }
//     if (40 in keysDown) { //holding down key
//       astroImg.y += astroImg.speed;
//     }
//     if (37 in keysDown) { //holding left key
//         astroImg.x -= astroImg.speed;
//     }
//     if (39 in keysDown) { //holding right key
//         astroImg.x += astroImg.speed;
//     }
    //check if they hit each other
    // if (
    //     astronaut.x <= (asteroid.x + 32)
    //     && asteroid.x <= (astronaut.x + 32)
    //     && astronaut.y <= (asteroid.y + 32)
    //     && asteroid.y <= (astronaut.y + 32)
    //   ) {
    //     ++asteroidsHit;
    //     reset();
    //   }
    // };
    //put on canvas
//     var render = function () {
//         if (astroReady) {
//           ctx.drawImage(astroImg, astronaut.x, astronaut.y);
//         }
//         if (asterReady) {
//           ctx.drawImage(asterImg, asteroid.x, asteroid.y);
//         }
//         //score and time 
//         ctx.fillStyle = "rgb(200, 200, 200)";
//         ctx.font = "20px Helvetica";
//         ctx.textAlign = "left";
//         ctx.textBaseline = "top";
//         ctx.fillText("Asteroids hit: " + asteroidsHit, 20, 20);
//         ctx.fillText("Time: " + count, 20, 50);
//         // Display game over message when timer finished
//         if(finished==true){
//           ctx.fillText("Game over!", 200, 220);
//         }
//       };
//       var count = 30; //seconds the game lasts for
//       var finished = false;
// var counter =function(){
//   count=count-1; // countown by 1 every second
//   // when count reaches 0 clear the timer, hide asteroid and
//   // astronaut and finish the game
//     if (count <= 0)
//     {
//       // stop the timer
//        clearInterval(counter);
//        // set game to finished
//        finished = true;
//        count=0;
//        // hider astroid and hero
//        asterReady=false;
//        astroReady=false;
//     }
// }
// // timer interval is every second
// setInterval(counter, 1000);
// // The main game loop
// var main = function () {
//   // run the update function
//   update(0.02);
//   // run the render function
//   render();
//   //do this again
//   requestAnimationFrame(main);
// };


    
// var asteroid = {
//     x: 100,
//     y: 100
// }












