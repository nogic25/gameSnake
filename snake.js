const canvas = document.getElementById('screen'),
    context = canvas.getContext('2d');


const
    map = {
        size: 24,
        width: 25,
        height: 15
    },
    snake = {},
    apple = {
        x: 15,
        y: 10

    };
createSnake(snake);
//background
canvas.width = map.width * map.size;
canvas.height = map.height * map.size;

context.font = '18px Verdana';

function drawBackground() {
    context.fillStyle = '#333';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawApple() {
    context.fillStyle = 'red';
    //context.fillRect(apple.x * map.size, apple.y * map.size, map.size, map.size);
    context.beginPath();
    context.arc((apple.x + .5) * map.size, (apple.y + .5) * map.size, map.size / 2, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

function drawSnake() {
    context.fillStyle = 'lime';
    snake.body.forEach((chank,index) =>{
        context.fillStyle=index===0 ? 'yellow' :'lime';
        context.fillRect(chank.x * map.size+Math.sin(index+chank.x+chank.y), chank.y * map.size+Math.cos(index+chank.x+chank.y), map.size, map.size);
        
});
}
function drawScore() {
    context.fillStyle = '#fff';
    context.fillText('Score: ' + snake.score, 10, 24);
}

function draw() {
    drawBackground();
    drawScore();
    drawSnake();
    drawApple();
 
}

function createSnake(snake) {
    snake.x = 5;
    snake.y = 5;
    snake.vx = 0;
    snake.vy = 0;
    snake.tail = 5;
    snake.body = [];
    snake.score = 0;
}

function nextPositionApple(snake) {
    do {
        apple.x = Math.floor(Math.random() * map.width - 0.001);//0...2
        apple.y = Math.floor(Math.random() * map.height - 0.001);//0...2
    } while (snake.body.find(chank => apple.x === chank.x && apple.y === chank.y));
}

function move(oops){
    snake.x += snake.vx;
    snake.y += snake.vy;

    if (snake.x > map.width - 1) snake.x = 0;
    if (snake.x < 0) snake.x = map.width - 1;
    if (snake.y > map.height - 1) snake.y = 0;
    if (snake.y < 0) snake.y = map.height - 1;
    oops(snake);
    snake.body.unshift({
        x: snake.x,
        y: snake.y
    });

    while (snake.body.length > snake.tail) {
        snake.body.pop();
    }
}
function isEatSelf(snake){
    const oops = snake.body.find(chank => snake.x === chank.x && snake.y === chank.y);
    if (oops) {
        //Opps !
      createSnake(snake);
    }
}

function isSnakeEatsApple(){
    if (snake.x === apple.x && snake.y === apple.y) {
        //eat an apple
        snake.tail += 1;
        snake.score += 10;
        nextPositionApple(snake);
    }
}

function update() {
    move(isEatSelf);
    isSnakeEatsApple();
    draw();
}
draw();
setInterval(update, 1000 / 5);




//switch case should be used 
document.body.addEventListener('keydown', function ({ code }) {
    if (code === 'ArrowRight') {
        snake.vx = 1;
        snake.vy = 0;
    } else if (code === 'ArrowLeft') {
        snake.vx = -1;
        snake.vy = 0;
    } else if (code === 'ArrowUp') {
        snake.vx = 0;
        snake.vy = -1;

    } else if (code === 'ArrowDown') {
        snake.vx = 0;
        snake.vy = 1;
    }
})

