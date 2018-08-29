// Strict mode prevents errors or poorly thought out code
"use strict";

// Enemy Constructor
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.height = 50;
    this.width = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Checks to see if enemy is off page,
    // If off page, reset position of bug
    if (this.x > 500) {
        this.x = 0;
    }

    this.checkCollisions(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checks if player and enemy collide
Enemy.prototype.checkCollisions = function(player) {
    if (
        player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y
    ) {
        player.resetPlayer();
    }
};

// Randomizes speed for enemy
Enemy.prototype.randomSpeed = function(min, max) {
    return Math.random() * (max - min) + min;
};

// Player Constructor
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-pink-girl.png';
    this.height = 50;
    this.width = 50;
};

Player.prototype.update = function(dt) {
    //Update player position
    //Check if player reaches final destination - if so, alert win
    if (this.y < 40) {
        alert('Hey You WON!!!');
        this.resetPlayer();
        allEnemies.forEach(function(enemy) {
            enemy.speed = Enemy.prototype.randomSpeed(50, 200);
        });
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles keybaord events and sets boundaries for player
Player.prototype.handleInput = function(arrowKey) {
    switch (arrowKey) {
        case 'left':
            if (this.x > 0) {
                this.x = this.x - 50;
            }
            break;
        case 'up':
            if (this.y > -10) {
                this.y = this.y - 50;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x = this.x + 50;
            }
            break;
        case 'down':
            if (this.y < 440) {
                this.y = this.y + 50;
            }
            break;
    }
};

Player.prototype.resetPlayer = function() {
    //Brings player back to specific coordinates if there is a collision
    this.x = 200;
    this.y = 390;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(0, 145, Enemy.prototype.randomSpeed(50, 200)); //bottom
var enemy2 = new Enemy(0, 225, Enemy.prototype.randomSpeed(50, 200));
var enemy3 = new Enemy(0, 310, Enemy.prototype.randomSpeed(50, 200)); //top

var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

// Place the player object in a variable called player
var player = new Player(200, 390, 10);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});