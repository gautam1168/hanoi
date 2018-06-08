class GameOfLifeScene extends Phaser.Scene {
	constructor(test) {
		super({
			key: 'GameOfLifeScene'
		});
		this.W = window.innerWidth;
		this.H = window.innerHeight;
		this.numbers = [];
	}

	preload() {
		// this.load.tilemapTiledJSON('map', 'assets/tilemaps/super-mario.json');
		this.load.image('background', 'assets/stack/background.png');
		this.load.image('tube', 'assets/stack/tube.png');
		this.load.image('one', 'assets/stack/one.png');
		this.load.image('two', 'assets/stack/two.png');
		this.load.image('three', 'assets/stack/three.png');
		this.load.image('four', 'assets/stack/four.png');
		this.load.image('five', 'assets/stack/five.png');
		this.load.image('target', 'assets/stack/target.png');
		// this.load.image('ground', 'assets/images/super-mario.png');
		// this.load.image('player', 'assets/images/player.png');
		// this.load.image('rect', 'assets/images/rect.png')
		// this.load.spritesheet('sheet', 'assets/images/super-mario.png', { frameWidth: 16, frameHeight: 16 });
	}

	create() {
		let background = this.add.image(0, 0, 'background');
		background.setDisplaySize(2*this.W, 2*this.H);
		this.createTube(0.2);
		this.createTube(0.5);
		this.createTube(0.8);
		this.createNumbers(0.2);
	}

	createTube(leftoffset) {
		let W = this.W, H = this.H;

		let topOffset = 0.6;

		let tube = this.add.sprite(leftoffset*W, (topOffset - 0.02)*H, 'tube');
		tube.setDisplaySize(tube.width, 1.1*tube.height);

		let base = this.matter.add.rectangle(leftoffset*W, topOffset*H + 0.5*tube.height + 10,
												tube.width, 20);
		base.isStatic = true;

		let leftwall = this.matter.add.rectangle(leftoffset*W - 0.5*tube.width - 10, topOffset*H, 20, tube.height);
		leftwall.isStatic = true;

		let rightwall = this.matter.add.rectangle(leftoffset*W + 0.5*tube.width + 10, topOffset*H, 20, tube.height);
		rightwall.isStatic = true;

		let target = this.add.sprite(leftoffset*W, (topOffset - 0.02)*H - tube.height*0.7, 'target');
		target.setInteractive();
	}

	createNumbers(leftoffset) {
		let W = this.W, H = this.H;
		let numberAssets = [ 'three', 'four', 'one', 'two', 'five' ];

		for (let i = 0; i < numberAssets.length; i++) {
			let number = this.add.sprite(leftoffset*W, 0.1*i*H, numberAssets[i]);
			number = this.matter.add.gameObject(number, {
				shape: {type: 'rectangle', width: number.width, height: number.height + 8}
			});
			number.setInteractive(new Phaser.Geom.Rectangle(0, 0, number.width, number.height),
			function(number, x, y, sprite) {
					return (x > number.x && y > number.y && x < number.width && y < number.height);
			});
			number.on('drag', function(pointer, x, y) {
				number.setPosition(x, y);
			})
			number.on('dragstart', function(pointer, x, y) {
				number.setIgnoreGravity(true);
				number.setAngle(0);
				number.setAngularVelocity(0);
			})
			number.on('dragend', function(pointer, x, y) {
				number.setIgnoreGravity(false);
				number.setAngle(0);
				number.setAngularVelocity(0);
			})
			this.input.setDraggable(number, true);
			this.numbers.push(number);
		}
	}
}

export default GameOfLifeScene;
