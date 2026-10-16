const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const finalScore = document.getElementById("finalScore");

let score = 0;
let highScore = localStorage.getItem("neonHighScore") || 0;

highScoreText.textContent = highScore;

let gameRunning = false;

let keys = {};

let enemies = [];
let particles = [];

let orb = {};

let enemyTimer = 0;

let gameSpeed = 2;

const player = {
    x: 100,
    y: 250,

    size: 22,

    speed: 5
};


// Canvas size
function resizeCanvas() {

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// Keyboard controls
document.addEventListener("keydown", function(event) {

    keys[event.key] = true;

});

document.addEventListener("keyup", function(event) {

    keys[event.key] = false;

});


// Start game
startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", startGame);


function startGame() {

    score = 0;

    gameSpeed = 2;

    enemies = [];

    particles = [];

    player.x = 100;
    player.y = canvas.height / 2;

    createOrb();

    scoreText.textContent = score;

    gameRunning = true;

    startScreen.classList.add("hidden");

    gameOverScreen.classList.add("hidden");

    requestAnimationFrame(gameLoop);

}


// Create energy orb
function createOrb() {

    orb = {

        x: Math.random() * (canvas.width - 80) + 40,

        y: Math.random() * (canvas.height - 80) + 40,

        size: 10

    };

}


// Create enemy
function createEnemy() {

    const size = Math.random() * 20 + 18;

    enemies.push({

        x: canvas.width + size,

        y: Math.random() * (canvas.height - size * 2) + size,

        size: size,

        speed: gameSpeed + Math.random() * 2

    });

}


// Player movement
function updatePlayer() {

    if (keys["ArrowUp"] || keys["w"] || keys["W"]) {

        player.y -= player.speed;

    }

    if (keys["ArrowDown"] || keys["s"] || keys["S"]) {

        player.y += player.speed;

    }

    if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {

        player.x -= player.speed;

    }

    if (keys["ArrowRight"] || keys["d"] || keys["D"]) {

        player.x += player.speed;

    }


    // Keep player inside canvas

    player.x = Math.max(
        player.size,
        Math.min(canvas.width - player.size, player.x)
    );

    player.y = Math.max(
        player.size,
        Math.min(canvas.height - player.size, player.y)
    );

}


// Update enemies
function updateEnemies() {

    for (let i = enemies.length - 1; i >= 0; i--) {

        const enemy = enemies[i];

        enemy.x -= enemy.speed;


        // Remove enemy when it leaves screen

        if (enemy.x < -enemy.size) {

            enemies.splice(i, 1);

            continue;

        }


        // Collision with player

        if (collision(player, enemy)) {

            gameOver();

            return;

        }

    }

}


// Collision detection
function collision(a, b) {

    const distanceX = a.x - b.x;

    const distanceY = a.y - b.y;

    const distance = Math.sqrt(
        distanceX * distanceX +
        distanceY * distanceY
    );

    return distance < a.size + b.size;

}


// Collect orb
function collectOrb() {

    const dx = player.x - orb.x;

    const dy = player.y - orb.y;

    const distance = Math.sqrt(dx * dx + dy * dy);


    if (distance < player.size + orb.size) {

        score += 10;

        scoreText.textContent = score;

        createParticles(orb.x, orb.y);

        createOrb();


        // Increase difficulty

        if (score % 50 === 0) {

            gameSpeed += 0.4;

        }

    }

}


// Particles
function createParticles(x, y) {

    for (let i = 0; i < 15; i++) {

        particles.push({

            x: x,

            y: y,

            dx: (Math.random() - 0.5) * 5,

            dy: (Math.random() - 0.5) * 5,

            life: 30

        });

    }

}


function updateParticles() {

    for (let i = particles.length - 1; i >= 0; i--) {

        const p = particles[i];

        p.x += p.dx;

        p.y += p.dy;

        p.life--;

        if (p.life <= 0) {

            particles.splice(i, 1);

        }

    }

}


// Draw background
function drawBackground() {

    ctx.fillStyle = "#020008";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Neon grid

    ctx.strokeStyle = "rgba(0,255,255,0.12)";

    ctx.lineWidth = 1;


    for (let x = 0; x < canvas.width; x += 40) {

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, canvas.height);

        ctx.stroke();

    }


    for (let y = 0; y < canvas.height; y += 40) {

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(canvas.width, y);

        ctx.stroke();

    }

}


// Draw player
function drawPlayer() {

    ctx.save();

    ctx.shadowBlur = 25;

    ctx.shadowColor = "#00ffff";

    ctx.fillStyle = "#00ffff";

    ctx.beginPath();

    ctx.moveTo(
        player.x + player.size,
        player.y
    );

    ctx.lineTo(
        player.x - player.size,
        player.y - player.size
    );

    ctx.lineTo(
        player.x - player.size / 2,
        player.y
    );

    ctx.lineTo(
        player.x - player.size,
        player.y + player.size
    );

    ctx.closePath();

    ctx.fill();

    ctx.restore();

}


// Draw enemies
function drawEnemies() {

    enemies.forEach(enemy => {

        ctx.save();

        ctx.shadowBlur = 25;

        ctx.shadowColor = "#ff0055";

        ctx.fillStyle = "#ff0055";

        ctx.beginPath();

        ctx.arc(
            enemy.x,
            enemy.y,
            enemy.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    });

}


// Draw orb
function drawOrb() {

    ctx.save();

    ctx.shadowBlur = 30;

    ctx.shadowColor = "#00ff88";

    ctx.fillStyle = "#00ff88";

    ctx.beginPath();

    ctx.arc(
        orb.x,
        orb.y,
        orb.size,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

}


// Draw particles
function drawParticles() {

    particles.forEach(p => {

        ctx.fillStyle = "#00ff88";

        ctx.globalAlpha = p.life / 30;

        ctx.fillRect(
            p.x,
            p.y,
            4,
            4
        );

    });

    ctx.globalAlpha = 1;

}


// Main game loop
function gameLoop() {

    if (!gameRunning) return;


    drawBackground();


    updatePlayer();

    updateEnemies();

    collectOrb();

    updateParticles();


    drawOrb();

    drawPlayer();

    drawEnemies();

    drawParticles();


    enemyTimer++;


    // Spawn enemies

    if (enemyTimer > 60) {

        createEnemy();

        enemyTimer = 0;

    }


    requestAnimationFrame(gameLoop);

}


// Game over
function gameOver() {

    gameRunning = false;

    finalScore.textContent = score;

    gameOverScreen.classList.remove("hidden");


    if (score > highScore) {

        highScore = score;

        localStorage.setItem(
            "neonHighScore",
            highScore
        );

        highScoreText.textContent = highScore;

    }

}