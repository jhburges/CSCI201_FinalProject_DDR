/**
 * 
 */

MenuState = {};
MenuState.preload = function() {
	this.game.add.image(0, 0, 'background_menu');
};


MenuState.init = function() {
	this.game.global.difficulty = 1;
	this.game.global.spawntime  = 500;
	this.game.global.songstring = 'this_guy';
	this.game.global.songtime = 199000;

};

MenuState.create = function() {
	
	//Difficulty buttons
	this.one = this.game.add.button(100, 30, 'one', this._setDifficulty1, this);
	this.two = this.game.add.button(100, 130, 'two', this._setDifficulty2, this);
	this.three = this.game.add.button(100, 230, 'three', this._setDifficulty3, this);
	this.four = this.game.add.button(100, 330, 'four', this._setDifficulty4, this);
	
	//Song choice buttons
	this.this_guy = this.game.add.button(200, 100, 'this_guy_button', this._setSongThisGuy, this);
	this.attention = this.game.add.button(200, 150, 'attention_button', this._setSongAttention, this);
	this.full_moon = this.game.add.button(200, 200, 'full_moon_button', this._setSongFullMoon, this);
	this.troublemaker = this.game.add.button(200, 250, 'troublemaker_button', this._setSongTroublemaker, this);
	this.now = this.game.add.button(200, 300, 'now_button', this._setSongNow, this);
	this.love_is_true = this.game.add.button(200, 350, 'love_is_true_button', this._setSongLoveIsTrue, this);
	this.summer_summer_sweet = this.game.add.button(500, 100, 'summer_summer_sweet_button', this._setSongSummerSummerSweet, this);
	this.lay_it_down = this.game.add.button(500, 200, 'lay_it_down_button', this._setSongLayItDown, this);
	this.rollin = this.game.add.button(500, 250, 'rollin_button', this._setSongRollin, this);
	this.in_my_feelings = this.game.add.button(500, 300, 'in_my_feelings_button', this._setSongInMyFeelings, this);
	this.the_eve = this.game.add.button(500, 350, 'the_eve_button', this._setSongTheEve, this);
	
	//Play button
	this.play_button = this.game.add.button(this.game.width / 2 + 380, this.game.height/2 + 230, 'play_button', this._startGame);
	this.play_button.anchor.set(0.5, 0.5);
	
		
}
//Song setting functions
MenuState._setSongThisGuy = function() {
	//Handle visuals for the buttons
	this.this_guy.loadTexture('this_guy_button', 1);
	this.attention.loadTexture('attention_button', 0);
	this.full_moon.loadTexture('full_moon_button', 0);
	this.troublemaker.loadTexture('troublemaker_button', 0);
	this.now.loadTexture('now_button', 0);
	this.love_is_true.loadTexture('love_is_true_button', 0);
	this.summer_summer_sweet.loadTexture('summer_summer_sweet_button', 0);
	this.lay_it_down.loadTexture('lay_it_down_button', 0);
	this.rollin.loadTexture('rollin_button', 0);
	this.in_my_feelings.loadTexture('in_my_feelings_button', 0);
	this.the_eve.loadTexture('the_eve_button', 0);
	
	//Set the song and the song length (to be used in the timer)
	this.game.global.songstring = 'this_guy';
	this.game.global.songtime = 199000;
	console.log(this.game.global.songstring);
};

MenuState._setSongAttention = function() {
	this.this_guy.loadTexture('this_guy_button', 0);
	this.attention.loadTexture('attention_button', 1);
	this.full_moon.loadTexture('full_moon_button', 0);
	this.troublemaker.loadTexture('troublemaker_button', 0);
	this.now.loadTexture('now_button', 0);
	this.love_is_true.loadTexture('love_is_true_button', 0);
	this.summer_summer_sweet.loadTexture('summer_summer_sweet_button', 0);
	this.lay_it_down.loadTexture('lay_it_down_button', 0);
	this.rollin.loadTexture('rollin_button', 0);
	this.in_my_feelings.loadTexture('in_my_feelings_button', 0);
	this.the_eve.loadTexture('the_eve_button', 0);
	
	this.game.global.songstring = 'attention';
	this.game.global.songtime = 206000;
	console.log(this.game.global.songstring);
};

MenuState._setSongFullMoon = function() {
	this.this_guy.loadTexture('this_guy_button', 0);
	this.attention.loadTexture('attention_button', 0);
	this.full_moon.loadTexture('full_moon_button', 1);
	this.troublemaker.loadTexture('troublemaker_button', 0);
	this.now.loadTexture('now_button', 0);
	this.love_is_true.loadTexture('love_is_true_button', 0);
	this.summer_summer_sweet.loadTexture('summer_summer_sweet_button', 0);
	this.lay_it_down.loadTexture('lay_it_down_button', 0);
	this.rollin.loadTexture('rollin_button', 0);
	this.in_my_feelings.loadTexture('in_my_feelings_button', 0);
	this.the_eve.loadTexture('the_eve_button', 0);

	this.game.global.songstring = 'full_moon';
	this.game.global.songtime = 200000;
	console.log(this.game.global.songstring);
};

MenuState._setSongTroublemaker = function() {
	this.this_guy.loadTexture('this_guy_button', 0);
	this.attention.loadTexture('attention_button', 0);
	this.full_moon.loadTexture('full_moon_button', 0);
	this.troublemaker.loadTexture('troublemaker_button', 1);
	this.now.loadTexture('now_button', 0);
	this.love_is_true.loadTexture('love_is_true_button', 0);
	this.summer_summer_sweet.loadTexture('summer_summer_sweet_button', 0);
	this.lay_it_down.loadTexture('lay_it_down_button', 0);
	this.rollin.loadTexture('rollin_button', 0);
	this.in_my_feelings.loadTexture('in_my_feelings_button', 0);
	this.the_eve.loadTexture('the_eve_button', 0);
	
	
	this.game.global.songstring = 'troublemaker';
	this.game.global.songtime = 219000;
	console.log(this.game.global.songstring);
};

MenuState._setSongNow = function() {
	this.this_guy.loadTexture('this_guy_button', 0);
	this.attention.loadTexture('attention_button', 0);
	this.full_moon.loadTexture('full_moon_button', 0);
	this.troublemaker.loadTexture('troublemaker_button', 0);
	this.now.loadTexture('now_button', 1);
	this.love_is_true.loadTexture('love_is_true_button', 0);
	this.summer_summer_sweet.loadTexture('summer_summer_sweet_button', 0);
	this.lay_it_down.loadTexture('lay_it_down_button', 0);
	this.rollin.loadTexture('rollin_button', 0);
	this.in_my_feelings.loadTexture('in_my_feelings_button', 0);
	this.the_eve.loadTexture('the_eve_button', 0);
	
	this.game.global.songstring = 'now';
	this.game.global.songtime = 218000;
	console.log(this.game.global.songstring);
};

MenuState._setSongLoveIsTrue = function() {
	this.this_guy.loadTexture('this_guy_button', 0);
	this.attention.loadTexture('attention_button', 0);
	this.full_moon.loadTexture('full_moon_button', 0);
	this.troublemaker.loadTexture('troublemaker_button', 0);
	this.now.loadTexture('now_button', 0);
	this.love_is_true.loadTexture('love_is_true_button', 1);
	this.summer_summer_sweet.loadTexture('summer_summer_sweet_button', 0);
	this.lay_it_down.loadTexture('lay_it_down_button', 0);
	this.rollin.loadTexture('rollin_button', 0);
	this.in_my_feelings.loadTexture('in_my_feelings_button', 0);
	this.the_eve.loadTexture('the_eve_button', 0);
	
	this.game.global.songstring = 'love_is_true';
	this.game.global.songtime = 149000;
	console.log(this.game.global.songstring);
};

MenuState._setSongSummerSummerSweet = function() {
	this.this_guy.loadTexture('this_guy_button', 0);
	this.attention.loadTexture('attention_button', 0);
	this.full_moon.loadTexture('full_moon_button', 0);
	this.troublemaker.loadTexture('troublemaker_button', 0);
	this.now.loadTexture('now_button', 0);
	this.love_is_true.loadTexture('love_is_true_button', 0);
	this.summer_summer_sweet.loadTexture('summer_summer_sweet_button', 1);
	this.lay_it_down.loadTexture('lay_it_down_button', 0);
	this.rollin.loadTexture('rollin_button', 0);
	this.in_my_feelings.loadTexture('in_my_feelings_button', 0);
	this.the_eve.loadTexture('the_eve_button', 0);
	
	this.game.global.songstring = 'summer_summer_sweet';
	this.game.global.songtime = 99000;
	console.log(this.game.global.songstring);
}

MenuState._setSongLayItDown = function() {
	this.this_guy.loadTexture('this_guy_button', 0);
	this.attention.loadTexture('attention_button', 0);
	this.full_moon.loadTexture('full_moon_button', 0);
	this.troublemaker.loadTexture('troublemaker_button', 0);
	this.now.loadTexture('now_button', 0);
	this.love_is_true.loadTexture('love_is_true_button', 0);
	this.summer_summer_sweet.loadTexture('summer_summer_sweet_button', 0);
	this.lay_it_down.loadTexture('lay_it_down_button', 1);
	this.rollin.loadTexture('rollin_button', 0);
	this.in_my_feelings.loadTexture('in_my_feelings_button', 0);
	this.the_eve.loadTexture('the_eve_button', 0);
	
	this.game.global.songstring = 'lay_it_down';
	this.game.global.songtime = 186000;
	console.log(this.game.global.songstring);
};

MenuState._setSongRollin = function() {
	this.this_guy.loadTexture('this_guy_button', 0);
	this.attention.loadTexture('attention_button', 0);
	this.full_moon.loadTexture('full_moon_button', 0);
	this.troublemaker.loadTexture('troublemaker_button', 0);
	this.now.loadTexture('now_button', 0);
	this.love_is_true.loadTexture('love_is_true_button', 0);
	this.summer_summer_sweet.loadTexture('summer_summer_sweet_button', 0);
	this.lay_it_down.loadTexture('lay_it_down_button', 0);
	this.rollin.loadTexture('rollin_button', 1);
	this.in_my_feelings.loadTexture('in_my_feelings_button', 0);
	this.the_eve.loadTexture('the_eve_button', 0);
	
	this.game.global.songstring = 'rollin';
	this.game.global.songtime = 269000;
	console.log(this.game.global.songstring);
};

MenuState._setSongInMyFeelings = function() {
	this.this_guy.loadTexture('this_guy_button', 0);
	this.attention.loadTexture('attention_button', 0);
	this.full_moon.loadTexture('full_moon_button', 0);
	this.troublemaker.loadTexture('troublemaker_button', 0);
	this.now.loadTexture('now_button', 0);
	this.love_is_true.loadTexture('love_is_true_button', 0);
	this.summer_summer_sweet.loadTexture('summer_summer_sweet_button', 0);
	this.lay_it_down.loadTexture('lay_it_down_button', 0);
	this.rollin.loadTexture('rollin_button', 0);
	this.in_my_feelings.loadTexture('in_my_feelings_button', 1);
	this.the_eve.loadTexture('the_eve_button', 0);
	
	this.game.global.songstring = 'in_my_feelings';
	this.game.global.songtime = 216000;
	console.log(this.game.global.songstring);
};

MenuState._setSongTheEve = function() {
	this.this_guy.loadTexture('this_guy_button', 0);
	this.attention.loadTexture('attention_button', 0);
	this.full_moon.loadTexture('full_moon_button', 0);
	this.troublemaker.loadTexture('troublemaker_button', 0);
	this.now.loadTexture('now_button', 0);
	this.love_is_true.loadTexture('love_is_true_button', 0);
	this.summer_summer_sweet.loadTexture('summer_summer_sweet_button', 0);
	this.lay_it_down.loadTexture('lay_it_down_button', 0);
	this.rollin.loadTexture('rollin_button', 0);
	this.in_my_feelings.loadTexture('in_my_feelings_button', 0);
	this.the_eve.loadTexture('the_eve_button', 1);
	
	this.game.global.songstring = 'the_eve';
	this.game.global.songtime = 172000;
	console.log(this.game.global.songstring);
};

//Difficulty setting functions
MenuState._setDifficulty1 = function() {
	this.one.loadTexture('one', 1);
	this.two.loadTexture('two', 0);
	this.three.loadTexture('three', 0);
	this.four.loadTexture('four', 0);
	
	this.game.global.difficulty = 1;
	this.game.global.spawntime = 500;
	console.log(this.game.global.difficulty);
	
}
MenuState._setDifficulty2 = function() {
	this.one.loadTexture('one', 0);
	this.two.loadTexture('two', 1);
	this.three.loadTexture('three', 0);
	this.four.loadTexture('four', 0);
	
	this.game.global.difficulty = 2;
	this.game.global.spawntime = 400;
	console.log(this.game.global.difficulty);
	
}
MenuState._setDifficulty3 = function() {
	this.one.loadTexture('one', 0);
	this.two.loadTexture('two', 0);
	this.three.loadTexture('three', 1);
	this.four.loadTexture('four', 0);
	
	this.game.global.difficulty = 3;
	this.game.global.spawntime = 250;
	console.log(this.game.global.difficulty);
	
}
MenuState._setDifficulty4 = function() {
	this.one.loadTexture('one', 0);
	this.two.loadTexture('two', 0);
	this.three.loadTexture('three', 0);
	this.four.loadTexture('four', 1);
	
	this.game.global.difficulty = 4;
	this.game.global.spawntime = 50;
	console.log(this.game.global.difficulty);
}
MenuState._startGame = function() {
	this.game.state.start('play', true, false);
}