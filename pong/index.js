var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 17)
};

var canvas = document.createElement("canvas");
var width = 550;
var height = 690;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var player = new Player();
var computer = new Computer();
var ball = new Ball(width/2, height/2);
window.gameOver = false;
window.timer = 60 * 30;
window.score = 0;
window.rally = 0;

var keysDown = {};

var render = function () {
context.fillStyle = "#2A2E35";
context.fillRect(0, 0, width, height);
player.render();
computer.render();
ball.render();
};

var update = function () {
player.update();
computer.update(ball);
ball.update(player.paddle, computer.paddle);
}; 

var step = function () {
    if(!window.gameOver){
        update();
        render();
        timer--;

        if(window.timer < 0 ){
            window.gameOver = true;
            if(window.rally > window.score){
                window.score = window.rally;
            }
            document.getElementById("gameOver").style.visibility = "visible"
            document.getElementById("finalScoreModal").innerHTML = "Final Score: " + window.score;
        }
    }
animate(step);
};

function Paddle(x, y, width, height) {
this.x = x;
this.y = y;
this.width = width;
this.height = height;
this.x_speed = 0;
this.y_speed = 0;
}

Paddle.prototype.render = function () {
context.fillStyle = "#00C5B7";
context.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function (x, y) {
this.x += x;
this.y += y;
this.x_speed = x;
this.y_speed = y;
if (this.x < 0) {
    this.x = 0;
    this.x_speed = 0;
} else if (this.x + this.width > width) {
    this.x = width - this.width;
    this.x_speed = 0;
}
};

function Computer() {
this.paddle = new Paddle(width/2, 15, 50, 10);
}

Computer.prototype.render = function () {
this.paddle.render();
};

Computer.prototype.update = function (ball) {
var x_pos = ball.x - (Math.random() < 0 ? -1 : 1) * 5
var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
if (diff < 0 && diff < -4) {
    diff = -5;
} else if (diff > 0 && diff > 4) {
    diff = 5;
}
this.paddle.move(diff, 0);
if (this.paddle.x < 0) {
    this.paddle.x = 0;
} else if (this.paddle.x + this.paddle.width > width) {
    this.paddle.x = width - this.paddle.width;
}
};

function Player() {
this.paddle = new Paddle(width/2, height - 15, 50, 10);
}

Player.prototype.render = function () {
this.paddle.render();
};

Player.prototype.update = function () {
for (var key in keysDown) {
    var value = Number(key);
    if (value == 65) {
        this.paddle.move(-8, 0);
    } else if (value == 68) {
        this.paddle.move(8, 0);
    } else {
        this.paddle.move(0, 0);
    }
}
};

function Ball(x, y) {
this.x = x;
this.y = y;
this.x_speed = 0;
this.y_speed = 5;
}

Ball.prototype.render = function () {
context.beginPath();
context.arc(this.x, this.y, 5, 2 * Math.PI, false);
context.fillStyle = "#FF757C";
context.fill();
};

Ball.prototype.update = function (paddle1, paddle2) {
this.x += this.x_speed;
this.y += this.y_speed;
var top_x = this.x - 5;
var top_y = this.y - 5;
var bottom_x = this.x + 5;
var bottom_y = this.y + 5;

if (this.x - 5 < 0) {
    this.x = 5;
    this.x_speed = -this.x_speed;
} else if (this.x + 5 > width) {
    this.x = width - 5;
    this.x_speed = -this.x_speed;
}

if (this.y < 0 || this.y > height) {
    if(window.rally >= window.score){
        window.score = window.rally;
        document.getElementById('score').innerHTML = `Score: ` + window.score; 
    }

    window.rally = 0;
    document.getElementById('rally').innerHTML = `Current Rally: ` + window.rally;

    this.x_speed = 0;
    this.y_speed = 3;
    this.x = width/2;
    this.y = height/2;
    
   
}

if (top_y > 300) {
    if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
        this.y_speed = -5;
        this.x_speed += (paddle1.x_speed / 2);
        this.y += this.y_speed;
        window.rally++;
        document.getElementById("rally").innerHTML = `Current Rally: ${window.rally}`;
    }
} else {
    if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
        this.y_speed = 5;
        this.x_speed += (paddle2.x_speed / 2);
        this.y += this.y_speed;
        window.rally++;
        document.getElementById("rally").innerHTML = `Current Rally: ${window.rally}`;
    }
}
};

document.getElementById("gameArea").appendChild(canvas);
animate(step);

window.addEventListener("keydown", function (event) {
keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
delete keysDown[event.keyCode];
});
