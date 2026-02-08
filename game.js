// Asteroid Defender Game

// Variables
let canvas, context;
const asteroids = [];
const player = {
    x: 400,
    y: 550,
    width: 50,
    height: 50,
    color: 'white',
    score: 0,
    level: 1,
};
const settings = {
    gravity: 0.05,
    asteroidSpawnRate: 100,
    difficultyIncrease: 50,
};
let keys = {};  

// Initialize the game
function init() {
    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    gameLoop();
}

function keyDown(e) {
    keys[e.code] = true;
}
function keyUp(e) {
    keys[e.code] = false;
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Update the game state
function update() {
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= 5;
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += 5;
    }
    spawnAsteroids();
    checkCollisions();
}

// Draw everything on canvas
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawAsteroids();
    drawScore();
}

function drawPlayer() {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
}

// Spawn asteroids
function spawnAsteroids() {
    if (Math.random() < 1 / settings.asteroidSpawnRate) {
        const size = Math.random() * (50 - 20) + 20;
        const x = Math.random() * canvas.width;
        const y = 0;
        asteroids.push({ x, y, size });
    }
}

// Draw asteroids
function drawAsteroids() {
    context.fillStyle = 'gray';
    asteroids.forEach(asteroid => {
        context.beginPath();
        context.arc(asteroid.x, asteroid.y, asteroid.size, 0, Math.PI * 2);
        context.fill();
        asteroid.y += settings.gravity * asteroid.size;
    });
}

// Check for collisions
function checkCollisions() {
    asteroids.forEach((asteroid, index) => {
        if (asteroid.y + asteroid.size > player.y &&
            asteroid.x > player.x &&
            asteroid.x < player.x + player.width) {
            gameOver();
        }
    });
}

function gameOver() {
    alert('Game Over! Your Score: ' + player.score);
    document.location.reload();
}

function drawScore() {
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText('Score: ' + player.score, 10, 20);
}

window.onload = init;