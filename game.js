
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
canvas.width = screenWidth;
canvas.height = screenHeight;


var score = 0;
var numBlocks = 4;
var colorA = "#F44336";
var colorB = "#4CAF50";
var error = 8;

var Xstart = 0; //Coordenada x donde empieza el bloque de arriba
var Ystart = screenHeight*0.15; //Coordenada y donde empieza el bloque de arriba
var BlockXspace = screenWidth*0.05; //Espaciado entre bloques horizontales
var BlockYspace = screenWidth*0.05; //Espaciado entre bloques verticales
var BlockWidth = screenWidth*0.2;//La anchura que tiene el bloque
var BlockHeigth = screenWidth*0.1; //la altura que tiene el bloque
var BlockSpeed = screenWidth*0.002;

var rCanon = screenWidth*0.15; //El radio del cañoñ
var Xcanon = screenWidth/2; //coordenada X de la posicion del cañon
var Ycanon = screenHeight - rCanon; //Coordenada Y de la posicion del cañon

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
console.log(screenHeight);
console.log(screenWidth);



//Variables relacionadas con las bolas
var ballSpeed = screenWidth*0.008;
var balls = [{x:Xcanon , y:(Ycanon-2*rCanon) , visible:false},
              {x:Xcanon , y:(Ycanon-2*rCanon) , visible:false},
              {x:Xcanon , y:(Ycanon-2*rCanon) , visible:false}];

//Array de bloques
var blocksUp = [{Xcorner:Xstart , Ycorner:Ystart , Width:BlockWidth , Height:BlockHeigth ,Color: colorA},
              {Xcorner:Xstart , Ycorner:Ystart , Width:BlockWidth , Height:BlockHeigth,Color: colorA},
              {Xcorner:Xstart , Ycorner:Ystart , Width:BlockWidth , Height:BlockHeigth,Color: colorA},
              {Xcorner:Xstart , Ycorner:Ystart , Width:BlockWidth , Height:BlockHeigth,Color: colorA}];

var blocksDown = [{Xcorner:Xstart , Ycorner:Ystart , Width:BlockWidth , Height:BlockHeigth,Color: colorA},
              {Xcorner:Xstart , Ycorner:Ystart , Width:BlockWidth , Height:BlockHeigth,Color: colorA},
              {Xcorner:Xstart , Ycorner:Ystart , Width:BlockWidth , Height:BlockHeigth,Color: colorA},
              {Xcorner:Xstart , Ycorner:Ystart , Width:BlockWidth , Height:BlockHeigth,Color: colorA}];



window.addEventListener('load', function(){ // on page load

    document.body.addEventListener('touchstart', function(e){
        //El codigo cuando se detecta un toque en la pantalla

        if(balls[0].visible==true && balls[1].visible==true && balls[2].visible==false){
          balls[2].visible = true ;
        }


        if(balls[0].visible==true && balls[1].visible==false && balls[2].visible==false){
          balls[1].visible = true ;
        }

        if(balls[0].visible==false && balls[1].visible==false && balls[2].visible==false){
          balls[0].visible = true ;
        }

    }, false)

}, false)



function drawBlocks(){
  for (var i=0;i<blocksUp.length;i++){
    //Dibujamos los horizontales eje x

    if(blocksUp[i].Xcorner > screenWidth - BlockWidth){
      //Si se esta saliuendo de la pantalla hay de dibujar 2 rect
      ctx.beginPath();
      ctx.rect(blocksUp[i].Xcorner,blocksUp[i].Ycorner,blocksUp[i].Width,blocksUp[i].Height);
      ctx.fillStyle = blocksUp[i].Color;
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.rect(0,blocksUp[i].Ycorner,blocksUp[i].Width - (screenWidth - blocksUp[i].Xcorner),blocksUp[i].Height);
      ctx.fillStyle = blocksUp[i].Color;
      ctx.fill();
      ctx.closePath();

    }else{
      ctx.beginPath();
      ctx.rect(blocksUp[i].Xcorner,blocksUp[i].Ycorner,blocksUp[i].Width,blocksUp[i].Height);
      ctx.fillStyle = blocksUp[i].Color;
      ctx.fill();
      ctx.closePath();
    }


  }

  for (var i=0;i<blocksDown.length;i++){
    //Dibujamos los horizontales eje x

    if(blocksDown[i].Xcorner > screenWidth - BlockWidth){
      ctx.beginPath();
      ctx.rect(0,blocksDown[i].Ycorner,blocksDown[i].Width - (screenWidth - blocksDown[i].Xcorner),blocksDown[i].Height);
      ctx.fillStyle = blocksDown[i].Color;
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.rect(blocksDown[i].Xcorner,blocksDown[i].Ycorner,blocksDown[i].Width,blocksDown[i].Height);
      ctx.fillStyle = blocksDown[i].Color;
      ctx.fill();
      ctx.closePath();

    }else{
      ctx.beginPath();
      ctx.rect(blocksDown[i].Xcorner,blocksDown[i].Ycorner,blocksDown[i].Width,blocksDown[i].Height);
      ctx.fillStyle = blocksDown[i].Color;
      ctx.fill();
      ctx.closePath();

    }
  }


}

function drawCanon(){

  ctx.beginPath();
  ctx.arc(Xcanon,Ycanon,rCanon,0*Math.PI,2*Math.PI)
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(Xcanon - (rCanon/2),Ycanon-2*rCanon,rCanon,2*rCanon);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();

}

function drawScore() {
    var size = screenHeight*0.1;
    var font = size + "px Arial";
    ctx.font = font;
    ctx.fillStyle = "#0095DD";
    ctx.fillText(score, screenWidth/2 - screenHeight*0.1/2, screenHeight*0.1);
}

function drawBall(){

  for(var i=0;i<balls.length;i++){
    if(balls[i].visible==true){
      ctx.beginPath();
      ctx.arc(balls[i].x,balls[i].y,rCanon/5,0*Math.PI,2*Math.PI)
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.closePath();
    }
  }

  // if(ball1.visible==true){
  //   ctx.beginPath();
  //   ctx.arc(ball1.x,ball1.y,rCanon/4,0*Math.PI,2*Math.PI)
  //   ctx.fillStyle = "#000000";
  //   ctx.fill();
  //   ctx.closePath();
  // }
  // if(ball2.visible==true){
  //   ctx.beginPath();
  //   ctx.arc(ball1.x,ball1.y,rCanon/4,0*Math.PI,2*Math.PI)
  //   ctx.fillStyle = "#000000";
  //   ctx.fill();
  //   ctx.closePath();
  // }
  // if(ball3.visible==true){
  //   ctx.beginPath();
  //   ctx.arc(ball1.x,ball1.y,rCanon/4,0*Math.PI,2*Math.PI)
  //   ctx.fillStyle = "#000000";
  //   ctx.fill();
  //   ctx.closePath();
  // }
}



function refreshGame(){


  refreshBlocks();
  checkCollisions();



}

function checkCollisions(){

  //Comprobamos que la bola se haya salido ya de la pantalla, de ser asi la
  //restablecemos. Si la bola sigue en pantalla la damos velocidad
  for(var i=0;i<balls.length;i++){
    if (balls[i].y < 0 ){
      balls[i].y = (Ycanon-2*rCanon);
      balls[i].visible=false;
    }
  }
  for(var i=0;i<balls.length;i++){
    if(balls[i].visible==true){
      balls[i].y = balls[i].y - ballSpeed;
    }
  }



  //Comprobamos que la bola haya chocado con el color A de ser asi subimos el score
  //si choca con colorB se acabó el juego
  for(var i=0;i<balls.length;i++){
    //console.log(blocksDown[1].Ycorner);
    //console.log(blocksDown[1].Ycorner + blocksDown[1].Height);
    if( (balls[i].y > blocksDown[1].Ycorner) && (balls[i].y < (blocksDown[1].Ycorner + blocksDown[1].Height))){
      for(var j=0;j<blocksDown.length;j++){
        if((blocksDown[j].Xcorner > balls[1].x - blocksDown[j].Width/2 + error) && (blocksDown[j].Xcorner < balls[1].x + blocksDown[j].Width/2 - error) && (blocksDown[j].Color==colorA)){
          balls[i].visible=false;
          balls[i].y=(Ycanon-2*rCanon);
        }
      }
    }
  }

}


function refreshBlocks(){

  for (var i=0;i<blocksUp.length;i++){
    if(blocksUp[i].Xcorner > screenWidth){//Hay que cambiar 600 por el ancho de pantalla
      blocksUp[i].Xcorner = Xstart;
    }else{
      blocksUp[i].Xcorner = blocksUp[i].Xcorner + BlockSpeed;
    }

  }

  for (var i=0;i<blocksDown.length;i++){
    if(blocksDown[i].Xcorner < 0){//Hay que cambiar 0 por el ancho de pantalla
      blocksDown[i].Xcorner = Xstart + blocksDown.length*BlockWidth + blocksDown.length*BlockXspace;
    }else{
      blocksDown[i].Xcorner = blocksDown[i].Xcorner - BlockSpeed;
    }

  }


}

function initializeBlocks(){

  for (var i=0;i<blocksUp.length;i++){

    blocksUp[i].Xcorner = Xstart + i*BlockWidth + i*BlockXspace;
    blocksUp[i].Ycorner = Ystart;
    blocksUp[i].Width = BlockWidth;
    blocksUp[i].Height = BlockHeigth;
    if(i==0 || i==2){
      blocksUp[i].Color = colorA;
    }else{
      blocksUp[i].Color = colorB;
    }
  }

  for (var i=0;i<blocksDown.length;i++){

    blocksDown[i].Xcorner = Xstart + i*BlockWidth + i*BlockXspace + BlockXspace;
    blocksDown[i].Ycorner = (Ystart + BlockYspace + BlockHeigth);
    blocksDown[i].Width = BlockWidth;
    blocksDown[i].Height = BlockHeigth;
    if(i==1|| i==3){
      blocksDown[i].Color = colorA;
    }else{
      blocksDown[i].Color = colorB;
    }
  }

}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBlocks();
    drawCanon();
    drawBall();
    drawScore();
    refreshGame();

    // x += dx;
    // y += dy;

    requestAnimationFrame(draw);
}


//Main
initializeBlocks();
drawBlocks();
drawCanon();
drawBall();
draw();
