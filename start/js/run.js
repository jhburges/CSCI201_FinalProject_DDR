/**
 * 
 */

window.onload = function() {
	// Create a new game window, AUTO checks to use WEBGL for graphics
	let game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
	//Add 'PlayState', an object describing the setup/state of the game, to the game; 'play' is the key
	game.state.add('play', PlayState);
	game.state.add('menu', MenuState);
	game.state.add('boot', BootState);
	//game.state.add('load', LoadState);
	//Start the game
	game.state.start('boot');
	
	game.global = {
		difficulty: 1,
		spawntime: 0,
		songstring: 'this_guy',
		songtime: 199000,
		max_score: 0
	}
	
	
	
	
};