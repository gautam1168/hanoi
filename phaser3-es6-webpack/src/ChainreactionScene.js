class Board {
	constructor() {
		this.player = 1;
		this.balls = new Array(20).fill(0).map(e => new Array(20).fill(0));
		this.ballkeys = {
			1: ['redball', 'reddoublet', 'redtriplet'],
			2: ['blueball', 'bluedoublet', 'bluetriplet'],
			3: ['greenball', 'greendoublet', 'greentriplet'],
			4: ['yellowball', 'yellowdoublet', 'yellowtriplet']
		};
	}

	getPlayerKey() {
		return this.ballkeys[this.player][0];
	}

	setAt(x, y) {
		let imagekey, explode = false;
		if (this.balls[x][y] == 0) {
			imagekey = this.ballkeys[this.player][0];
			this.balls[x][y] = imagekey;
		} else {
			let conf = this.getCellconfiguration(x, y);
			if (this.player == conf.player) {
				if (conf.keyindex + 1 == this.ballkeys[this.player].length) {
					explode = true;
				} else {
					imagekey = this.ballkeys[this.player][conf.keyindex + 1];
					this.balls[x][y] = imagekey;
				}
			}
		}
		if (this.player == 4) {
			this.player = 1;
		} else {
			this.player += 1;
		}
		return {x: x*42 + 21, y: y*42 + 21, key: imagekey, explode: explode};
	}

	getCellconfiguration(x, y) {
		let key = this.balls[x][y];
		let players = Object.keys(this.ballkeys);
		for (let i = 0; i < players.length; i++) {
			let player = players[i];
			let keyindex = this.ballkeys[player].indexOf(key);
			if (keyindex >= 0) {
				return { player: player, keyindex: keyindex }
			}
		}
		return null;
	}

	explosionAt(x, y, ongoing) {
		if (!ongoing) {
			this.inactive = new Array(20).fill(0).map(e => new Array(20).fill(0));
		}
		if (this.inactive[x][y] == 0) {
			let conf = this.getCellconfiguration(x, y);
			this.balls[x][y] = 0;
			let returnconfs = [];

			if (this.inactive[x-1][y] == 0) {
				let leftimagekey, leftconf = this.getCellconfiguration(x-1, y), leftexplode = false;
				if (leftconf) {
					leftimagekey = this.ballkeys[conf.player][leftconf.keyindex + 1];
					if (leftconf.keyindex + 1 == 3) {
						leftexplode = true;
						leftimagekey = this.ballkeys[conf.player][leftconf.keyindex];
					}
				} else {
					leftimagekey = this.ballkeys[conf.player][0];
				}
				this.balls[x-1][y] = leftimagekey;
				returnconfs.push({x: (x-1)*42 + 21, y: y*42 + 21,     key: leftimagekey, 	explode: leftexplode, 	tileX: x-1, tileY: y  });
			}

			if (this.inactive[x+1][y] == 0) {
				let rightimagekey, rightconf = this.getCellconfiguration(x+1, y), rightexplode = false;
				if (rightconf) {
					rightimagekey = this.ballkeys[conf.player][rightconf.keyindex + 1];
					if (rightconf.keyindex + 1 == 3) {
						rightexplode = true;
						rightimagekey = this.ballkeys[conf.player][rightconf.keyindex];
					}
				} else {
					rightimagekey = this.ballkeys[conf.player][0];
				}
				this.balls[x+1][y] = rightimagekey;
				returnconfs.push({x: (x+1)*42 + 21, y: y*42 + 21,     key: rightimagekey, 	explode: rightexplode, 	tileX: x+1, tileY: y  });
			}

			if (this.inactive[x][y-1] == 0) {
				let topimagekey, topconf = this.getCellconfiguration(x, y-1), topexplode = false;
				if (topconf) {
					topimagekey = this.ballkeys[conf.player][topconf.keyindex + 1];
					if (topconf.keyindex + 1 == 3) {
						topexplode = true;
						topimagekey = this.ballkeys[conf.player][topconf.keyindex];
					}
				} else {
					topimagekey = this.ballkeys[conf.player][0];
				}
				this.balls[x][y-1] = topimagekey;
				returnconfs.push({x: x*42 + 21,     y: (y-1)*42 + 21, key: topimagekey, 		explode: topexplode, 	tileX: x,   tileY: y-1});
			}

			if (this.inactive[x][y+1] == 0) {
				let bottomimagekey, bottomconf = this.getCellconfiguration(x, y+1), bottomexplode = false;
				if (bottomconf) {
					bottomimagekey = this.ballkeys[conf.player][bottomconf.keyindex + 1];
					if (bottomconf.keyindex + 1 == 3) {
						bottomexplode = true;
						bottomimagekey = this.ballkeys[conf.player][bottomconf.keyindex];
					}
				} else {
					bottomimagekey = this.ballkeys[conf.player][0];
				}
				this.balls[x][y+1] = bottomimagekey;
				returnconfs.push({x: x*42 + 21, 	   y: (y+1)*42 + 21, key: bottomimagekey, 	explode: bottomexplode, tileX: x,   tileY: y+1});
			}
			this.inactive[x][y] = 1;
			return returnconfs;
		}
		return [];
	}
}

class ChainreactionScene extends Phaser.Scene {
	constructor(test) {
		super({
			key: 'ChainreactionScene'
		});
		this.W = window.innerWidth;
		this.H = window.innerHeight;
		this.numbers = [];
		this.map = null;
		this.board = new Board();
		this.ballimages = new Array(20).fill(0).map(e => new Array(20).fill(null));
		this.indicator = null;
	}

	preload() {
		this.load.image('background', 'assets/stack/background.png');
		this.load.image('base', 'assets/images/chainreactionBase.png');
		this.load.image('greenball', 'assets/images/greenball.png');
		this.load.image('blueball', 'assets/images/blueball.png');
		this.load.image('redball', 'assets/images/redball.png');
		this.load.image('yellowball', 'assets/images/yellowball.png');
		this.load.image('greendoublet', 'assets/images/greendoublet.png');
		this.load.image('bluedoublet', 'assets/images/bluedoublet.png');
		this.load.image('reddoublet', 'assets/images/reddoublet.png');
		this.load.image('yellowdoublet', 'assets/images/yellowdoublet.png');
		this.load.image('greentriplet', 'assets/images/greentriplet.png');
		this.load.image('bluetriplet', 'assets/images/bluetriplet.png');
		this.load.image('redtriplet', 'assets/images/redtriplet.png');
		this.load.image('yellowtriplet', 'assets/images/yellowtriplet.png');
		this.load.spritesheet('blueExplode', 'assets/images/blueExplode.png', {frameWidth:134.5 , frameHeight:100 , endFrame: 10});
	}

	create() {
		this.map = this.make.tilemap({ tileWidth: 42, tileHeight: 42, width: 20, height:20 });
		let tiles = this.map.addTilesetImage('base');
		let layer = this.map.createBlankDynamicLayer('layer', tiles);
		layer.fill(0, 0, 1, this.map.width, this.map.height);
		layer = this.map.convertLayerToStatic(layer);
		this.indicator = this.add.image(21, 21, this.board.getPlayerKey());
		let config = {
			key: 'blueExplodeAnimation',
			frames: this.anims.generateFrameNumbers('blueExplode', {prefix: 'blue_', start: 0, end: 10, first: 0 }),
			frameRate: 20,
			onComplete: this.spriteDestroyer.bind(this)
		}
		this.anims.create(config);
	}

	update(time, delta) {
		if (this.input.manager.activePointer.justUp) {
			this.updatingBallImage = true;
			let worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
			let pointerTileX = this.map.worldToTileX(worldPoint.x);
	    	let pointerTileY = this.map.worldToTileY(worldPoint.y);
			let conf = this.board.setAt(pointerTileX, pointerTileY);
			if (conf && !conf.explode) {
				if (this.ballimages[pointerTileX][pointerTileY] != null) {
					this.ballimages[pointerTileX][pointerTileY].destroy();
				}
				this.ballimages[pointerTileX][pointerTileY] = this.add.image(conf.x, conf.y, conf.key);
			} else if (conf && conf.explode) {
				let explodsprite = this.add.sprite(42*pointerTileX + 20, 42*pointerTileY - 2, 'blueExplode');
				this.ballimages[pointerTileX][pointerTileY].destroy();
				explodsprite.anims.play('blueExplodeAnimation');
			}
			if (this.indicator != null) {
				this.indicator.destroy();
			}
			this.indicator = this.add.image(21, 21, this.board.getPlayerKey());
		}
	}

	spriteDestroyer(sprite, animation) {
		sprite.destroy();
		let tileX = (sprite.x - 20)/42, tileY = (sprite.y + 2)/42;
		this.handleExplosionIn(tileX, tileY);
	}

	handleExplosionIn(pointerTileX, pointerTileY, ongoing) {
		let confs = this.board.explosionAt(pointerTileX, pointerTileY, ongoing);
		for (var i =0; i < confs.length; i++) {
			let conf = confs[i];
			if (this.ballimages[conf.tileX][conf.tileY] != null) {
				this.ballimages[conf.tileX][conf.tileY].destroy();
			}
			if (conf.explode) {
				let explodsprite = this.add.sprite(42*conf.tileX + 20, 42*conf.tileY - 2, 'blueExplode');
				explodsprite.anims.play('blueExplodeAnimation');
			} else {
				this.ballimages[conf.tileX][conf.tileY] = this.add.image(conf.x, conf.y, conf.key);
			}
		}
	}
}

export default ChainreactionScene;
