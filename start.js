class StartScene extends Phaser.Scene {
    constructor() {
		super({ key: 'StartScene' })
	}
    preload(){
        this.load.image('Level1','assets/level1.png');
    }
    create() {
        gameState.level1 = this.add.sprite(200, 150, 'Level1').setScale(1.5).setInteractive();
		this.add.text( 500, 20, 'Dead Shooter!', {fill: '#000000', fontSize: '40px'})
		gameState.level1.on('pointerdown', () => {
			this.scene.stop('StartScene');
			this.scene.start('Level1');
		});
	}
}