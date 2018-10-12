// Player class
const avatars = [
        "images/char-boy.png",
        "images/char-cat-girl.png",
        "images/char-horn-girl.png",
        "images/char-horn-girl.png",
        "images/char-pink-girl.png"
    ]
    /*Array.prototype.randomElement = function () {
        return this[Math.floor(Math.random() * this.length)]
    }

    let avatar = avatars.randomElement();*/

//let avatar = avatars[Math.floor(Math.random()* avatars.length)];

const totalAvatars = avatars.length;
let avatarsIndex = Math.floor((Math.random() * 10) + 1) % totalAvatars;
let avatar = avatars[avatarsIndex];

let Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = avatar;
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    // doesn't allow player from moving outside canvas boundaries
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    // if player reaches top of canvas his position resets
    if (this.y < 0) {
        this.x = 100;
        this.y = 380;
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//measure of how much distance he can travel... extra 50 and 30 because of the the ground sprite sizes
//so that when a direction key is pressed he covers perfectly 1 square. either horizontally or vertically 
Player.prototype.handleInput = function(inputKey) {
    switch (inputKey) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};



// Enemies our player must avoid
let Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    maxspeed = 500;
    minspeed = 50;
    this.speed = Math.floor(Math.random() * maxspeed) + minspeed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //condition that resets bug's postion when he crosses the canvas
    if (this.x > 480) {
        this.speed = Math.floor(Math.random() * maxspeed) + minspeed;
        this.x = -50;
    }

    // Check for collision between player and enemies
    //if successful return player to initial position
    if (player.x < this.x + 60 && player.x + 37 > this.x &&
        player.y < this.y + 25 && 30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
    new Enemy(0, 63),
    new Enemy(-50, 146),
    new Enemy(-20, 229)
];
// Place the player object in a variable called player
let player = new Player(200, 380, 50);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});