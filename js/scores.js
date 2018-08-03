function addScore(amount) {
	player.score += amount;
	scoreText.text = 'Score: ' + player.score.toString();
}

function gameOver() {
	console.log('Game Over');
	music.pause();
	var gameOverText = game.add.text(GAME_WIDTH / 2.5, GAME_HEIGHT / 2, 'GAME OVER', {fill: '#fff'});

	// swal({
	// 	title: 'Good Job!',
	// 	text: 'Thanks for playing!',
	// 	type: 'warning',
	// 	showCancelButtonText: false,
	// 	confirmButtonText: 'Alright then',
	// 	closeOnConfirm: true
	// });

}