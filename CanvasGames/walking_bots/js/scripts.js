/****************************************************************
 *      Basic Javascrip animation on an HTML5 Canvas
 *      ---------------------------------------------
 
 *      Will load image of a knight and a rocks, and moves the 
 *      rocks across the screen. The background is handled by
 *      CSS, and not in the Javascript (the render is not painting
 *      the background, only the objects - Knight and Rocks) 
 ****************************************************************/


const ANIMATION_PERIOD = 1000/20;
const SCREEN_WIDTH     =  1000;
const SCREEN_HEIGHT    =  1000;

const TOTAL_NUMBER_BOTS = 10;


let canvas,ctx;

let bots = [];
let botImg;

let startTime = 0;
let totalUpdates = 0;
let frameRate = 0;


class  VideoObject {

  constructor( image,xPos, yPos, width, height) {
      this.image = image;
      this.xPos = xPos;
      this.yPos = yPos;
      this.width = width;
      this.height = height;

      this.dX = 0;
      this.dY = 0;

      this.frameY   = 0;
      this.frameX   = 0;
      this.minFrame = 0;
      this.maxFrame = 0;

      this.active = true;
      this.name = 'Not Defined';
    }

    reset(){
      this.xPos = 0;
      this.yPos = 0;
      this.dX = 0;
      this.dY = 0;
      this.frameX = 0;
      this.active = false;
      console.log("Video Object been reset: " + this.name );
    }

    update() {

      if ( this.active === false) return;

      this.xPos +=  this.dX;
      this.yPos +=  this.dY;


      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = this.minFrame;

      if ( this.xPos < 0 ||  this.xPos >= SCREEN_WIDTH  )   this.reset();
      if ( this.yPos < 0 ||  this.yPos >= SCREEN_HEIGHT  )  this.reset();
    }



    draw(context){

      if ( this.active === false) return;
      // context.drawImage(this.image,  
      //                  this.xPos,  this.yPos,
      //                  this.width, this.height);

      
      context.drawImage(this.image,  
                        this.frameX*this.width,  this.frameY*this.height,
                        this.width, this.height,
                        this.xPos,  this.yPos,
                        this.width*1.5, this.height*1.5);
    }

    toString(){
      return ("Name: " + this.name + 
              " [x,y] = " + this.xPos + " , " + this.yPos + 
              "  [dx,dy] = " +  this.dX + " , " + this.dY +
              "  width = " +  this.width + " , height = " + this.height );
    }

};


 function init() {
   console.log("Started Initialisation of animation...");


   canvas = document.getElementById('canvas');
   ctx = canvas.getContext('2d');
   canvas.height = window.innerHeight;
   canvas.width = window.innerWidth;

   console.log("Canvas Size [widht, height] = [" + canvas.width + "," + canvas.height + "]");

  //  yCircle = canvas.height / 2;

   loadImages();
   buildBots();

   
   console.log( "Initialisation completed" );


   startTime =  Date.now();
   console.log("Start Time: " + startTime );


  //  setInterval( animate, ANIMATION_PERIOD );
   // Use independent timer for the execution of the update and render... 
   setInterval( update, ANIMATION_PERIOD );
   setInterval( render, ANIMATION_PERIOD );


 }

 function loadImages() {

  botImg = new Image();
  botImg.onload = function() {
    console.log("Image loaded (Bots)");
  };
  botImg.src = './resources/img/character.png';  
 }


  function buildBots() {


    for (let i=0;i<TOTAL_NUMBER_BOTS;i++){

        // let x = Math.floor(Math.random() * (canvas.width - this.width) );
        // let y = Math.floor(Math.random() * (canvas.height - this.height) );
        let x = Math.floor(Math.random() * (canvas.width - 40) );
        let y = Math.floor(Math.random() * (canvas.height - 43.875) );



        let botAgent = new VideoObject( botImg,x,y,40,43.875 );
        botAgent.dX = 0;
        botAgent.dY = 0;
       
        // botAgent.minFrame = 0;
        // botAgent.maxFrame = 12;
        assignFramesToBot(  Math.floor(Math.random() * 5), botAgent);
    
        botAgent.name = "Walking Bot";
        console.log("\tVideo Object Defined: " + botAgent.toString() );
    
        bots.push( botAgent );
    }
  }

  function assignFramesToBot( direction, botAgent ){
     console.log("Direction of the bot is " + direction);
      if ( direction === 0 ) {
        botAgent.frameY = 0; 
        botAgent.minFrame = 4;
        botAgent.maxFrame = 15;
        botAgent.dX = 0;
        botAgent.dY = -2;
      }
      else if ( direction === 1 ) {
          botAgent.frameY = 1; 
          botAgent.minFrame = 4;
          botAgent.maxFrame = 14;
          botAgent.dX = 2;
          botAgent.dY = -2;
      }
      else if ( direction === 2 ) {
          botAgent.frameY = 3; 
          botAgent.minFrame = 3;
          botAgent.maxFrame = 13;
          botAgent.dX = 2;
          botAgent.dY = 0;
      }
      else if ( direction === 3 ) {
          botAgent.frameY = 4;
          botAgent.minFrame = 4;
          botAgent.maxFrame = 15;
          botAgent.dX = 2;
          botAgent.dY = 2;
      } 
      else if ( direction === 4) {
          botAgent.frameY = 6;
          botAgent.minFrame = 0;
          botAgent.maxFrame = 12;
          botAgent.dX = 0;
          botAgent.dY = 2;
      }
      else if ( direction === 5 ) {
          botAgent.frameY = 7;
          botAgent.minFrame = 0; 
          botAgent.maxFrame = 9;
          botAgent.dX = 0;
          botAgent.dY = 0;
      }
      
  }


function update() {

  for (let i=0;i< bots.length; i++ ){
      bots[i].update();
    }   
}

function render(){

  ctx.clearRect(0,0,canvas.width, canvas.height);

  // ctx.drawImage(botImg, 0, 0);

  for (let i=0;i< bots.length; i++ ){
    bots[i].draw(ctx);
  }   

  totalUpdates++;
  if ( startTime === 0) 
    startTime = Date.now();

    

  let timeLasted = (Date.now() - startTime) / 1000;
  frameRate = (totalUpdates / timeLasted).toFixed(1);

  ctx.font = "40px Arial";
  ctx.fillStyle = "red";
  ctx.fillText( frameRate  + " fps",
                             canvas.width-150, 
                              canvas.height-30);
                      

}