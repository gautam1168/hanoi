class ChainreactionScene extends Phaser.Scene {
	constructor(test) {
		super({
			key: 'ChainreactionScene'
		});
		this.W = window.innerWidth;
		this.H = window.innerHeight;
		this.numbers = [];
		this.map = null;
	}

	preload() {
		this.load.image('background', 'assets/stack/background.png');
		this.load.image('base', 'assets/images/chainreactionBase.png');
		this.load.image('greenball', 'assets/images/greenball.png');
	}

	create() {
		this.map = this.make.tilemap({ tileWidth: 42, tileHeight: 42, width: 20, height:20 });
		let tiles = this.map.addTilesetImage('base');
		let layer = this.map.createBlankDynamicLayer('layer', tiles);
		layer.fill(0, 0, 0, this.map.width, this.map.height);
		layer = this.map.convertLayerToStatic(layer);
		window.layer = layer;
		let ball = this.add.image(21, 21, 'greenball');
		// layer.setScale(3)
	}

	update(time, delta) {
		if (this.input.manager.activePointer.isDown) {
			let worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
			let pointerTileX = this.map.worldToTileX(worldPoint.x);
	    	let pointerTileY = this.map.worldToTileY(worldPoint.y);

			this.add.image(pointerTileX*42 + 21, pointerTileY*42 + 21, 'greenball');
		}
	}
}

export default ChainreactionScene;
