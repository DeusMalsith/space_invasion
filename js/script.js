var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game', {
	init: init,
	preload: preload,
	create: create, 
	update: update
});

function init() {
	console.log('init');
}

function preload() {
	// Initialize arcade physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// Load images for later use
	game.load.image('bg', '../assets/img/cool-space-background.jpg');
	game.load.image('player', '../assets/img/ship.png');
	game.load.image('laser', '../assets/img/beam.png');
	game.load.image('missile', '../assets/img/missile.png');
	game.load.image('enemy', '../assets/img/enemy.png');

	// Load animations
	game.load.spritesheet('smallBoom', '../assets/img/explosion.png', 64, 64);

	// Load audio files for later use
	game.load.audio('music', '../assets/audio/Shadelike.mp3');
	game.load.audio('lasersfx', ['../assets/audio/laser.ogg', '..assets/audio/laser.mp3']);
	game.load.audio('missilesfx', '../assets/audio/Missile.mp3');
	game.load.audio('playerHit', ['../assets/audio/explosion.mp3', '../assets/audio/explosion.ogg']);
}

function create() {
	// Creat the background and make it scroll
	background = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
	background.autoScroll(-30, 0);

	// Set up sounds
	music = game.add.audio('music', 0.3);
	lasersfx = game.add.audio('lasersfx', 0.05);
	missilesfx = game.add.audio('missilesfx', 1);
	playerHit = game.add.audio('playerHit', 0.06);
	music.play();

	// Creat player in the game
	player = game.add.sprite(100, 250, 'player');
	game.physics.arcade.enable(player);
	player.body.collideWorldBounds = true;
	player.score = 0;
	player.life = STARTING_LIFE;

	// Create laser objects for shooting
	lasers = game.add.group();
	lasers.enableBody = true;
	lasers.physicsBodyType = Phaser.Physics.ARCADE;
	lasers.createMultiple(20, 'laser');
	lasers.setAll('outOfBoundsKill', true);
	lasers.setAll('checkWorldBounds', true);

	// Create missile objects
	missiles = game.add.group();
	missiles.enableBody = true;
	missiles.physicsBodyType = Phaser.Physics.ARCADE;
	missiles.createMultiple(10, 'missile');
	missiles.setAll('outOfBoundsKill', true);
	missiles.setAll('checkWorldBounds', true);	

	// Create Enemies
	enemies = game.add.group();
	enemies = game.add.group();
	enemies.enableBody = true;
	enemies.physicsBodyType = Phaser.Physics.ARCADE;
	enemies.createMultiple(50, 'enemy');
	enemies.setAll('outOfBoundsKill', true);
	enemies.setAll('checkWorldBounds', true);
	enemies.forEach(function(enemy) {
		enemy.life = ENEMY_LIFE;
	});

	// Create Explosions
	explosions = game.add.group();
	explosions.createMultiple(10, 'smallBoom');
	explosions.setAll('anchor.x', 0);
	explosions.setAll('anxhor.y', 0);
	explosions.forEach(function(explosion) {
		explosion.animations.add('smallBoom');
	});

	// Add keyboard controls
	cursors = game.input.keyboard.createCursorKeys(); // Arrow keys
	game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR], Phaser.Keyboard.CTRL)

	// Add score and HP Text to the screen
	hpText = game.add.text(20, 20, 'HP: ' + player.life.toString(), {fill: '#fff'});
	scoreText = game.add.text(640, 20, 'Score: ' + player.score.toString(), {fill: '#fff'});

	// Create enemies in a loop
	game.time.events.loop(Phaser.Timer.SECOND * 2, spawnEnemy);

}

function update() {
	player.body.velocity.set(0);

	// Ship movement
	if(cursors.left.isDown && cursors.right.isDown) {
		player.body.velocity.x = 0;
	} else if(cursors.left.isDown) {
		player.body.velocity.x = -DEFAULT_SPEED;
	} else if(cursors.right.isDown) {
		player.body.velocity.x = DEFAULT_SPEED;
	} 

	
	if(cursors.up.isDown && cursors.down.isDown) {
		player.body.velocity.y = 0;
	} else if(cursors.up.isDown) {
		player.body.velocity.y = -DEFAULT_SPEED;
	} else if (cursors.down.isDown) {
		player.body.velocity.y = DEFAULT_SPEED;
	}

	// Fire laser
	if(game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)) {
		fireWeapon();
	}
	// Switch Weapon
	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		switchWeapon();
	}

	// Define desired collisions
	game.physics.arcade.overlap(player, enemies, hurtPlayer);
	game.physics.arcade.overlap(lasers, enemies, weaponEnemy);
	game.physics.arcade.overlap(missiles, enemies, weaponEnemy);
}