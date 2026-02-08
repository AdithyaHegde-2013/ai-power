// Asteroid Defender Game Implementation

// Game setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables
let player;
let asteroids = [];
let score = 0;
let gameOver = false;

// Game Mechanics
function setup() {
    player = new Player();
    spawnAsteroids();
    gameLoop();
}

// Class for player
class Player {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.speed = 5;
        this.score = 0;
        this.initControls();
    }

    initControls() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp': this.y -= this.speed; break;
                case 'ArrowDown': this.y += this.speed; break;
                case 'ArrowLeft': this.x -= this.speed; break;
                case 'ArrowRight': this.x += this.speed; break;
            }
        });
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Asteroid class
class Asteroid {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 50;
    }

    draw() {
        ctx.fillStyle = 'gray';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function spawnAsteroids() {
    for (let i = 0; i < 10; i++) {
        asteroids.push(new Asteroid());
    }
}

function gameLoop() {
    if (gameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();

    asteroids.forEach(asteroid => {
        asteroid.draw();
        // Collision Detection Logic
        if (detectCollision(player, asteroid)) {
            gameOver = true;
            alert('Game Over! Your score: ' + player.score);
        }
    });

    requestAnimationFrame(gameLoop);
}

function detectCollision(player, asteroid) {
    return player.x < asteroid.x + asteroid.size &&
           player.x + player.width > asteroid.x &&
           player.y < asteroid.y + asteroid.size &&
           player.y + player.height > asteroid.y;
}

setup();