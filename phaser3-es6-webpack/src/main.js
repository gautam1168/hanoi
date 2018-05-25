import 'phaser';
// import BootScene from './BootScene';
// import MarioBrosScene from './MarioBrosScene';
// import TitleScene from './TitleScene';
import GameOfLifeScene from './GameOfLifeScene';


let config = {
    type: Phaser.WEBGL,
    parent: 'content',
    width: window.innerWidth,
    height: window.innerHeight,
    scaleMode: 0, //Phaser.ScaleManager.EXACT_FIT,
    physics: {
        default: 'matter',
		matter: {
			debug: true
		}
    },
	backgroundColor: '#22262a',
    scene: [
        // BootScene,
        // TitleScene,
        // MarioBrosScene,
		GameOfLifeScene
    ]
};
window.game = new Phaser.Game(config);

/*
https://codepen.io/samme/pen/JMVBeV*/
