class GameOfLifeScene extends Phaser.Scene {
	constructor(test) {
		super({
			key: 'GameOfLifeScene'
		});
		this.W = window.innerWidth;
		this.H = window.innerHeight;
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
		target.on('pointerdown', function(pointer) {
			console.log(pointer);
		});
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
		}
	}

	// create() {
	// 	//tube1
	// 	let rect = this.add.sprite(100, 400, 'rect');
	// 	rect.setDisplaySize(20, 50);
	// 	let wall = this.matter.add.gameObject(rect, {shape: {type: 'rectangle', width: 20, height: 50}} );
	// 	wall.setStatic(true);
	// 	wall.setAngle(90);
	//
	// 	rect = this.add.sprite(65, 334, 'rect');
	// 	rect.setDisplaySize(20, 150);
	// 	wall = this.matter.add.gameObject(rect, {shape: {type: 'rectangle', width: 20, height: 150}} );
	// 	wall.setStatic(true);
	//
	// 	rect = this.add.sprite(135, 334, 'rect');
	// 	rect.setDisplaySize(20, 150);
	// 	wall = this.matter.add.gameObject(rect, {shape: {type: 'rectangle', width: 20, height: 150}} );
	// 	wall.setStatic(true);
	//
	// 	//tube2
	// 	rect = this.add.sprite(200, 400, 'rect');
	// 	rect.setDisplaySize(20, 50);
	// 	wall = this.matter.add.gameObject(rect, {shape: {type: 'rectangle', width: 20, height: 50}} );
	// 	wall.setStatic(true);
	// 	wall.setAngle(90);
	//
	// 	rect = this.add.sprite(165, 334, 'rect');
	// 	rect.setDisplaySize(20, 150);
	// 	wall = this.matter.add.gameObject(rect, {shape: {type: 'rectangle', width: 20, height: 150}} );
	// 	wall.setStatic(true);
	//
	// 	rect = this.add.sprite(235, 334, 'rect');
	// 	rect.setDisplaySize(20, 150);
	// 	wall = this.matter.add.gameObject(rect, {shape: {type: 'rectangle', width: 20, height: 150}} );
	// 	wall.setStatic(true);
	//
	// 	//tube3
	// 	rect = this.add.sprite(300, 400, 'rect');
	// 	rect.setDisplaySize(20, 50);
	// 	wall = this.matter.add.gameObject(rect, {shape: {type: 'rectangle', width: 20, height: 50}} );
	// 	wall.setStatic(true);
	// 	wall.setAngle(90);
	//
	// 	rect = this.add.sprite(265, 334, 'rect');
	// 	rect.setDisplaySize(20, 150);
	// 	wall = this.matter.add.gameObject(rect, {shape: {type: 'rectangle', width: 20, height: 150}} );
	// 	wall.setStatic(true);
	//
	// 	rect = this.add.sprite(335, 334, 'rect');
	// 	rect.setDisplaySize(20, 150);
	// 	wall = this.matter.add.gameObject(rect, {shape: {type: 'rectangle', width: 20, height: 150}} );
	// 	wall.setStatic(true);
	//
	// 	let number1 = this.add.text(100, 200, '2', { font: '32px Arial', fill: '#ffffff' });
	// 	number1 = this.matter.add.gameObject(number1, {shape: {type: 'rectangle', width: 40, height: 40}});
	// 	number1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 40, 40), function(number1, x, y, sprite) {
	// 			return (x > number1.x && y > number1.y && x < number1.width && y < number1.height);
	// 	});
	// 	number1.on('drag', function(pointer, x, y) {
	// 		number1.setPosition(x, y);
	// 	})
	// 	number1.on('dragstart', function(pointer, x, y) {
	// 		number1.setIgnoreGravity(true);
	// 	})
	// 	number1.on('dragend', function(pointer, x, y) {
	// 		number1.setIgnoreGravity(false);
	// 	})
	// 	this.input.setDraggable(number1, true);
	//
	// 	let number2 = this.add.text(100, 150, '1', { font: '32px Arial', fill: '#ffffff' });
	// 	number2 = this.matter.add.gameObject(number2, {shape: {type: 'rectangle', width: 40, height: 40}});
	// 	number2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 40, 40), function(number2, x, y, sprite) {
	// 			return (x > number2.x && y > number2.y && x < number2.width && y < number2.height);
	// 	});
	// 	number2.on('drag', function(pointer, x, y) {
	// 		number2.setPosition(x, y);
	// 	})
	// 	number2.on('dragstart', function(pointer, x, y) {
	// 		number2.setIgnoreGravity(true);
	// 	})
	// 	number2.on('dragend', function(pointer, x, y) {
	// 		number2.setIgnoreGravity(false);
	// 	})
	// 	this.input.setDraggable(number2, true);
	//
	// 	let number3 = this.add.text(100, 100, '3', { font: '32px Arial', fill: '#ffffff' });
	// 	number3 = this.matter.add.gameObject(number3, {shape: {type: 'rectangle', width: 40, height: 40}});
	// 	number3.setInteractive(new Phaser.Geom.Rectangle(0, 0, 40, 40), function(number3, x, y, sprite) {
	// 			return (x > number3.x && y > number3.y && x < number3.width && y < number3.height);
	// 	});
	// 	number3.on('drag', function(pointer, x, y) {
	// 		number3.setPosition(x, y);
	// 	})
	// 	number3.on('dragstart', function(pointer, x, y) {
	// 		number3.setIgnoreGravity(true);
	// 	})
	// 	number3.on('dragend', function(pointer, x, y) {
	// 		number3.setIgnoreGravity(false);
	// 	})
	// 	this.input.setDraggable(number3, true);
	// }

}

export default GameOfLifeScene;
