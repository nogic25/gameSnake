const canvas = document.getElementById('screen'),
    context = canvas.getContext('2d');

const
    map = {
        size: 24,
        width: 25,
        height: 15
    },
    snake = {
        x: 5,
        y: 5,
        vx: 0,
        vy: 0,
        tail: 5,
        body:[]
    },
    apple = {
        x: 15,
        y: 10

    };


canvas.width = map.width * map.size;
canvas.height = map.height * map.size;

function draw() {
    snake.x += snake.vx;
    snake.y += snake.vy;

    if (snake.x > map.width - 1) snake.x = 0;
    if (snake.x < 0) snake.x = map.width - 1;
    if (snake.y > map.height - 1) snake.y = 0;
    if (snake.y < 0) snake.y = map.height - 1;

    context.fillStyle = '#333';
    context.fillRect(0, 0, canvas.width, canvas.height);

    //snake
    context.fillStyle = 'lime';
    for (let i=0;i<snake.body.length;i++){
        const pos =snake.body[i];
    context.fillRect(pos.x * map.size, pos.y * map.size, map.size, map.size);}

// all values of shake's head
    snake.body.push({
        x: snake.x,
        y: snake.y
    });

    while (snake.body.length>snake.tail){
     snake.body.shift();
    }

    //apple
    context.fillStyle = 'red';
    context.fillRect(apple.x * map.size, apple.y * map.size, map.size, map.size);

}
setInterval(draw, 1000 / 5);

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

