import 'phaser';
// import BootScene from './BootScene';
// import MarioBrosScene from './MarioBrosScene';
// import TitleScene from './TitleScene';
import GameOfLifeScene from './GameOfLifeScene';
import ChainreactionScene from './ChainreactionScene';


let config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: window.innerWidth,
    height: window.innerHeight,
    scaleMode: 0, //Phaser.ScaleManager.EXACT_FIT,
    physics: {
        default: 'matter',
		matter: {
			debug: false
		}
    },
	backgroundColor: '#22262a',
    scene: [
        // BootScene,
        // TitleScene,
        // MarioBrosScene,
		// GameOfLifeScene,
		ChainreactionScene
    ]
};
window.game = new Phaser.Game(config);

/*
https://codepen.io/samme/pen/JMVBeV*/
