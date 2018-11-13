//The overall game object, contains all of the game information, setup, state, etc.
PlayState = {};

/* --------------------------------------------------- */
 //CREATING A HERO CLASS THAT INHERITS METHODS (IE. MOVEMENT PHYSICS, ETC.) FROM PHASER.SPRITE */
function Hero(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'hero');
	//Sets the anchor (point where an image/sprite is handled) to its center
	this.anchor.set(0.5, 0.5);
	//Enable physics for the hero's body
	this.game.physics.enable(this);
	//Set a flag in the body that checks for moving outside the screen
	this.body.collideWorldBounds = true;
};
//inherit from Phaser.sprite
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;
//Move the hero in a given direction at a certain speed
Hero.prototype.move = function(direction) {
	const SPEED = 200;
	this.body.velocity.x = direction*SPEED;
};
//Implement the jump method for the hero
Hero.prototype.jump = function() {
	const JUMP_SPEED = 600;
	//Check if the hero is already in the air; false for yes, true for no
	let canJump = this.body.touching.down;
	
	//If statement prevents double, triple, n-tuple jumps
	if(canJump) {
		//Negative y velocity is the up direction
		this.body.velocity.y = -JUMP_SPEED;
	}
	
	return canJump;
}
//Implement a small bounce function for the hero
Hero.prototype.bounce = function() {
	const BOUNCE_SPEED = 200;
	this.body.velocity.y = -BOUNCE_SPEED;
};

/* --------------------------------------------------- */

//Create a custom SPIDER class
function Spider(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'spider');
	
	//anchor
	this.anchor.set(0.5);
	//animations
	this.animations.add('crawl', [0, 1, 2], 8, true);
	this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
	this.animations.play('crawl')
	// physics properties
	this.game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.body.velocity.x = Spider.SPEED;
}

Spider.SPEED = 100;
//inherit from Phaser.Sprite
Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;
//Check whether the spider is in contact with something; function is automatically called
Spider.prototype.update = function() {
	//Touching accounts for general collision (ie. with a platform/player); blocked accounts for the world bounds
	if(this.body.touching.right || this.body.blocked.right) {
		//turn left
		this.body.velocity.x = -Spider.SPEED;
	}
	else if(this.body.touching.left || this.body.blocked.left) {
		this.body.velocity.x = Spider.SPEED;
	}
}
//Implement death function 
Spider.prototype.die = function() {
	//Removes the sprite from physics operations
	this.body.enable = false;
	
	this.animations.play('die').onComplete.addOnce(function() {
		this.kill();
	}, this);
};

/* --------------------------------------------------- */

//Initializes game functionality (called before any other game phase)
PlayState.init = function() {
	//Tweaking the renderer so that it rounds position values to integers when drawing images (ie. 100.27 --> 100); optional graphics fix
	this.game.renderer.renderSession.roundPixels = true;
	//Checks for keyboard state
	this.keys = this.game.input.keyboard.addKeys( {
		left: Phaser.KeyCode.LEFT,
		right: Phaser.KeyCode.RIGHT,
		up: Phaser.KeyCode.UP
	});
	//Create a listener in PlayState for the "on key down" event and calls jump
	this.keys.up.onDown.add(function () {
	    let didJump = this.hero.jump();
	    
	    if(didJump) {
	    	this.sfx.jump.play();
	    }
	}, this);
	//Variable keeping track of the player score, initialized to zero
	this.coinPickupCount = 0;
};

/* --------------------------------------------------- */

//Load game assets here BEFORE GAME START
PlayState.preload = function() {
	//Load the level data for storage
	this.game.load.json('level:1', 'data/level01.json');
	//Load background image for storage
	this.game.load.image('background', 'images/background.png');
	//Load ground and grass tile assets for storage: parameters = image key, file location	
	this.game.load.image('ground', 'images/ground.png');
	this.game.load.image('grass:8x1', 'images/grass_8x1.png');
	this.game.load.image('grass:6x1', 'images/grass_6x1.png');
	this.game.load.image('grass:4x1', 'images/grass_4x1.png');
	this.game.load.image('grass:2x1', 'images/grass_2x1.png');
	this.game.load.image('grass:1x1', 'images/grass_1x1.png');
	//Load the character asset for storage
	this.game.load.image('hero', 'images/hero_stopped.png');
	//Load audio assets
	this.game.load.audio('sfx:jump', 'audio/jump.wav');
	this.game.load.audio('sfx:coin', 'audio/coin.wav');
	this.game.load.audio('sfx:stomp', 'audio/stomp.wav');
	//Load a spritesheet of coins (parameters = image key, file location, dimensions of individual frame)
	this.game.load.spritesheet('coin', 'images/coin_animated.png', 22, 22);
	//Load coin icon and numbers for the scoreboard
	this.game.load.image('icon:coin', 'images/coin_icon.png');
	this.game.load.image('font:numbers', 'images/numbers.png');
	//Load a spritesheet of spiders
	this.game.load.spritesheet('spider', 'images/spider.png', 42, 32);
	//Load invisible wall assets
	this.game.load.image('invisible-wall', 'images/invisible_wall.png');
	
};

/* --------------------------------------------------- */

//Create game entities and set up world
PlayState.create = function() {
	//Add an image object into game: parameters = x-coord, y-coord, key to an asset
	this.game.add.image(0, 0, 'background');
	//Level-loading function: parameter = json file describing the level objects
	this._loadLevel(this.game.cache.getJSON('level:1'));
	//Add sound entities to the game
	this.sfx = {
		jump: this.game.add.audio('sfx:jump'),
		coin: this.game.add.audio('sfx:coin'),
		stomp: this.game.add.audio('sfx:stomp')
	};
	this._createHud();
};

/* --------------------------------------------------- */

//Level-loading function
PlayState._loadLevel = function(data) {
	//Create a group of platforms
	this.platforms = this.game.add.group();
	//Create a group of coins
	this.coins = this.game.add.group();
	//Create a group of spiders
	this.spiders = this.game.add.group();
	//Create a group of invisible walls, set their visibility to hidden
	this.enemyWalls = this.game.add.group();
	this.enemyWalls.visible = false;
	//Spawn platforms (uses info stored in the json file passed in from 'data')
	data.platforms.forEach(this._spawnPlatform, this);
	//Spawn coins
	data.coins.forEach(this._spawnCoin, this);
	//Spawn hero and enemies
	this._spawnCharacters({hero: data.hero, spiders: data.spiders});	
	//Enable gravity
	const GRAVITY = 1200;
	this.game.physics.arcade.gravity.y = GRAVITY;	
};

/* --------------------------------------------------- */

//Adds platform objects into the game: parameter = platform data
PlayState._spawnPlatform = function(platform) {
	//Add the new sprite to the group of platforms and enable physics on it
	//Phaser.Group.create is a factory method for sprites
	let sprite = this.platforms.create(
			platform.x, platform.y, platform.image);
	this.game.physics.enable(sprite);
	//Disable gravity for platforms
	sprite.body.allowGravity = false;
	//Tell the physics engine that platforms cannot be moved when colliding with other objects (no transferral of kinetic energy)
	sprite.body.immovable = true;
	//Spawn two invisible walls per spawned platform, one on the left and one on the right
	this._spawnEnemyWall(platform.x, platform.y, 'left');
	this._spawnEnemyWall(platform.x + sprite.width, platform.y, 'right');
};

//Adds invisible wall objects into the game: parameter = x-coord, y-coord, key
PlayState._spawnEnemyWall = function(x, y, side) {
	let sprite = this.enemyWalls.create(x, y, 'invisible-wall');
	//anchor and y displacement
	sprite.anchor.set(side === 'left' ? 1 : 0, 1);
	//physics properties
	this.game.physics.enable(sprite);
	sprite.body.immovable = true;
	sprite.body.allowGravity = false;
	
}

//Adds character objects into the game: parameter = character data
PlayState._spawnCharacters = function(data) {
	//Create the hero character using data from 'data'
	this.hero = new Hero(this.game, data.hero.x, data.hero.y);
	//Add this hero character to the actual game
	this.game.add.existing(this.hero);
	//Create spiders using data from 'data
	data.spiders.forEach(function(spider) {
		let sprite = new Spider(this.game, spider.x, spider.y);
		this.spiders.add(sprite);
	}, this);
	
};

//Adds coin objects into the game: parameter = coin data
PlayState._spawnCoin = function(coin) {
	let sprite = this.coins.create(coin.x, coin.y, 'coin');
	sprite.anchor.set(0.5, 0.5);
	
	//Add and play the animations specified in 'coin'
	//Parameters = key, frame indices used, frames per second, looped
	sprite.animations.add('rotate', [0, 1, 2, 1], 6, true);
	sprite.animations.play('rotate');
	
	//Give the coins a physics body
	this.game.physics.enable(sprite);
	sprite.body.allowGravity = false;
	
};

//Add a scoreboard to the game
PlayState._createHud = function () {
	//Compute how a text looks like with a bitmap font spritesheet
	const NUMBERS_STR = '0123456789X-';
	this.coinFont = this.game.add.retroFont('font:numbers', 20, 26,
			NUMBERS_STR, 6);
    
	//render position is set relative to the hud
    let coinIcon = this.game.make.image(0, 0, 'icon:coin');
    let coinScoreImg = this.game.make.image(coinIcon.x + coinIcon.width,
            coinIcon.height / 2, this.coinFont);
    coinScoreImg.anchor.set(0, 0.5);

    this.hud = this.game.add.group();
    this.hud.add(coinIcon);
    this.hud.add(coinScoreImg);
    //Set hud position at 10, 10; this is the centerpoint from which objects in the group are based off of
    this.hud.position.set(10, 10);
};
/* --------------------------------------------------- */

//Update the status of the game (called automatically during game operation)
PlayState.update = function() {
	//Perform collision checks between game objects
	this._handleCollisions();
	//Process input from the player
	this._handleInput();
	//Tell the retrofont in the scoreboard which text string to render
	this.coinFont.text = `x ${this.coinPickupCount}`;
};

/* --------------------------------------------------- */

//Process input from the player (called automatically during game operation)
PlayState._handleInput = function() {
	//Move hero left
	if(this.keys.left.isDown) {
		this.hero.move(-1);
	}
	//Move hero right
	else if(this.keys.right.isDown) {
		this.hero.move(1);
	}
	else {
		this.hero.move(0);
	}
};

/* --------------------------------------------------- */

//Handle collisions between game objects
PlayState._handleCollisions = function() {
	//Collision between player and platform
	this.game.physics.arcade.collide(this.hero, this.platforms);
	
	//Collision between player and coin, non-kinetic and only performs an intersection test
	//Parameters = object1, object2, callback function upon an intersection, sprites that would be excluded from the check, the 'this' context after the callback function finishes
	this.game.physics.arcade.overlap(this.hero, this.coins, this._onHeroVsCoin, null, this);
	
	//Collision between spider and platform
	this.game.physics.arcade.collide(this.spiders, this.platforms);
	
	//Collision between spider and invisible walls
	this.game.physics.arcade.collide(this.spiders, this.enemyWalls);
	
	//Collision between spider and player
	this.game.physics.arcade.overlap(this.hero, this.spiders, this._onHeroVsEnemy, null, this);
}

/* --------------------------------------------------- */

//Resultant collision logic from an intersection between a hero and a coin
PlayState._onHeroVsCoin = function(hero, coin) {
	//Play a coin collection sound
	this.sfx.coin.play();
	//Remove the coin from the game
	coin.kill();
	//Increment player score
	this.coinPickupCount++;
};

PlayState._onHeroVsEnemy = function(hero, enemy) {
	//Check if the hero is falling (squishing the enemy)
	if(hero.body.velocity.y > 0) {
		enemy.die();	
		hero.bounce();
	}
	//Generic left/right contact with the enemy
	else {
		//Restart the level
		this.game.state.restart();
	}
	//Play a stomping sound
	this.sfx.stomp.play();	
	
};

/* --------------------------------------------------- */

window.onload = function() {
	// Create a new game window, AUTO checks to use WEBGL for graphics
	let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
	//Add 'PlayState', an object describing the setup/state of the game, to the game; 'play' is the key
	game.state.add('play', PlayState);
	//Start the game
	game.state.start('play');
};
