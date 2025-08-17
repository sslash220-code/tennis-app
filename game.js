class TennisGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreBoard = document.getElementById('current-score');
        this.bestScoreBoard = document.getElementById('best-score');
        this.gameOverlay = document.getElementById('gameOverlay');
        this.startScreen = document.getElementById('startScreen');
        this.finalScore = document.getElementById('final-score');
        
        // Game state
        this.gameRunning = false;
        this.score = 0;
        this.bestScore = localStorage.getItem('tennisBestScore') || 0;
        this.bestScoreBoard.textContent = this.bestScore;
        
        // Game objects
        this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 100,
            radius: 20,
            velocityY: 0,
            velocityX: 0,
            gravity: 0.8,
            bounce: 0.7,
            friction: 0.98
        };
        
        this.racquet = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 50,
            width: 80,
            height: 20,
            speed: 8,
            targetX: this.canvas.width / 2
        };
        
        // Touch/mouse handling
        this.touchStartX = 0;
        this.isTouching = false;
        
        this.setupEventListeners();
        this.resizeCanvas();
        this.showStartScreen();
    }
    
    setupEventListeners() {
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleTouchStart(e);
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleTouchMove(e);
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.handleTouchEnd(e);
        });
        
        // Mouse events for desktop
        this.canvas.addEventListener('mousedown', (e) => {
            this.handleMouseDown(e);
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
        
        // Button events
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartGame();
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
    
    handleTouchStart(e) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.touchStartX = touch.clientX - rect.left;
        this.isTouching = true;
        this.racquet.targetX = this.touchStartX;
    }
    
    handleTouchMove(e) {
        if (!this.isTouching) return;
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.racquet.targetX = touch.clientX - rect.left;
    }
    
    handleTouchEnd(e) {
        this.isTouching = false;
    }
    
    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.racquet.targetX = e.clientX - rect.left;
    }
    
    handleMouseMove(e) {
        if (e.buttons === 1) { // Left mouse button pressed
            const rect = this.canvas.getBoundingClientRect();
            this.racquet.targetX = e.clientX - rect.left;
        }
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Adjust game objects for new canvas size
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height - 100;
        this.racquet.x = this.canvas.width / 2;
        this.racquet.y = this.canvas.height - 50;
    }
    
    showStartScreen() {
        this.startScreen.classList.remove('hidden');
        this.gameOverlay.classList.add('hidden');
    }
    
    startGame() {
        this.startScreen.classList.add('hidden');
        this.gameOverlay.classList.add('hidden');
        this.gameRunning = true;
        this.score = 0;
        this.scoreBoard.textContent = this.score;
        
        // Reset ball and racquet positions
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height - 100;
        this.ball.velocityY = 0;
        this.ball.velocityX = 0;
        this.racquet.x = this.canvas.width / 2;
        this.racquet.y = this.canvas.height - 50;
        
        this.gameLoop();
    }
    
    gameOver() {
        this.gameRunning = false;
        this.finalScore.textContent = this.score;
        
        // Update best score
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.bestScoreBoard.textContent = this.bestScore;
            localStorage.setItem('tennisBestScore', this.bestScore);
        }
        
        this.gameOverlay.classList.remove('hidden');
    }
    
    restartGame() {
        this.startGame();
    }
    
    update() {
        if (!this.gameRunning) return;
        
        // Update ball physics
        this.ball.velocityY += this.ball.gravity;
        this.ball.y += this.ball.velocityY;
        this.ball.x += this.ball.velocityX;
        this.ball.velocityX *= this.ball.friction;
        
        // Ball boundaries
        if (this.ball.x - this.ball.radius < 0) {
            this.ball.x = this.ball.radius;
            this.ball.velocityX *= -0.8;
        }
        if (this.ball.x + this.ball.radius > this.canvas.width) {
            this.ball.x = this.canvas.width - this.ball.radius;
            this.ball.velocityX *= -0.8;
        }
        
        // Ball hits bottom - game over
        if (this.ball.y + this.ball.radius > this.canvas.height) {
            this.gameOver();
            return;
        }
        
        // Ball hits top
        if (this.ball.y - this.ball.radius < 0) {
            this.ball.y = this.ball.radius;
            this.ball.velocityY *= -this.ball.bounce;
        }
        
        // Update racquet position
        const dx = this.racquet.targetX - this.racquet.x;
        this.racquet.x += dx * 0.1;
        
        // Keep racquet within bounds
        this.racquet.x = Math.max(this.racquet.width / 2, 
                                 Math.min(this.canvas.width - this.racquet.width / 2, this.racquet.x));
        
        // Check collision between ball and racquet
        this.checkCollision();
    }
    
    checkCollision() {
        const ballBottom = this.ball.y + this.ball.radius;
        const ballTop = this.ball.y - this.ball.radius;
        const ballLeft = this.ball.x - this.ball.radius;
        const ballRight = this.ball.x + this.ball.radius;
        
        const racquetTop = this.racquet.y;
        const racquetBottom = this.racquet.y + this.racquet.height;
        const racquetLeft = this.racquet.x - this.racquet.width / 2;
        const racquetRight = this.racquet.x + this.racquet.width / 2;
        
        if (ballBottom >= racquetTop && ballTop <= racquetBottom &&
            ballRight >= racquetLeft && ballLeft <= racquetRight) {
            
            // Ball hit racquet
            this.ball.y = racquetTop - this.ball.radius;
            this.ball.velocityY = -15; // Bounce up
            
            // Add horizontal velocity based on where ball hit racquet
            const hitPosition = (this.ball.x - this.racquet.x) / (this.racquet.width / 2);
            this.ball.velocityX = hitPosition * 8;
            
            // Increase score
            this.score++;
            this.scoreBoard.textContent = this.score;
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.5, '#98FB98');
        gradient.addColorStop(1, '#FFB6C1');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw tennis ball
        this.drawTennisBall();
        
        // Draw racquet
        this.drawRacquet();
    }
    
    drawTennisBall() {
        // Ball shadow
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x + 3, this.ball.y + 3, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fill();
        
        // Ball body
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = '#FFD700'; // Bright yellow
        this.ctx.fill();
        
        // Ball outline
        this.ctx.strokeStyle = '#FFA500';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Ball seams (figure-8 pattern)
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius * 0.7, 0, Math.PI);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius * 0.7, Math.PI, Math.PI * 2);
        this.ctx.stroke();
    }
    
    drawRacquet() {
        // Racquet shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(this.racquet.x - this.racquet.width / 2 + 3, 
                         this.racquet.y + 3, 
                         this.racquet.width, this.racquet.height);
        
        // Racquet frame
        this.ctx.fillStyle = '#FFD700'; // Bright yellow
        this.ctx.fillRect(this.racquet.x - this.racquet.width / 2, 
                         this.racquet.y, 
                         this.racquet.width, this.racquet.height);
        
        // Racquet outline
        this.ctx.strokeStyle = '#FFA500';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(this.racquet.x - this.racquet.width / 2, 
                           this.racquet.y, 
                           this.racquet.width, this.racquet.height);
        
        // Racquet handle
        this.ctx.fillStyle = '#FF6347'; // Tomato red
        this.ctx.fillRect(this.racquet.x - 8, 
                         this.racquet.y + this.racquet.height, 
                         16, 30);
        
        // Racquet strings
        this.ctx.strokeStyle = '#FFD700';
        this.ctx.lineWidth = 1;
        
        // Vertical strings
        for (let i = 0; i <= 8; i++) {
            const x = this.racquet.x - this.racquet.width / 2 + (i * this.racquet.width / 8);
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.racquet.y);
            this.ctx.lineTo(x, this.racquet.y + this.racquet.height);
            this.ctx.stroke();
        }
        
        // Horizontal strings
        for (let i = 0; i <= 4; i++) {
            const y = this.racquet.y + (i * this.racquet.height / 4);
            this.ctx.beginPath();
            this.ctx.moveTo(this.racquet.x - this.racquet.width / 2, y);
            this.ctx.lineTo(this.racquet.x + this.racquet.width / 2, y);
            this.ctx.stroke();
        }
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        this.update();
        this.draw();
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new TennisGame();
});



