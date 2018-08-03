function spawnEnemy() {
	console.log('Enemy Created');
	var enemy = enemies.getFirstExists(false);
	enemy.reset(GAME_WIDTH, game.rnd.integerInRange(50, GAME_HEIGHT - 50));
	enemy.body.velocity.x = -250;
	enemy.life = ENEMY_LIFE;
}

function hurtPlayer(player, enemy) {
	console.log('Ouch!');
	// Sound effects/visual effects
	playerHit.play();
	var explosion = explosions.getFirstExists(false);
	explosion.reset(player.body.x + 15, player.body.y);
	explosion.play('smallBoom', 60, false, true);

	// Logic
	enemy.kill();
	player.life -= 50;
	hpText.text = 'HP: ' + player.life.toString();

	if(player.life <= 0) {
		player.kill();
		gameOver();
	} else if(player.life <= 50) {
		player.tint = '0xff0000';
	}
}

function weaponEnemy(weapon, enemy) {
	// Sound and visual effects
	playerHit.play();
	var explosion = explosions.getFirstExists(false);
	explosion.reset(enemy.body.x, enemy.body.y);
	explosion.play('smallBoom', 60, false, true);

	// Logic
	enemy.life -= WEAPONS[currentWeapon].damage;
	if (enemy.life <= 0) {
		enemy.kill();
		addScore(10);
	}
	weapon.kill();
}