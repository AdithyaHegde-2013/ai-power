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
    document.getElementById('startButton').addEventListener('click', startGame);
    gameLoop();
}

function keyDown(e) {
    keys[e.code] = true;
}
function keyUp(e) {
    keys[e.code] = false;
}

function startGame() {
    asteroids.length = 0;
    player.score = 0;
    player.level = 1;
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
    updateAsteroids();
    checkCollisions();
}

// Draw everything on canvas
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(26, 26, 46, 0.1)';
    context.fillRect(0, 0, canvas.width, canvas.height);
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

// Update asteroid positions
function updateAsteroids() {
    for (let i = asteroids.length - 1; i >= 0; i--) {
        asteroids[i].y += settings.gravity * asteroids[i].size;
        // Remove asteroids that fall off screen
        if (asteroids[i].y > canvas.height + asteroids[i].size) {
            asteroids.splice(i, 1);
            player.score += 10;
        }
    }
}

// Draw asteroids
function drawAsteroids() {
    context.fillStyle = 'gray';
    asteroids.forEach(asteroid => {
        context.beginPath();
        context.arc(asteroid.x, asteroid.y, asteroid.size, 0, Math.PI * 2);
        context.fill();
    });
}

// Check for collisions - FIXED
function checkCollisions() {
    asteroids.forEach((asteroid, index) => {
        const playerCenterX = player.x + player.width / 2;
        const playerCenterY = player.y + player.height / 2;
        
        const dx = asteroid.x - playerCenterX;
        const dy = asteroid.y - playerCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const collisionDistance = asteroid.size + player.width / 2;
        
        if (distance < collisionDistance) {
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
    context.fillText('Level: ' + player.level, 10, 50);
}

window.onload = init;