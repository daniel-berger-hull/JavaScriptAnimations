/****************************************************************
 *      Basic Javascrip animation on an HTML5 Canvas
 *          
 ****************************************************************/

const ANIMATION_PERIOD = 1000/20;


const X_PROJECTION_OFFSET = 20.0;
const Z_PROJECTION_OFFSET = 20.0;


let canvas,ctx;

let xCircle = 0;
let yCircle = 0;

let x_canvas_offsert = 0.0;
let y_canvas_offsert = 0.0;



// 3D Coordinate system:
//   x,y,z    
//    --> x = left to right    - to + coords values
//    --> y = back to right    - to + coords values
//    --> z = bottom to top    - to + coords values

let cubeVertex = [  [  5.0,  5.0,  0.0] ,
                    [  5.0, -5.0,  0.0 ],
                    [ -5.0, -5.0,  0.0 ],
                    [ -5.0,  5.0,  0.0] ,
                    [  5.0,  5.0, 10.0 ] ,
                    [  5.0, -5.0, 10.0 ],
                    [ -5.0, -5.0, 10.0 ],
                    [ -5.0,  5.0, 10.0 ] ,
                    [  15.0,  5.0, 20.0 ] ,
                    [  15.0, -5.0, 20.0 ],
                    [ -15.0, -5.0, 20.0 ],
                    [ -15.0,  5.0, 20.0 ]  ];

let vertexIndex = [ [0,1], [1,2], [2,3], [3,0],
                    [4,5], [5,6] ,[6,7] ,[7,4],
                    [0,4], [1,5], [2,6], [3,7],

                    [8,9], [9,10], [10,11], [11,8],
                    [4,8], [5,9],  [6,10], [7,11]  ];


let frameCount = 0;



function orthoMapping( verctor3D ) {

  // console.log(  verctor3D );

  const x =  verctor3D[0]*10.0;
  const y =  -verctor3D[1]*10.0;
  const z =  verctor3D[2]*10.0;


   // return [   x + (z * Math.cos(0.707)) +   x_canvas_offsert ,
   //            y + (z * Math.sin(0.707)) +   y_canvas_offsert  ];


   return [   (x * Math.cos(0.122))   + (z * Math.cos(0.733)  * 0.5 ) +   x_canvas_offsert ,
               y + (z * Math.sin(0.733))   + (z * Math.sin(0.122)) +   y_canvas_offsert  ];


}
 function init() {
   console.log("Started Initialisation of animation...");


   canvas = document.getElementById('canvas');
   ctx = canvas.getContext('2d');
   canvas.height = window.innerHeight;
   canvas.width = window.innerWidth;

   yCircle = canvas.height / 2;

   console.log( "Initialisation completed" );


    x_canvas_offsert =  canvas.width/2.0;
    y_canvas_offsert =  canvas.height/2.0;
 

    console.log( 'x_canvas_offsert = ' + x_canvas_offsert +
                 ' y_canvas_offsert = ' + y_canvas_offsert );

  //  setInterval( animate, ANIMATION_PERIOD );
    setInterval( drawCanvas, ANIMATION_PERIOD );

    // setInterval( displayCount, 1000 );





  

 }

 function animate(){
    // Or if you want to have a color in the Canvas...
    // ctx.fillStyle='rgb(0,0,255)';
    // ctx.fillRect(0,0,canvas.width, canvas.height);
   ctx.clearRect(0,0,canvas.width, canvas.height);

   // ctx.beginPath();
   // ctx.arc( xCircle, yCircle, 40, 0, 2 * Math.PI);
   // ctx.stroke();

   // xCircle++;
   // yCircle++;
   
   // if (xCircle > 500) xCircle = 0;

}


function drawCanvas() {

  // init();
 

  const projectedCube = cubeVertex.map( nextElement =>  orthoMapping(nextElement) );
  // projectedCube.forEach( nextElement => {  console.log( nextElement )  });



  // const matrix = Math.zeros(3);


  // console.log( matrix );


  // const projectedCube = cubeVertex.map( nextElement =>   [ nextElement[0]*10.0 + X_PROJECTION_OFFSET + x_canvas_offsert ,
  //                                                          nextElement[2]*10.0 + Z_PROJECTION_OFFSET + y_canvas_offsert] );


// vertexIndex.forEach( nextPair => {  console.log(nextPair)  });
 
  ctx.clearRect(0,0,canvas.width, canvas.height);


  ctx.beginPath();

  for (let i=0;i<vertexIndex.length;i++){

    const vertexIndexStart = vertexIndex[i][0];
    const vertexIndexEnd   = vertexIndex[i][1];

    ctx.moveTo( projectedCube[vertexIndexStart][0],  projectedCube[vertexIndexStart][1]);
    ctx.lineTo(  projectedCube[vertexIndexEnd][0],  projectedCube[vertexIndexEnd][1]);
  }

  ctx.stroke();

  frameCount++;

}


function displayCount() {
  console.log( frameCount );
}