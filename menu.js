class MenuScene extends Phaser.Scene {
    constructor() {
		super({ key: 'MenuScene' })
	}
    preload(){
        this.load.image('headquarters','tf2images/headquarters.png');
        this.load.image('nextmissionbutton','tf2images/nextmissionbutton.png');
        this.load.image('title','tf2images/title.png');
        this.load.spritesheet('idlemedic','tf2images/idlemedic.png',{frameWidth: 50,frameHeight:80});
        this.load.spritesheet('idleengineer','tf2images/idleengineer.png',{frameWidth: 50,frameHeight:80});
        this.load.spritesheet('idlepyro','tf2images/idlepyro.png',{frameWidth: 50,frameHeight:80});
        this.load.image('idledemoman','tf2images/idledemoman.png');
        this.load.image('dialoguebox','tf2images/dialoguebox.png');
        //audio
        this.load.audio('headquartersm', 'tf2images/headquartersmusic.mp3');
    }
    create() {
        gameState.dialogueover = false;
        gameState.loadSave();
        var loopSound = {
            loop: true,
            volume: 100
        }
        var hqm = this.sound.add('headquartersm');
        hqm.play(loopSound);
        this.add.image(0,0,'headquarters').setOrigin(0,0);
        this.add.image(10,10,'title').setOrigin(0,0);
        this.anims.create({
            key: 'medicidle',
            repeat: -1,
            frameRate: 5,
            frames:this.anims.generateFrameNames('idlemedic',{start: 3,end: 0})
        });
        this.anims.create({
            key: 'engineeridle',
            repeat: -1,
            frameRate: 5,
            frames:this.anims.generateFrameNames('idleengineer',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'pyroidle',
            repeat: -1,
            frameRate: 5,
            frames:this.anims.generateFrameNames('idlepyro',{start: 0,end: 3})
        });
        var idlemedic = this.add.sprite(400,155,'idlemedic').setOrigin(0,0);
        idlemedic.anims.play('medicidle',true);
        var idlemedic = this.add.sprite(280,155,'idleengineer').setOrigin(0,0);
        idlemedic.anims.play('engineeridle',true);
        var idlemedic = this.add.sprite(125,183,'idlepyro').setOrigin(0,0);
        idlemedic.anims.play('pyroidle',true);
        var idledemoman = this.add.sprite(550,210,'idledemoman').setOrigin(0,0);
        
        var missionbutton = this.add.image(550,400,'nextmissionbutton').setOrigin(0,0).setInteractive();
        missionbutton.on('pointerup', () => {
            if(gameState.dialogueover === true){
                if(gameState.missionnumber == 1){
                    hqm.setMute(true);
                    this.scene.stop('MenuScene');
                    this.scene.start('IntroScene');
                }
                else if(gameState.missionnumber == 2){
                    hqm.setMute(true);
                    this.scene.stop('MenuScene');
                    this.scene.start('Mission2Scene');
                }
                else if(gameState.missionnumber == 3){
                    var newstext = this.add.text(500, 300, `New missions\n coming soon!`, { fontSize: 'bold 30px', fill: '#FFFFFF' });
                    this.time.addEvent({
                        delay: 3000,
                        callback: ()=>{
                            newstext.destroy();
                        },  
                        startAt: 0,
                        timeScale: 1
                    }); 
                }
                else {
                    console.log('suc')
                }
            }
		});
        if(gameState.missionnumber == 2 && gameState.dialogueover === false){
            gameState.dialoguenumber = 0;
            gameState.dialogueswitch = 2;
            gameState.medicdialogue = ['Good job scout, with dustbowl secured we can finally move on\n to our next location!'];
            gameState.redscoutdialogue = ['Thanks Doc! Those roboheads don\'t know what\'s commin.'];
            gameState.dialoguebox = this.add.image(50,400,'dialoguebox').setOrigin(0,0);
            gameState.medictext = this.add.text(65, 445, `RedMedic = ${gameState.medicdialogue[gameState.dialoguenumber]}`, { fontSize: '15px', fill: '#00000' });
            gameState.dialoguecooldown = 50;
            gameState.redscouttext = this.add.text(65, 445, ``, { fontSize: '15px', fill: '#00000' });
            this.time.addEvent({
                delay: 1,
                callback: ()=>{
                    gameState.dialoguecooldown -= 1;
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            }); 
            gameState.dialogue = function(scene){
                scene.input.on('pointerdown', () => {
                    if(gameState.dialoguecooldown <= 0 && gameState.dialogueover === false){
                        if(gameState.dialogueswitch == 1){
                            gameState.redscouttext.destroy();
                            gameState.medictext = scene.add.text(65, 445, `RedMedic = ${gameState.medicdialogue[gameState.dialoguenumber]}`, { fontSize: '15px', fill: '#00000' });
                            gameState.dialogueswitch = 2;
                        }
                        else if(gameState.dialogueswitch == 2){
                            gameState.medictext.destroy();
                            gameState.scouttext = scene.add.text(65, 445, `RedScout = ${gameState.redscoutdialogue[gameState.dialoguenumber]}`, { fontSize: '15px', fill: '#00000' });
                            gameState.dialoguenumber += 1;
                            gameState.dialogueswitch = 1;
                        }
                        gameState.dialoguecooldown = 50;
                    }
                });
                if(gameState.dialoguenumber === 1 && gameState.dialogueswitch === 2){
                    gameState.dialogueover = true;
                    gameState.scouttext.destroy();
                    gameState.medictext.destroy();
                    gameState.dialoguebox.destroy();
                }
            }
        }
        if(gameState.missionnumber == 3 && gameState.dialogueover === false){
            gameState.dialoguenumber = 0;
            gameState.dialogueswitch = 2;
            gameState.medicdialogue = ['Oooo. Two missions completed! Well done scout. Did those\n robots give any trouble?'];
            gameState.redscoutdialogue = ['No way those tincans come close to beating me baby.'];
            gameState.dialoguebox = this.add.image(50,400,'dialoguebox').setOrigin(0,0);
            gameState.medictext = this.add.text(65, 445, `RedMedic = ${gameState.medicdialogue[gameState.dialoguenumber]}`, { fontSize: '15px', fill: '#00000' });
            gameState.dialoguecooldown = 50;
            gameState.redscouttext = this.add.text(65, 445, ``, { fontSize: '15px', fill: '#00000' });
            this.time.addEvent({
                delay: 1,
                callback: ()=>{
                    gameState.dialoguecooldown -= 1;
                },  
                startAt: 0,
                timeScale: 1,
                repeat: -1
            }); 
            console.log(gameState.dialoguecooldown)
            gameState.dialogue = function(scene){
                scene.input.on('pointerdown', () => {
                    if(gameState.dialoguecooldown <= 0 && gameState.dialogueover === false){
                        if(gameState.dialogueswitch == 1){
                            gameState.redscouttext.destroy();
                            gameState.medictext = scene.add.text(65, 445, `RedMedic = ${gameState.medicdialogue[gameState.dialoguenumber]}`, { fontSize: '15px', fill: '#00000' });
                            gameState.dialogueswitch = 2;
                        }
                        else if(gameState.dialogueswitch == 2){
                            gameState.medictext.destroy();
                            gameState.scouttext = scene.add.text(65, 445, `RedScout = ${gameState.redscoutdialogue[gameState.dialoguenumber]}`, { fontSize: '15px', fill: '#00000' });
                            gameState.dialoguenumber += 1;
                            gameState.dialogueswitch = 1;
                        }
                        gameState.dialoguecooldown = 50;
                    }
                });
                if(gameState.dialoguenumber === 1 && gameState.dialogueswitch === 2){
                    gameState.dialogueover = true;
                    gameState.scouttext.destroy();
                    gameState.medictext.destroy();
                    gameState.dialoguebox.destroy();
                }
            }
        }
        else {
            gameState.dialogueover = true;
        }
	}
    update(){
        if(gameState.dialogueover === false){
            gameState.dialogue(this);
        }
        else {
            
        }
    }
}