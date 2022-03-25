// Snake Game V1.0
// Paul Smith
// 01/04/21

//game variables
let snake={};   
let boardSize;     //the number of square 
let cellSize;      //the size of the square on the board  
let canvas;
let ctx;
let frame=0;
let apple = {};
let tempSegment = {};
let end= false;
let score;

//this will run when the page loads
window.onload = function () {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  const keyListener = document.addEventListener('keydown',keyHandler);
  reset();
}

//give the apple a random position
const appleMove = () => {
  apple.x = Math.floor(Math.random() * boardSize);
  apple.y = Math.floor(Math.random() * boardSize);
}

//the keys for the game w,a,s,d for directions
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
    default:
  }
}


//this will reset the whole game
const reset = () => {

  boardSize = 20;
  cellSize = Math.floor(canvas.width/boardSize); //rhis needs to be a whole number
  appleMove(); //make a new apple

  snake = {
    segmentList: [[boardSize/2,boardSize/2],[]],
    directionX: 0,
    directionY: -1
  }

  tempSegment = null;
  end=false;
  score=0;

  //update and draw the game
  draw();
}


const draw = () => {
  if(end==true){return}
  frame+=1;

  //only update the game every 8 frams to make it slower.
  if(frame>8){
    frame=0

    update();
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    drawSnake();
    ctx.fillStyle = '#d02';
    ctx.fillRect(apple.x * cellSize, apple.y * cellSize, cellSize, cellSize);
  }

  //this will re run this function and make a game loop
  requestAnimationFrame(draw);
}

const drawSnake = () => {
var g = 250;
for(let segment of snake.segmentList){
ctx.fillStyle = '#2F2';
if(end==true){
ctx.fillStyle = '#d49';
}
ctx.fillRect(segment[0]*cellSize,segment[1]*cellSize,cellSize,cellSize);
}
}
const update = () => {
if(end){return};
var x = snake.segmentList[0][0]+=snake.directionX;
var y = snake.segmentList[0][1]+=snake.directionY;
snake.segmentList.unshift([x,y]);
snake.segmentList.pop();
if (snake.segmentList[0][0]==apple.x && snake.segmentList[0][1]==apple.y){
tempSegment = {};
tempSegment.x = apple.x;
tempSegment.y = apple.y;
snake.segmentList.push([tempSegment.x,tempSegment.y]);
appleMove();
score+=1
}
checkSnakeCollsion();
}
const checkSnakeCollsion = () => {
let head = {x: snake.segmentList[0][0],y: snake.segmentList[0][1]};
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
