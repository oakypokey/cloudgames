/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();


// ###################################################################
// shims
//
// ###################################################################
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

(function() {
  if (!window.performance.now) {
    window.performance.now = (!Date.now) ? function() { return new Date().getTime(); } : 
      function() { return Date.now(); }
  }
})();

// ###################################################################
// Constants
//
// ###################################################################
var IS_CHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 640;
var SPRITE_SHEET_SRC = 'data:image/png;base64,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'
var LEFT_KEY = 65;
var RIGHT_KEY = 68;
var SHOOT_KEY = 49;
var TEXT_BLINK_FREQ = 500;
var PLAYER_CLIP_RECT = { x: 0, y: 204, w: 62, h: 32 };
var ALIEN_BOTTOM_ROW = [ { x: 0, y: 0, w: 51, h: 34 }, { x: 0, y: 102, w: 51, h: 34 }];
var ALIEN_MIDDLE_ROW = [ { x: 0, y: 137, w: 50, h: 33 }, { x: 0, y: 170, w: 50, h: 34 }];
var ALIEN_TOP_ROW = [ { x: 0, y: 68, w: 50, h: 32 }, { x: 0, y: 34, w: 50, h: 32 }];
var ALIEN_X_MARGIN = 40;
var ALIEN_SQUAD_WIDTH = 11 * ALIEN_X_MARGIN;



// ###################################################################
// Utility functions & classes
//
// ###################################################################
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function valueInRange(value, min, max) {
  return (value <= max) && (value >= min);
}
 
function checkRectCollision(A, B) {
  var xOverlap = valueInRange(A.x, B.x, B.x + B.w) ||
  valueInRange(B.x, A.x, A.x + A.w);
 
  var yOverlap = valueInRange(A.y, B.y, B.y + B.h) ||
  valueInRange(B.y, A.y, A.y + A.h); 
  return xOverlap && yOverlap;
}

var Point2D = Class.extend({
  init: function(x, y) {
    this.x = (typeof x === 'undefined') ? 0 : x;
    this.y = (typeof y === 'undefined') ? 0 : y;
  },
  
  set: function(x, y) {
    this.x = x;
    this.y = y;
  }
});

var Rect = Class.extend({
  init: function(x, y, w, h) {
    this.x = (typeof x === 'undefined') ? 0 : x;
    this.y = (typeof y === 'undefined') ? 0 : y;
    this.w = (typeof w === 'undefined') ? 0 : w;
    this.h = (typeof h === 'undefined') ? 0 : h;
  },
  
  set: function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
});



// ###################################################################
// Globals
//
// ###################################################################
var canvas = null;
var ctx = null;
var spriteSheetImg = null;
var bulletImg = null;
var keyStates = null;
var prevKeyStates = null;
var lastTime = 0;
var player = null;
var aliens = [];
var particleManager = null;
var updateAlienLogic = false;
var alienDirection = -1;
var alienYDown = 0;
var alienCount = 0;
var wave = 30;
var hasGameStarted = false;



// ###################################################################
// Entities
//
// ###################################################################
var BaseSprite = Class.extend({
  init: function(img, x, y) {
    this.img = img;
    this.position = new Point2D(x, y);
    this.scale = new Point2D(1, 1);
    this.bounds = new Rect(x, y, this.img.width, this.img.height);
    this.doLogic = true;
  },
                           
  update: function(dt) { },
  
  _updateBounds: function() {
     this.bounds.set(this.position.x, this.position.y, ~~(0.5 + this.img.width * this.scale.x), ~~(0.5 + this.img.height * this.scale.y));
  },
  
  _drawImage: function() {
    ctx.drawImage(this.img, this.position.x, this.position.y);
  },
  
  draw: function(resized) {
    this._updateBounds();
    
    this._drawImage();
  }
});

var SheetSprite = BaseSprite.extend({
  init: function(sheetImg, clipRect, x, y) {
    this._super(sheetImg, x, y);
    this.clipRect = clipRect;
    this.bounds.set(x, y, this.clipRect.w, this.clipRect.h);
  },
  
  update: function(dt) {},
  
  _updateBounds: function() {
    var w = ~~(0.5 + this.clipRect.w * this.scale.x);
    var h = ~~(0.5 + this.clipRect.h * this.scale.y);
    this.bounds.set(this.position.x - w/2, this.position.y - h/2, w, h);
  },
  
  _drawImage: function() {
    ctx.save();
    ctx.transform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
    ctx.drawImage(this.img, this.clipRect.x, this.clipRect.y, this.clipRect.w, this.clipRect.h, ~~(0.5 + -this.clipRect.w*0.5), ~~(0.5 + -this.clipRect.h*0.5), this.clipRect.w, this.clipRect.h);
    ctx.restore();

  },
  
  draw: function(resized) {
    this._super(resized);
  }
});

var Player = SheetSprite.extend({
  init: function() {
    this._super(spriteSheetImg, PLAYER_CLIP_RECT, CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
    this.scale.set(0.85, 0.85);
    this.lives = 1;
    this.xVel = 0;
    this.bullets = [];
    this.bulletDelayAccumulator = 0;
    this.score = 0;
    window.score = 0
  },
  
  reset: function() {
    this.lives = 1;
    this.score = 0;
    window.score = 0;
    this.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
  },
  
  shoot: function() {
    var bullet = new Bullet(this.position.x, this.position.y - this.bounds.h / 2, 1, 500);
    this.bullets.push(bullet);
  },
  
  handleInput: function() {
    if (isKeyDown(LEFT_KEY)) {
      this.xVel = -175;
    } else if (isKeyDown(RIGHT_KEY)) {
      this.xVel = 175;
    } else this.xVel = 0;
    
    if (wasKeyPressed(SHOOT_KEY)) {
      if (this.bulletDelayAccumulator > 0.5) {
        this.shoot(); 
        this.bulletDelayAccumulator = 0;
      }
    }
  },
  
  updateBullets: function(dt) {
    for (var i = this.bullets.length - 1; i >= 0; i--) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.update(dt);
      } else {
        this.bullets.splice(i, 1);
        bullet = null;
      }
    }
  },
  
  update: function(dt) {
    // update time passed between shots
    this.bulletDelayAccumulator += dt;
    
    // apply x vel
    this.position.x += this.xVel * dt;
    
    // cap player position in screen bounds
    this.position.x = clamp(this.position.x, this.bounds.w/2, CANVAS_WIDTH - this.bounds.w/2);
    this.updateBullets(dt);
  },
  
  draw: function(resized) {
    this._super(resized);

    // draw bullets
    for (var i = 0, len = this.bullets.length; i < len; i++) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.draw(resized);
      }
    }
  }
});

var Bullet = BaseSprite.extend({
  init: function(x, y, direction, speed) {
    this._super(bulletImg, x, y);
    this.direction = direction;
    this.speed = speed;
    this.alive = true;
  },
  
  update: function(dt) {
    this.position.y -= (this.speed * this.direction) * dt;
    
    if (this.position.y < 0) {
      this.alive = false;
    }
  },
  
  draw: function(resized) {
    this._super(resized);
  }
});

var Enemy = SheetSprite.extend({
  init: function(clipRects, x, y) {
    this._super(spriteSheetImg, clipRects[0], x, y);
    this.clipRects = clipRects;
    this.scale.set(0.5, 0.5);
    this.alive = true;
    this.onFirstState = true;
    this.stepDelay = 1; // try 2 secs to start with...
    this.stepAccumulator = 0;
    this.doShoot - false;
    this.bullet = null;
  },
  
  toggleFrame: function() {
    this.onFirstState = !this.onFirstState;
    this.clipRect = (this.onFirstState) ? this.clipRects[0] : this.clipRects[1];
  },
  
  shoot: function() {
    this.bullet = new Bullet(this.position.x, this.position.y + this.bounds.w/2, -1, 50);
  },
  
  update: function(dt) {
    this.stepAccumulator += dt;
    
    if (this.stepAccumulator >= this.stepDelay) {
      if (this.position.x < this.bounds.w/2 + 20 && alienDirection < 0) {
      updateAlienLogic = true;
    } if (alienDirection === 1 && this.position.x > CANVAS_WIDTH - this.bounds.w/2 - 20) {
      updateAlienLogic = true;
    }
      if (this.position.y > CANVAS_WIDTH - 50) {
        reset();
      }
      
      var fireTest = Math.floor(Math.random() * (this.stepDelay + 1));
      if (getRandomArbitrary(0, 1000) <= 5 * (this.stepDelay + 1)) {
        this.doShoot = true;
      }
      this.position.x += 10 * alienDirection;
      this.toggleFrame();
      this.stepAccumulator = 0;
    }
    this.position.y += alienYDown;
    
    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.update(dt);  
    } else {
      this.bullet = null;
    }
  },
  
  draw: function(resized) {
    this._super(resized);
    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.draw(resized);
    }
  }
});

var ParticleExplosion = Class.extend({
  init: function() {
    this.particlePool = [];
    this.particles = [];
  },
  
  draw: function() {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var particle = this.particles[i];
      particle.moves++;
	    particle.x += particle.xunits;
		  particle.y += particle.yunits + (particle.gravity * particle.moves);
			particle.life--;
			
			if (particle.life <= 0 ) {
				if (this.particlePool.length < 100) {
					this.particlePool.push(this.particles.splice(i,1));
				} else {
					this.particles.splice(i,1);
				}
			} else {
				ctx.globalAlpha = (particle.life)/(particle.maxLife);
				ctx.fillStyle = particle.color;
				ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
				ctx.globalAlpha = 1;
			}
    }
  },
  
  createExplosion: function(x, y, color, number, width, height, spd, grav, lif) {
  for (var i =0;i < number;i++) {
			var angle = Math.floor(Math.random()*360);
			var speed = Math.floor(Math.random()*spd/2) + spd;	
			var life = Math.floor(Math.random()*lif)+lif/2;
			var radians = angle * Math.PI/ 180;
			var xunits = Math.cos(radians) * speed;
			var yunits = Math.sin(radians) * speed;
				
			if (this.particlePool.length > 0) {
				var tempParticle = this.particlePool.pop();
				tempParticle.x = x;
				tempParticle.y = y;
				tempParticle.xunits = xunits;
				tempParticle.yunits = yunits;
				tempParticle.life = life;
				tempParticle.color = color;
				tempParticle.width = width;
				tempParticle.height = height;
				tempParticle.gravity = grav;
				tempParticle.moves = 0;
				tempParticle.alpha = 1;
				tempParticle.maxLife = life;
				this.particles.push(tempParticle);
			} else {
				this.particles.push({x:x,y:y,xunits:xunits,yunits:yunits,life:life,color:color,width:width,height:height,gravity:grav,moves:0,alpha:1, maxLife:life});
			}	
	
		}
  }
});



// ###################################################################
// Initialization functions
//
// ###################################################################
function initCanvas() {
  // create our canvas and context
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  
  // turn off image smoothing
  setImageSmoothing(true);
  
  // create our main sprite sheet img
  spriteSheetImg = new Image();
  spriteSheetImg.src = SPRITE_SHEET_SRC;  
  preDrawImages();

  // add event listeners and initially resize
  window.addEventListener('resize', resize);
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
}

function preDrawImages() {
  var canvas = drawIntoCanvas(2, 8, function(ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });
    bulletImg = new Image();
    bulletImg.src = canvas.toDataURL();
}

function setImageSmoothing(value) {
  this.ctx['imageSmoothingEnabled'] = value;
  this.ctx['mozImageSmoothingEnabled'] = value;
  this.ctx['oImageSmoothingEnabled'] = value;
  this.ctx['webkitImageSmoothingEnabled'] = value;
  this.ctx['msImageSmoothingEnabled'] = value;
}

function initGame() {
  dirtyRects = [];
  aliens = [];
  player = new Player();
  particleManager = new ParticleExplosion();
  setupAlienFormation();  
  drawBottomHud();
}

function setupAlienFormation() {
  alienCount = 0;
  for (var i = 0, len = 5 * 11; i < len; i++) {
    var gridX = (i % 11);
    var gridY = Math.floor(i / 11);
    var clipRects;
    switch (gridY) {
      case 0: 
      case 1: clipRects = ALIEN_BOTTOM_ROW; break;
      case 2: 
      case 3: clipRects = ALIEN_MIDDLE_ROW; break;
      case 4: clipRects = ALIEN_TOP_ROW; break;
    }
    aliens.push(new Enemy(clipRects, (CANVAS_WIDTH/2 - ALIEN_SQUAD_WIDTH/2) + ALIEN_X_MARGIN/2 + gridX * ALIEN_X_MARGIN, CANVAS_HEIGHT/3.25 - gridY * 40));
    alienCount++;
  }
}

function reset() {
  player.reset()
  hasGameStarted = false;
  drawStartScreen();
  score = 0;
  
}

function init() {
  initCanvas();
  keyStates = [];
  prevKeyStates = [];
  resize();
}



// ###################################################################
// Helpful input functions
//
// ###################################################################
function isKeyDown(key) {
  return keyStates[key];
}

function wasKeyPressed(key) {
  return !prevKeyStates[key] && keyStates[key];
}


// ###################################################################
// Drawing & Update functions
//
// ###################################################################
function updateAliens(dt) {
  if (updateAlienLogic) {
    updateAlienLogic = false;
    alienDirection = -alienDirection;
    alienYDown = 25;
  }
  
  for (var i = aliens.length - 1; i >= 0; i--) {
    var alien = aliens[i];
    if (!alien.alive) {
      aliens.splice(i, 1);
      alien = null;
      alienCount--;
      if (alienCount < 1) {
        wave++;
        setupAlienFormation();
      }
      return;
    }
    
    alien.stepDelay = ((alienCount * 20) - (wave * 10)) / 1000;
    if (alien.stepDelay <= 0.05) {
      alien.stepDelay = 0.05;
    }
    alien.update(dt);
    
    if (alien.doShoot) {
      alien.doShoot = false;
      alien.shoot();
    }
  }
  alienYDown = 0;
}

function resolveBulletEnemyCollisions() {
  var bullets = player.bullets;
  
  for (var i = 0, len = bullets.length; i < len; i++) {
    var bullet = bullets[i];
    for (var j = 0, alen = aliens.length; j < alen; j++) {
      var alien = aliens[j];
      if (checkRectCollision(bullet.bounds, alien.bounds)) {
        alien.alive = bullet.alive = false;
        particleManager.createExplosion(alien.position.x, alien.position.y, 'white', 70, 5,5,3,.15,50);
        player.score += 25;
      }
    }
  }
}

function resolveBulletPlayerCollisions() {
  for (var i = 0, len = aliens.length; i < len; i++) {
    var alien = aliens[i];
    if (alien.bullet !== null && checkRectCollision(alien.bullet.bounds, player.bounds)) {
      if (player.lives === 0) {
        hasGameStarted = false;
      } else {
       alien.bullet.alive = false;
       particleManager.createExplosion(player.position.x, player.position.y, 'green', 100, 8,8,6,0.001,40);
       player.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
       player.lives--;
        break;
      }

    }
  }
}

function resolveCollisions() {
  resolveBulletEnemyCollisions();
  resolveBulletPlayerCollisions();
}

function updateGame(dt) {
  player.handleInput();
  prevKeyStates = keyStates.slice();
  player.update(dt);
  updateAliens(dt);
  resolveCollisions();
  window.score = player.score;
}

function drawIntoCanvas(width, height, drawFunc) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  drawFunc(ctx);
  return canvas;
}

function fillText(text, x, y, color, fontSize) {
  if (typeof color !== 'undefined') ctx.fillStyle = color;
  if (typeof fontSize !== 'undefined') ctx.font = fontSize + 'px Play';
  ctx.fillText(text, x, y);
}

function fillCenteredText(text, x, y, color, fontSize) {
  var metrics = ctx.measureText(text);
  fillText(text, x - metrics.width/2, y, color, fontSize);
}

function fillBlinkingText(text, x, y, blinkFreq, color, fontSize) {
  if (~~(0.5 + Date.now() / blinkFreq) % 2) {
    fillCenteredText(text, x, y, color, fontSize);
  }
}

function drawBottomHud() {
  ctx.fillStyle = '#02ff12';
  ctx.fillRect(0, CANVAS_HEIGHT - 30, CANVAS_WIDTH, 2);
  fillText(player.lives + ' x ', 10, CANVAS_HEIGHT - 7.5, 'white', 20);
  ctx.drawImage(spriteSheetImg, player.clipRect.x, player.clipRect.y, player.clipRect.w, 
                 player.clipRect.h, 45, CANVAS_HEIGHT - 23, player.clipRect.w * 0.5,
                 player.clipRect.h * 0.5);
  fillText('CREDIT: ', CANVAS_WIDTH - 115, CANVAS_HEIGHT - 7.5);
  fillCenteredText('SCORE: ' + player.score, CANVAS_WIDTH/2, 20);
  fillBlinkingText('00', CANVAS_WIDTH - 25, CANVAS_HEIGHT - 7.5, TEXT_BLINK_FREQ);
}

function drawAliens(resized) {
  for (var i = 0; i < aliens.length; i++) {
    var alien = aliens[i];
    alien.draw(resized);
  }
}

function drawGame(resized) {
  player.draw(resized);  
  drawAliens(resized);
  particleManager.draw();
  drawBottomHud();
}

function drawStartScreen() {
  fillCenteredText("Alien Attack", CANVAS_WIDTH/2, CANVAS_HEIGHT/2.75, '#FFFFFF', 36);
  fillBlinkingText("Press Start to play!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 500, '#FFFFFF', 36);
  fillCenteredText(`Last Score: ${window.score}`, CANVAS_WIDTH/2, CANVAS_HEIGHT/1.75, 500, '#FFFFFF', 10);
}

function animate() {
  var now = window.performance.now();
  var dt = now - lastTime;
  if (dt > 100) dt = 100;
  if (wasKeyPressed(57) && !hasGameStarted) {
    initGame();
    hasGameStarted = true;
  }
  
  if (hasGameStarted) {
     updateGame(dt / 1000);  
  }

 
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (hasGameStarted) {
    drawGame(false);
  } else {
    drawStartScreen();
  }
  lastTime = now;
  requestAnimationFrame(animate);
}



// ###################################################################
// Event Listener functions
//
// ###################################################################
function resize() {
  var w = 550;
  var h = 690;

	// calculate the scale factor to keep a correct aspect ratio
  var scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);
  
  if (IS_CHROME) {
    canvas.width = CANVAS_WIDTH * scaleFactor;
    canvas.height = CANVAS_HEIGHT * scaleFactor;
    setImageSmoothing(false);
    ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);   
  } else {
    // resize the canvas css properties
    canvas.style.width = CANVAS_WIDTH * scaleFactor + 'px';
    canvas.style.height = CANVAS_HEIGHT * scaleFactor + 'px'; 
  }
}

function onKeyDown(e) {
  e.preventDefault();
  keyStates[e.keyCode] = true;
}

function onKeyUp(e) {
  e.preventDefault();
  keyStates[e.keyCode] = false;
}


// ###################################################################
// Start game!
//
// ###################################################################
window.onload = function() {
  init();
  animate();
};