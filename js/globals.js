// Game-wide constants
var DEFAULT_SPEED = 300;
var GAME_WIDTH = 800;
var GAME_HEIGHT = 500;
var STARTING_LIFE = 150;
var ENEMY_LIFE = 100;
var SWITCH_WEAPON_TIMER = 500;
var WEAPONS = [
	{name: 'Laser', velocity: 700, timer: 180, offset: 20, damage: 25},
	{name: 'Missile', velocity: 500, timer: 1000, offset: 20, damage: 100}
];

// Global Variables
var player;
var enemies;
var lasers;
var explosions;
var cursors;
var music, lasersfx;
var hpText, scoreText;
var weaponTimer = 0;
var switchTimer = 0;
var currentWeapon = 0;