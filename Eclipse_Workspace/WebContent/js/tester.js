//The overall game object, contains all of the game information, setup, state, etc.
PlayState = {};
/* --------------------------------------------------- */
var last_spawn_time;
var time_til_spawn;
/* --------------------------------------------------- */
//Create custom checkpoint_LEFT class that inherits methods from Phaser.Sprite
function checkPoint_LEFT(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'LEFT');
	//Set the sprite anchor
	this.anchor.set(0.5);
	//Enable physics for the sprite body
	this.game.physics.enable(this);
	
}
//Inherit from Phaser.sprite
checkPoint_LEFT.prototype = Object.create(Phaser.Sprite.prototype);
checkPoint_LEFT.prototype.constructor = checkPoint_LEFT;

checkPoint_LEFT.prototype.update = function() {
	
}

/* --------------------------------------------------- */

//Create custom checkpoint_RIGHT class 
function checkPoint_RIGHT(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'RIGHT');
	//Set the sprite anchor
	this.anchor.set(0.5);
	//Enable physics for the sprite body
	this.game.physics.enable(this);
}
//Inherit from Phaser.sprite
checkPoint_RIGHT.prototype = Object.create(Phaser.Sprite.prototype);
checkPoint_RIGHT.prototype.constructor = checkPoint_RIGHT;

checkPoint_RIGHT.prototype.update = function() {
	
}

/* --------------------------------------------------- */

//Create custom checkpoint_UP class
function checkPoint_UP(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'UP');
	//Set the sprite anchor
	this.anchor.set(0.5);
	//Enable physics for the sprite body
	this.game.physics.enable(this);
}
//Inherit from Phaser.sprite
checkPoint_UP.prototype = Object.create(Phaser.Sprite.prototype);
checkPoint_UP.prototype.constructor = checkPoint_UP;

checkPoint_UP.prototype.update = function() {
	
}
/* --------------------------------------------------- */

//Create custom checkpoint_DOWN class
function checkPoint_DOWN(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'DOWN');
	//Set the sprite anchor
	this.anchor.set(0.5);
	//Enable physics for the sprite body
	this.game.physics.enable(this);
}
//Inherit from Phaser.sprite
checkPoint_DOWN.prototype = Object.create(Phaser.Sprite.prototype);
checkPoint_DOWN.prototype.constructor = checkPoint_DOWN;

checkPoint_DOWN.prototype.update = function() {
	
}
/* --------------------------------------------------- */


/* --------------------------------------------------- */

//Initializes game functionality (called before any other game phase)
PlayState.init = function() {
	//Tweaking the renderer so that it rounds position values to integers when drawing images (ie. 100.27 --> 100); optional graphics fix
	this.game.renderer.renderSession.roundPixels = true;
	//Adds checks for keyboard state
	this.keys = this.game.input.keyboard.addKeys( {
		left: Phaser.KeyCode.LEFT,
		right: Phaser.KeyCode.RIGHT,
		up: Phaser.KeyCode.UP,
		down: Phaser.KeyCode.DOWN
	});
	
	//Variable keeping track of whether we are spawning arrows
	this.allowSpawns = true;
	//Variable keeping track of the player score, initialized to zero
	this.score = 0;
	
	//Buffer time (milliseconds) before arrows start spawning
	time_til_spawn = 2000;
	last_spawn_time = this.game.time.time;

};

/* --------------------------------------------------- */

//Load game assets here BEFORE GAME START
PlayState.preload = function() {
	var test = 'audio/fullmoon.mp3';
	//Load the level data for storage
	this.game.load.json('level:1', 'data/ddr.json');
	//Load background image for storage
	this.game.load.image('background', 'images/background.png');
	//Load audio assets
	this.game.load.audio('sfx:jump', 'audio/jump.wav');
	this.game.load.audio('sfx:coin', 'audio/coin.wav');
	this.game.load.audio('sfx:stomp', 'audio/stomp.wav');
	this.game.load.audio('sfx:full_moon', test);
	this.game.load.audio('sfx:troublemaker', 'audio/troublemaker.mp3');
	this.game.load.audio('sfx:attention', 'audio/attention.mp3');
	this.game.load.audio('sfx:now', 'audio/now.mp3');
	this.game.load.audio('sfx:this_guy', 'audio/this_guy.mp3');
	//Load a spritesheet of coins (parameters = image key, file location, dimensions of individual frame)
	this.game.load.spritesheet('coin', 'images/coin_animated.png', 22, 22);
	this.game.load.spritesheet('poor', 'images/poor_spritesheet.png', 141, 45);
	this.game.load.spritesheet('okay', 'images/okay_spritesheet.png', 141, 45);
	this.game.load.spritesheet('good', 'images/good_spritesheet.png', 141, 45);
	this.game.load.spritesheet('perfect', 'images/perfect_spritesheet.png', 141, 45);
	//Load coin icon and numbers for the scoreboard
	this.game.load.image('icon:coin', 'images/coin_icon.png');
	this.game.load.image('font:numbers', 'images/numbers.png');	
	//Load arrow images
	this.game.load.image('arrow_left', 'images/left.png');
	this.game.load.image('arrow_right', 'images/right.png');
	this.game.load.image('arrow_up', 'images/up.png');
	this.game.load.image('arrow_down', 'images/down.png');
	//Load checkpoint images
	this.game.load.image('LEFT', 'images/checkpoint_left.png');
	this.game.load.image('LEFT_RED', 'images/checkpoint_left_red.png');
	this.game.load.image('RIGHT', 'images/checkpoint_right.png');
	this.game.load.image('RIGHT_RED', 'images/checkpoint_right_red.png');
	this.game.load.image('UP', 'images/checkpoint_up.png');
	this.game.load.image('UP_RED', 'images/checkpoint_up_red.png');
	this.game.load.image('DOWN', 'images/checkpoint_down.png');
	this.game.load.image('DOWN_RED', 'images/checkpoint_down_red.png');
	//Load difficulty settings
	this.game.load.image('one', 'images/1.png');
	this.game.load.image('one_blue', 'images/1_blue.png');
	this.game.load.image('two', 'images/2.png');
	this.game.load.image('two_red', 'images/2_blue.png');
	this.game.load.image('three', 'images/3.png');
	this.game.load.image('three_blue', 'images/3_blue.png');
	this.game.load.image('four', 'images/4.png');
	this.game.load.image('four_blue', 'images/4_blue.png');
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
		stomp: this.game.add.audio('sfx:stomp'),
		full_moon: this.game.add.audio('sfx:full_moon'),
		troublemaker: this.game.add.audio('sfx:troublemaker'),
		attention: this.game.add.audio('sfx:attention'),
		now: this.game.add.audio('sfx:now'),
		this_guy: this.game.add.audio('sfx:this_guy')
	};
	
	var curr_song = this.sfx.full_moon;
	curr_song.play();
	
	var song_time = 199000;
	this.timer = this.game.time.create(false);
	this.timer.loop(song_time, this.updateCounter, this);
	this.timer.start();
	
	//Code addresses the logic that happens after the song finishes
	curr_song.onStop.addOnce(function() {
		
		//Currently resets game; change laters
		this.game.state.restart();
	}, this);
	
	this._createHud();
	
};


PlayState.updateCounter = function() {
    
    this.allowSpawns = false;
  
}
/* --------------------------------------------------- */

//Level-loading function
PlayState._loadLevel = function(data) {
	
	//Create checkpoints LEFT, UP, DOWN, RIGHT
	this._spawnCheckPoints({LEFT: data.checkpt_LEFT, UP: data.checkpt_UP,
		DOWN: data.checkpt_DOWN, RIGHT: data.checkpt_RIGHT});
	
	//Create a group of LEFT arrows
	this.arrows_left = this.game.add.group();
	//Create a group of RIGHT arrows
	this.arrows_right = this.game.add.group();
	//Create a group of UP arrows
	this.arrows_up = this.game.add.group();
	//Create a group of DOWN arrows
	this.arrows_down = this.game.add.group();
	
	//Create a group of PERFECT indicators
	this.perfect_indicator = this.game.add.group();
	//Create a group of GOOD indicators
	this.good_indicator = this.game.add.group();
	//Create a group of OKAY indicators
	this.okay_indicator = this.game.add.group();
	//Create a group of POOR indicators
	this.poor_indicator = this.game.add.group();
	
	//Establish the leading edges for each input key (the first time a key is pressed; accounts for game logic when a user holds down a key)
	this.leadingEdgeLeft = true;
	this.leadingEdgeRight = true;
	this.leadingEdgeUp = true;
	this.leadingEdgeDown = true;
	this.badinput = true;
};

/* --------------------------------------------------- */

//Object spawn helper functions
PlayState._spawnCheckPoints = function(data) {
	
	//Create the checkpoint objects using data from 'data', then add them to the game
	this.LEFT = new checkPoint_LEFT(this.game, data.LEFT.x, data.LEFT.y);
	this.game.add.existing(this.LEFT);
	
	this.RIGHT = new checkPoint_RIGHT(this.game, data.RIGHT.x, data.RIGHT.y);
	this.game.add.existing(this.RIGHT);
	
	this.UP = new checkPoint_UP(this.game, data.UP.x, data.UP.y);
	this.game.add.existing(this.UP);
	
	this.DOWN = new checkPoint_DOWN(this.game, data.DOWN.x, data.DOWN.y);
	this.game.add.existing(this.DOWN);
	
};

PlayState._spawnArrow = function() {
	
	const ARROWSPEED = 350;
	const DIFFICULTY = 3;
	//Return a value 1 through 4, inclusive; the # of arrows spawned in a given frame
	var spawnCount = Math.floor(Math.random()*DIFFICULTY) +1;
	
	//Keeps track of the arrow(s) spawned
	var arrows = [];
	
	//Generate a value 1 through 4, inclusive; each # correlates to LEFT, RIGHT, UP, DOWN
	for(var i = 0; i < spawnCount; i++) {
		//'add' keeps track of whether that number has been generated before (ie. don't want duplicate LEFTs)
		var add = true;
		var a = Math.floor(Math.random()*4) +1;
		
		for(var j = 0; j < arrows.length; j++) {
			if(arrows[j] == a) {
				add = false;
			}
		}
		
		if(add == true) {
			arrows.push(a);
		}
	}
	
	//Spawn every arrow in the array
	for(var i = 0; i < arrows.length; i++) {
		//Spawns a LEFT arrow
		if(arrows[i] == 1) {
			let sprite = this.arrows_left.create(
					171, 600, 'arrow_left');
			//Physics characteristics of an arrow
			this.game.physics.enable(sprite);
			sprite.body.allowGravity = false;
			sprite.body.velocity.y = -ARROWSPEED;
			//Set the sprite center
			sprite.anchor.set(0.5, 0.5);
			//World logic for an arrow
			sprite.checkWorldBounds = true;
			sprite.outOfBoundsKill = true;
			sprite.events.onOutOfBounds.add(this._decrementScore, this);
			sprite.events.onKilled.add(this._removeFromLeftGroup,sprite);
		}
		else if(arrows[i] == 2) {
			//Spawns a RIGHT arrow
			let sprite = this.arrows_right.create(
					771, 600, 'arrow_right');
			this.game.physics.enable(sprite);
			sprite.body.allowGravity = false;
			sprite.body.velocity.y = -ARROWSPEED;
			sprite.anchor.set(0.5, 0.5);
			sprite.checkWorldBounds = true;
			sprite.outOfBoundsKill = true;
			sprite.events.onOutOfBounds.add(this._decrementScore, this);
			sprite.events.onKilled.add(this._removeFromRightGroup,sprite);
			
		}
		else if(arrows[i] == 3) {
			//Spawns an UP arrow
			let sprite = this.arrows_up.create(
					371, 600, 'arrow_up');
			this.game.physics.enable(sprite);
			sprite.body.allowGravity = false;
			sprite.body.velocity.y = -ARROWSPEED;
			sprite.anchor.set(0.5, 0.5);
			sprite.checkWorldBounds = true;
			sprite.outOfBoundsKill = true;
			sprite.events.onOutOfBounds.add(this._decrementScore, this);
			sprite.events.onKilled.add(this._removeFromUpGroup,sprite);
			
		}
		else if(arrows[i] == 4) {
			//Spawns a DOWN arrow
			let sprite = this.arrows_down.create(
					571, 600, 'arrow_down');
			this.game.physics.enable(sprite);
			sprite.body.allowGravity = false;
			sprite.body.velocity.y = -ARROWSPEED;
			sprite.anchor.set(0.5, 0.5);
			sprite.checkWorldBounds = true;
			sprite.outOfBoundsKill = true;
			sprite.events.onOutOfBounds.add(this._decrementScore, this);
			sprite.events.onKilled.add(this._removeFromDownGroup,sprite);
			
		}
	}
	
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
    this.hud.position.set(10, 550);
};

//Add an indicator to the game
PlayState._createPerfectIndicator = function(checkpoint) {
	let sprite = this.perfect_indicator.create(checkpoint.x, checkpoint.y+150, 'perfect');
	
	sprite.anchor.set(0.5, 0.5);
	
	sprite.game.physics.enable(sprite);
	sprite.body.allowGravity = true;
	
	sprite.animations.add('perfect_appear', [0, 1, 2, 3, 4], 12, false);
	sprite.animations.play('perfect_appear').onComplete.addOnce(function() {
		sprite.destroy();
	}, this);
	
	
};

PlayState._createGoodIndicator = function(checkpoint) {
	let sprite = this.good_indicator.create(checkpoint.x, checkpoint.y+150, 'good');
	
	sprite.anchor.set(0.5, 0.5);
	
	sprite.game.physics.enable(sprite);
	sprite.body.allowGravity = true;
	
	sprite.animations.add('good_appear', [0, 1, 2, 3, 4],12, false);
	sprite.animations.play('good_appear').onComplete.addOnce(function() {
		sprite.destroy();
	}, this);
	
};

PlayState._createOkayIndicator = function(checkpoint) {
let sprite = this.okay_indicator.create(checkpoint.x, checkpoint.y+150, 'okay');
	
	sprite.anchor.set(0.5, 0.5);
	
	sprite.game.physics.enable(sprite);
	sprite.body.allowGravity = true;
	
	sprite.animations.add('okay_appear', [0, 1, 2, 3, 4],12, false);
	sprite.animations.play('okay_appear').onComplete.addOnce(function() {
		sprite.destroy();
	}, this);
};

PlayState._createPoorIndicator = function(checkpoint) {
let sprite = this.poor_indicator.create(checkpoint.x, checkpoint.y+150, 'poor');
	
	sprite.anchor.set(0.5, 0.5);
	
	sprite.game.physics.enable(sprite);
	sprite.body.allowGravity = true;
	
	sprite.animations.add('poor_appear', [0, 1, 2, 3, 4],12, false);
	sprite.animations.play('poor_appear').onComplete.addOnce(function() {
		sprite.destroy();
	}, this);
};
/* --------------------------------------------------- */

//Remove an arrow from its respective group
PlayState._removeFromLeftGroup = function() {
	  this.destroy();
};
PlayState._removeFromRightGroup = function() {
	this.destroy();
};
PlayState._removeFromUpGroup = function() {
	this.destroy();
};
PlayState._removeFromDownGroup = function() {
	this.destroy();
};

/* --------------------------------------------------- */
PlayState._decrementScore = function() {
	this.sfx.stomp.play();
	this.score--;
}
/* --------------------------------------------------- */

//Update the status of the game (called automatically during game operation)
PlayState.update = function() {
	//this.LEFT.loadTexture('LEFT');
	//this.RIGHT.loadTexture('RIGHT');
	//this.UP.loadTexture('UP');
	//this.DOWN.loadTexture('DOWN');
	
	//Perform collision checks between game objects
	this._handleCollisions();
	//Process input from the player
	this._handleInput();	
	
	
	//Spawn arrows after some time has elapsed
	var current_time = this.game.time.time;
	if(current_time - last_spawn_time > time_til_spawn && this.allowSpawns == true) {
		//Generate a random amount of time from 1 second to 1.5 second
		time_til_spawn = Math.random()*500 + 500;
		last_spawn_time = current_time;
		this._spawnArrow();
	}
	
	this.coinFont.text = `x ${this.score}`;
};

/* --------------------------------------------------- */

//Process input from the player (called automatically during game operation)
PlayState._handleInput = function() {
	if(this.keys.left.isDown && this.leadingEdgeLeft == true) {
		/* See whether the LEFT checkpoint is contacting a left arrow */
		var overlap = this.game.physics.arcade.overlap(this.arrows_left, this.LEFT);
		
		if(overlap == false && this.badinput == true) {
			this._decrementScore();
			//this.LEFT.loadTexture('LEFT_RED');
		}
	}
	
	if(this.keys.right.isDown && this.leadingEdgeRight == true) {
		/* See whether the RIGHT checkpoint is contacting a right arrow */
		var overlap = this.game.physics.arcade.overlap(this.arrows_right, this.RIGHT);
		
		if(overlap == false && this.badinput == true) {
			this._decrementScore();
			//this.RIGHT.loadTexture('RIGHT_RED');
		}
	}
	
	if(this.keys.up.isDown && this.leadingEdgeUp == true) {
		/* See whether the UP checkpoint is contacting an up arrow */
		var overlap = this.game.physics.arcade.overlap(this.arrows_up, this.UP);
		
		if(overlap == false && this.badinput == true) {
			this._decrementScore();
			//this.UP.loadTexture('UP_RED');
		}
	}
	
	if(this.keys.down.isDown && this.leadingEdgeDown == true) {
		/* See whether the DOWN checkpoint is contacting a down arrow */
		var overlap = this.game.physics.arcade.overlap(this.arrows_down, this.DOWN);
		
		if(overlap == false && this.badinput == true) {
			this._decrementScore();
			//this.DOWN.loadTexture('DOWN_RED');
		}
		
	}
	
	if(this.keys.left.isDown == false) {
		this.leadingEdgeLeft = true;
	}
	else {
		this.leadingEdgeLeft = false;
	}
	if(this.keys.right.isDown == false) {
		this.leadingEdgeRight = true;
	}
	else {
		this.leadingEdgeRight = false;
	}
	if(this.keys.up.isDown == false) {
		this.leadingEdgeUp = true;
	}
	else {
		this.leadingEdgeUp = false;
	}
	if(this.keys.down.isDown == false) {
		this.leadingEdgeDown= true;
	}
	else {
		this.leadingEdgeDown = false;
	}
};

/* --------------------------------------------------- */

//Handle collisions between game objects
PlayState._handleCollisions = function() {
	this.badinput = true;
	this.game.physics.arcade.overlap(this.arrows_left, this.LEFT, this._onLeftArrowVsCheckPoint, null, this);
	this.game.physics.arcade.overlap(this.arrows_right, this.RIGHT, this._onRightArrowVsCheckPoint, null, this);
	this.game.physics.arcade.overlap(this.arrows_up, this.UP, this._onUpArrowVsCheckPoint, null, this);
	this.game.physics.arcade.overlap(this.arrows_down, this.DOWN, this._onDownArrowVsCheckPoint, null, this);

}

/* --------------------------------------------------- */

//Helper collision functions
PlayState._onLeftArrowVsCheckPoint = function(LEFT, arrow_left) {
	//Check for left arrow input from the user
	if(this.keys.left.isDown && this.leadingEdgeLeft == true) {
		//Play a correct input sound
		this.sfx.coin.play();
		//Check for player accuracy
		var points = this._PrecisionCheck(LEFT, arrow_left);
		//Increment player score
		this.score += points;
		//Kill the arrow
		arrow_left.kill();	
		//Verify that the user inputted the correct arrow
		this.badinput = false;
		
	}
	
	
}

PlayState._onRightArrowVsCheckPoint = function(RIGHT, arrow_right) {
	//Check for right arrow input from the user
	if(this.keys.right.isDown && this.leadingEdgeRight == true) {
		//Play a correct input sound
		this.sfx.coin.play();
		//Check for player accuracy
		var points = this._PrecisionCheck(RIGHT, arrow_right);
		//Increment player score
		this.score += points;
		//Kill the arrow
		arrow_right.kill();
		//Verify that the user inputted the correct arrow
		this.badinput = false;
		
	}
}

PlayState._onUpArrowVsCheckPoint = function(UP, arrow_up) {
	//Check for up arrow input from the user
	if(this.keys.up.isDown && this.leadingEdgeUp == true) {
		//Play a correct input sound
		this.sfx.coin.play();
		//Check for player accuracy
		var points = this._PrecisionCheck(UP, arrow_up);
		//Increment player score
		this.score += points;
		//Kill the arrow
		arrow_up.kill();	
		//Verify that the user inputted the correct arrow
		this.badinput = false;
		
	}
}

PlayState._onDownArrowVsCheckPoint = function(DOWN, arrow_down) {
	//Check for down arrow input from the user
	if(this.keys.down.isDown && this.leadingEdgeDown == true) {
		//Play a correct input sound
		this.sfx.coin.play();
		//Check for player accuracy
		var points = this._PrecisionCheck(DOWN, arrow_down);
		//Increment player score
		this.score += points;
		//Kill the arrow
		arrow_down.kill();	
		//Verify that the user inputted the correct arrow
		this.badinput = false;
		
	}
}

/* --------------------------------------------------- */

//Precision checking
PlayState._PrecisionCheck = function(checkpoint, arrow) {
	var checkpoint_y = checkpoint.y;
	var arrow_y = arrow.y;
	//Find distance between the checkpoint and the arrow at time of player input
	
	var distance = (Math.abs(checkpoint_y - arrow_y));
	
	//If distance is very close, create perfect indicator and return 10 points
	if(distance < 10) {
		this._createPerfectIndicator(checkpoint);
		return 10;
	}
	//create good indicator, return 7 points
	else if(distance < 25) {
		this._createGoodIndicator(checkpoint);
		return 7;
	}
	//create okay indicator, return 5 points
	else if (distance < 40){
		this._createOkayIndicator(checkpoint);
		return 5;
	}
	//create poor indicator, return 1 point
	else {
		this._createPoorIndicator(checkpoint);
		return 1;
	}
	
}

/* --------------------------------------------------- */

window.onload = function() {
	// Create a new game window, AUTO checks to use WEBGL for graphics
	let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
	//Add 'PlayState', an object describing the setup/state of the game, to the game; 'play' is the key
	game.state.add('play', PlayState);
	//Start the game
	game.state.start('play');
	
	
	
};
