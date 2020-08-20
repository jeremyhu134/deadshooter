class DandVScene extends Phaser.Scene {
    constructor() {
		super({ key: 'DandVScene' })
	}
    preload(){
        //images
        this.load.image('victory','tf2images/victory.png');
        this.load.image('defeat','tf2images/defeat.png');
        this.load.audio('victorys', 'tf2images/victory.mp3');
        this.load.audio('defeats', 'tf2images/defeat.mp3');
        //audio
    }
    create() {
        var victory = this.sound.add('victorys');
        var defeat = this.sound.add('defeats');
        if(gameState.status === 'victory'){
            gameState.image = this.add.image(150,200,'victory').setOrigin(0,0);
            victory.play();
            this.time.addEvent({
                delay: 10000,
                callback: ()=>{
                    this.scene.stop('DandVScene');
                    this.scene.stop('IntroScene');
                    this.scene.start('MenuScene');
                },  
                startAt: 0,
                timeScale: 1
            }); 
        }
        else if(gameState.status === 'defeat'){
            gameState.image = this.add.image(150,200,'defeat').setOrigin(0,0);
            defeat.play();
            this.time.addEvent({
                delay: 10000,
                callback: ()=>{
                    this.scene.stop('DandVScene');
                    this.scene.stop('IntroScene');
                    this.scene.start('MenuScene'); 
                },  
                startAt: 0,
                timeScale: 1
            });
        }
	}
    update(){
        
    }
}