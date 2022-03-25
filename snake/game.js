
let snake={};    //snake object
let boardSize;   //how big the board is in squares (eg. 10x10)
let cellSize;   //how big each cell will be in pixels  canvas/boardSize
let canvas;
let ctx;
let frame=0;
let apple = {};
let tempSegment = {};
let end= false;
let score;

//Directions
// up -1  0 none  down 1  ,  left -1   0 none  right 1



window.onload = function () {

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  ctx.font="40px Ariel";
  const keyListener = document.addEventListener('keydown',keyHandler);
  reset();

}

const appleMove = () => {
  apple.x = Math.floor(Math.random() * boardSize);
  apple.y = Math.floor(Math.random() * boardSize);
}


const keyHandler = (e) => {
  switch (e.key) {
    case "w":
      if(snake.directionY==1){end = true; drawSnake();}
      snake.directionY=-1;
      snake.directionX= 0;
      break;
    case "s":
      if(snake.directionY==-1){end = true;drawSnake();}
      snake.directionY=1;
      snake.directionX= 0;
      break;
    case "a":
      if(snake.directionX==1){end = true;drawSnake();}
      snake.directionX=-1;
      snake.directionY= 0;
      break;
    case "d":
      if(snake.directionX==-1){end = true;drawSnake();}
      snake.directionX=1;
      snake.directionY=0;
      break;
    default:

  }
}

const reset = () => {
  console.log("here we go again!");
  boardSize = 20;
  cellSize = Math.floor(canvas.width/boardSize);  //should be an int
  appleMove();
  snake = {
    segmentList: [[boardSize/2,boardSize/2],[]],
    directionX: 0,
    directionY: -1
  }

  tempSegment = null;
  end=false;
  score=0;
  draw();
}


const draw = () => {
if(end==true){return}
  frame+=1;

  if(frame>8){
        frame=0
        update();
        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        drawCells();
        drawSnake();
        //draw apple
        ctx.fillStyle = '#d02';
        ctx.fillRect(apple.x * cellSize, apple.y * cellSize, cellSize, cellSize);
        ctx.fillStyle = '#fff';
        ctx.fillText(score,30,50);
}


requestAnimationFrame(draw);

}

const drawSnake = () => {

var g = 250;
  for(let segment of snake.segmentList){

    if(g<100){g=100};
    ctx.fillStyle= 'rgb(30,' + g +',40)';
    //ctx.fillStyle = '#4d9';
    if(end==true){
        ctx.fillStyle = '#d49';
    }
    ctx.fillRect(segment[0]*cellSize,segment[1]*cellSize,cellSize,cellSize);
      g-=6;
  }


}


const update = () => {
  if(end){return};
  //get old x,y position of head and update it
  var x = snake.segmentList[0][0]+=snake.directionX;
  var y = snake.segmentList[0][1]+=snake.directionY;

  //add new head
  snake.segmentList.unshift([x,y]);
  //remove tail
  snake.segmentList.pop();


    //check collsion with apple
    if (snake.segmentList[0][0]==apple.x && snake.segmentList[0][1]==apple.y){
      tempSegment = {};
      tempSegment.x = apple.x;
      tempSegment.y = apple.y;
      snake.segmentList.push([tempSegment.x,tempSegment.y]);
      appleMove();
      score+=1
    }

    //check collision with snake
    checkSnakeCollsion();




}

const checkSnakeCollsion = () => {

  let head = {x: snake.segmentList[0][0],y: snake.segmentList[0][1]};

  //room bounds
  if(head.x<0 || head.x>boardSize-1 || head.y<0 || head.y>boardSize-1){
    console.log('out of play area.')
    snake.segmentList[0][0]-=snake.directionX;
    snake.segmentList[0][1]-=snake.directionY;
    end = true;

    drawSnake();
  }

  for(let i=2;i< snake.segmentList.length-1;i++){
    if(snake.segmentList[i][0] == head.x && snake.segmentList[i][1]==head.y){
      end = true;
        console.log("End");
      drawSnake();
   }
 }
}

const drawCells = () => {
  ctx.strokeStyle = '#021';
  for(let x=0;x<boardSize;x++){
    for(let y=0;y<boardSize;y++){
      ctx.strokeRect(x*cellSize,y*cellSize,cellSize,cellSize);
    }
  }
}
