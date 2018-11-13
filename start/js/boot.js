/**
 * 
 */
BootState = {};

//Load game assets here BEFORE GAME START
BootState.preload = function() {
	//Load the level data for storage
	this.game.load.json('level:1', 'data/ddr.json');
	//Load background image for storage
	this.game.load.image('background', 'images/background.png');
	this.game.load.image('background_menu', 'images/background_menu.png');
	//Load audio assets
	this.game.load.audio('sfx:jump', 'audio/jump.wav');
	this.game.load.audio('sfx:coin', 'audio/coin.wav');
	this.game.load.audio('sfx:stomp', 'audio/stomp.wav');
	this.game.load.audio('sfx:full_moon', 'audio/fullmoon.mp3');
	this.game.load.audio('sfx:troublemaker', 'audio/troublemaker.mp3');
	this.game.load.audio('sfx:attention', 'audio/attention.mp3');
	this.game.load.audio('sfx:now', 'audio/now.mp3');
	this.game.load.audio('sfx:this_guy', 'audio/this_guy.mp3');
	this.game.load.audio('sfx:love_is_true', 'audio/love_is_true.mp3');
	this.game.load.audio('sfx:summer_summer_sweet', 'audio/summersummersweet.mp3');
	this.game.load.audio('sfx:lay_it_down', 'audio/LayItDown.mp3');
	this.game.load.audio('sfx:rollin', 'audio/rollin.mp3');
	this.game.load.audio('sfx:in_my_feelings', 'audio/in_my_feelings.mp3');
	this.game.load.audio('sfx:the_eve', 'audio/the_eve.mp3');
	//Load a spritesheet of various assets (parameters = image key, file location, dimensions of individual frame)
	this.game.load.spritesheet('coin', 'images/coin_animated.png', 22, 22);
	this.game.load.spritesheet('poor', 'images/poor_spritesheet.png', 141, 45);
	this.game.load.spritesheet('okay', 'images/okay_spritesheet.png', 141, 45);
	this.game.load.spritesheet('good', 'images/good_spritesheet.png', 141, 45);
	this.game.load.spritesheet('perfect', 'images/perfect_spritesheet.png', 141, 45);
	this.game.load.spritesheet('one', 'images/1_spritesheet.png', 47, 45);
	this.game.load.spritesheet('two', 'images/2_spritesheet.png', 47, 45);
	this.game.load.spritesheet('three', 'images/3_spritesheet.png', 47, 45);
	this.game.load.spritesheet('four', 'images/4_spritesheet.png', 47, 45);
	this.game.load.spritesheet('this_guy_button', 'images/this_guy_spritesheet.png', 250, 45);
	this.game.load.spritesheet('attention_button', 'images/attention_spritesheet.png', 250, 45);
	this.game.load.spritesheet('full_moon_button', 'images/full_moon_spritesheet.png', 250, 45);
	this.game.load.spritesheet('troublemaker_button', 'images/troublemaker_spritesheet.png', 290, 45);
	this.game.load.spritesheet('now_button', 'images/now_spritesheet.png', 250, 45);
	this.game.load.spritesheet('love_is_true_button', 'images/love_is_true_spritesheet.png', 290, 45);
	this.game.load.spritesheet('summer_summer_sweet_button', 'images/summersummersweet_spritesheet.png', 290, 90);
	this.game.load.spritesheet('lay_it_down_button', 'images/lay_it_down_spritesheet.png', 290, 45);
	this.game.load.spritesheet('rollin_button', 'images/rollin_spritesheet.png', 250, 45);
	this.game.load.spritesheet('in_my_feelings_button', 'images/in_my_feelings_spritesheet.png', 310, 45);
	this.game.load.spritesheet('the_eve_button', 'images/the_eve_spritesheet.png', 250, 45);
	//Load play button
	this.game.load.image('play_button', 'images/play_button.png');
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
};

BootState.init = function() {
	//Tweaking the renderer so that it rounds position values to integers when drawing images (ie. 100.27 --> 100); optional graphics fix
	this.game.renderer.renderSession.roundPixels = true;

};

BootState.create = function() {
	this.game.state.start('menu');
};
