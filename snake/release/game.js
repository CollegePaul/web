let canvas;
let ctx;

let boardSize = 20;   //how big the board is in squares (eg. 10x10)
let cellSize = 30;   //how big each cell will be in pixels  canvas/boardSize

let frame=0;

let snake={
    directionX: 0, 
    directionY: -1, //starts moving up
    segmentList: [[boardSize/2,boardSize/2],[]],
};  

let apple = {};

let gameOver = false;



window.onload = () => {
  console.log("Game starting....");
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  document.addEventListener('keydown',keyHandler);
  appleMove();
  draw();
} 

const draw = () => {
  frame ++;
  if(frame>8){
    frame=0
    update();
  }
  //clear screen each frame
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,canvas.width,canvas.height);  
   
  drawSnake();

  //draw apple
  ctx.fillStyle = '#d02';
  ctx.fillRect(apple.x * cellSize, apple.y * cellSize, cellSize, cellSize);

  if(gameOver){
    ctx.font = "70px Verdana";
    ctx.fillText("Game Over",100,300);
  }

  requestAnimationFrame(draw);
}


const drawSnake = () => {
  ctx.fillStyle = "#00FF00";
  for(let segment of snake.segmentList){  
    ctx.fillRect(segment[0]*cellSize,segment[1]*cellSize,cellSize,cellSize);
  }
}


const keyHandler = (e) => {
    switch (e.key) {
      case "w":
        snake.directionY=-1;
        snake.directionX= 0;
        break;
      case "s":
        snake.directionY=1;
        snake.directionX= 0;
        break;
      case "a":
        snake.directionX=-1;
        snake.directionY= 0;
      break;
    case "d":
        snake.directionX=1;
        snake.directionY=0;
      break;
    default:
     
    }
  }

const update = () => {
    if(gameOver){return}; //no more updates
    //update snake positiona
    var x = snake.segmentList[0][0]+=snake.directionX;
    var y = snake.segmentList[0][1]+=snake.directionY;

    //add new head
    snake.segmentList.unshift([x,y]);
    //remove tail
    snake.segmentList.pop();

    //check collsion with apple 
    if (snake.segmentList[0][0]==apple.x && snake.segmentList[0][1]==apple.y){
      snake.segmentList.push([apple.x,apple.y]);
      appleMove();
    }
   

    if(x<0 || x>boardSize){
      gameOver = true;
    }
}


const appleMove = () => {
  apple.x = Math.floor(Math.random() * boardSize);
  apple.y = Math.floor(Math.random() * boardSize);
}
