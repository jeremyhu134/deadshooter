class IntroScene extends Phaser.Scene {
    constructor() {
		super({ key: 'IntroScene' })
	}
    preload(){
        //backgrounds
        this.load.image('invisibleplatform','tf2images/invisibleplatform.png');
        this.load.image('dustbowlbg','tf2images/dustbowlbg.png');
        this.load.image('dialoguebox','tf2images/dialoguebox.png');
        this.load.image('arrowkey','tf2images/arrowkey.png');
        this.load.image('shootbutton','tf2images/shoot.png');
        //audio
        this.load.audio('pistol_shoot', 'tf2images/pistol_shoot.mp3');
        this.load.audio('westernmusic', 'tf2images/westernmusic.mp3');
        this.load.audio('scout_pain', 'tf2images/scout_pain.mp3');
        this.load.audio('roboscout_pain', 'tf2images/roboscout_pain.mp3');
        this.load.audio('roboscout_taunt', 'tf2images/roboscout_taunt.mp3');
        this.load.audio('redscout_taunt', 'tf2images/redscout_taunt.mp3');
        //characters
        this.load.spritesheet('redscout','tf2images/RedScout.png',{frameWidth: 45,frameHeight:65});
        this.load.spritesheet('roboscout','tf2images/RoboScout.png',{frameWidth: 45,frameHeight:65});
        //bullets
        this.load.image('bullet','tf2images/bullet.png');
    }
    create(){
        gameState.mobilecontrols = function(scene){
            scene.add.text(20, 510, `MobileControls :`, { fontSize: '15px', fill: '#FFFFFF' });
            gameState.jumpbutton = scene.add.image(180,500, 'arrowkey').setOrigin(0,0).setInteractive(); 
            gameState.shootbutton = scene.add.image(250,500, 'shootbutton').setOrigin(0,0).setInteractive(); 
            gameState.jumpbutton.on('pointerdown', () => {
                if(gameState.heroshooting === false){
                    if(!gameState.hero.body.touching.down){
                        gameState.hero.anims.play('scoutjump',true);
                    }
                    else {
                        gameState.hero.anims.play('scoutidle',true);
                    }
                    gameState.hero.body.checkCollision.down = true;
                    if(gameState.hero.body.touching.down && gameState.herojumpcooldown === false){
                        gameState.hero.setVelocityY(-500);
                        gameState.herojumpcooldown = true;
                        scene.time.addEvent({
                            delay: 1800,
                            callback: ()=>{
                                gameState.herojumpcooldown = false;
                            },  
                            startAt: 0,
                            timeScale: 1
                        }); 
                    }
                }
            });
            gameState.shootbutton.on('pointerdown', () => {
                if(gameState.heroshooting === false && gameState.hero.body.touching.down){
                    gameState.heroshooting = true;
                    gameState.hero.anims.play('scoutshoot',true);
                    scene.time.addEvent({
                        delay: 500,
                        callback: ()=>{
                            gameState.shootpistol.play();
                            gameState.herobullets.create(gameState.hero.x+30, gameState.hero.y, 'bullet').setGravityX(2000).setGravityY(-1000);
                        },  
                        startAt: 0,
                        timeScale: 1
                    }); 
                    scene.time.addEvent({
                        delay: 1000,
                        callback: ()=>{
                            gameState.heroshooting = false;
                        },  
                        startAt: 0,
                        timeScale: 1
                    }); 
                }
            });
        }
        gameState.playing = true;
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.keys = this.input.keyboard.addKeys('W,S,A,D,R,SPACE,SHIFT');
        gameState.dialogueover = false;
        this.add.image(0,0,'dustbowlbg').setOrigin(0,0);
        gameState.dialogueswitch = 1;
        gameState.dialoguenumber = 0;
        gameState.redscoutdialogue = ['What is this imposter doing here?','Whatever chucklenuts, you roboheads need go get outer here.','...Niceone.'];
        gameState.roboscoutdialogue = ['Imposter? If anything your the imposter. I\'m an upgraded\n version of you','Skullhead.'];
        gameState.dialoguebox = this.add.image(50,400,'dialoguebox').setOrigin(0,0);
        gameState.scouttext = this.add.text(65, 445, `RedScout = ${gameState.redscoutdialogue[gameState.dialoguenumber]}`, { fontSize: '15px', fill: '#00000' });
        gameState.dialoguecooldown = 50;
        gameState.roboscouttext = this.add.text(65, 445, ``, { fontSize: '15px', fill: '#00000' });
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
                    if(gameState.dialogueswitch === 1){
                        gameState.dialogueswitch = 2;
                    } 
                    else if(gameState.dialogueswitch === 2){
                        gameState.dialoguenumber += 1;
                        gameState.dialogueswitch = 1;
                    } 
                    if(gameState.dialogueswitch === 1){
                        gameState.roboscouttext.destroy();
                        gameState.scouttext = scene.add.text(65, 445, `RedScout = ${gameState.redscoutdialogue[gameState.dialoguenumber]}`, { fontSize: '15px', fill: '#00000' }); 
                    }
                    else if(gameState.dialogueswitch === 2){
                        gameState.scouttext.destroy();
                        gameState.roboscouttext = scene.add.text(65, 445, `RoboScout = ${gameState.roboscoutdialogue[gameState.dialoguenumber]}`, { fontSize: '15px', fill: '#00000' });
                    }
                    gameState.dialoguecooldown = 50;
                }
            });
            if(gameState.dialoguenumber === 2 && gameState.dialogueswitch === 2){
                gameState.dialogueover = true;
                gameState.scouttext.destroy();
                gameState.roboscouttext.destroy();
                gameState.dialoguebox.destroy();
                gameState.herohealthtext = scene.add.text(180, 250, `${gameState.herohealth}/20`, { fontSize: ' bold 20px', fill: '#00000'});
                gameState.enemyherohealthtext = scene.add.text(560, 250, `${gameState.enemyherohealth}/50`, { fontSize: 'bold 20px', fill: '#00000' });
                gameState.mobilecontrols(scene);
            }
        }
        gameState.westernmusic = this.sound.add('westernmusic');
        gameState.invisibleplatform = this.physics.add.staticGroup();
        gameState.invisibleplatform.create(0,350,'invisibleplatform').setOrigin(0,0).refreshBody(0);
        gameState.loopSound = {
            loop: true,
            volume: 1
        }
        gameState.westernmusic.play(gameState.loopSound);
        //animations
        this.anims.create({
            key: 'scoutidle',
            repeat: -1,
            frameRate: 5,
            frames:this.anims.generateFrameNames('redscout',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'scoutjump',
            repeat: -1,
            frameRate: 5,
            frames:this.anims.generateFrameNames('redscout',{start: 4,end: 4})
        });
        this.anims.create({
            key: 'scoutshoot',
            frameRate: 5,
            frames:this.anims.generateFrameNames('redscout',{start: 5,end: 8})
        });
        this.anims.create({
            key: 'roboscoutidle',
            repeat: -1,
            frameRate: 5,
            frames:this.anims.generateFrameNames('roboscout',{start: 0,end: 3})
        });
        this.anims.create({
            key: 'roboscoutshoot',
            repeat: -1,
            frameRate: 5,
            frames:this.anims.generateFrameNames('roboscout',{start: 4,end: 8})
        });
        //fighter
        gameState.hero = this.physics.add.sprite(250,317,'redscout');
        gameState.scoutpain = this.sound.add('scout_pain');
        gameState.scouttaunt = this.sound.add('redscout_taunt');
        gameState.herohealth = 20;
        gameState.herobullets = this.physics.add.group();
        gameState.herobullets.outOfBoundsKill = true;
        gameState.heroshooting = false;
        gameState.herojumpcooldown = false;
        this.physics.add.collider(gameState.hero, gameState.invisibleplatform);
        gameState.hero.anims.play('scoutidle',true);
        gameState.shootpistol = this.sound.add('pistol_shoot');
        gameState.scoutmovement = function(scene){
            if(gameState.heroshooting === false){
                if(!gameState.hero.body.touching.down){
                    gameState.hero.anims.play('scoutjump',true);
                }
                else {
                    gameState.hero.anims.play('scoutidle',true);
                }
                gameState.hero.body.checkCollision.down = true;
                if(gameState.cursors.up.isDown && gameState.hero.body.touching.down && gameState.herojumpcooldown === false){
                    gameState.hero.setVelocityY(-500);
                    gameState.herojumpcooldown = true;
                    scene.time.addEvent({
                        delay: 1800,
                        callback: ()=>{
                            gameState.herojumpcooldown = false;
                        },  
                        startAt: 0,
                        timeScale: 1
                    }); 
                }
            }
            if(gameState.keys.SPACE.isDown && gameState.heroshooting === false && gameState.hero.body.touching.down){
                gameState.heroshooting = true;
                gameState.hero.anims.play('scoutshoot',true);
                scene.time.addEvent({
                    delay: 500,
                    callback: ()=>{
                        gameState.shootpistol.play();
                        gameState.herobullets.create(gameState.hero.x+30, gameState.hero.y, 'bullet').setGravityX(2000).setGravityY(-1000);
                    },  
                    startAt: 0,
                    timeScale: 1
                }); 
                scene.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                        gameState.heroshooting = false;
                    },  
                    startAt: 0,
                    timeScale: 1
                }); 
            }
        }
        //roboscout
        gameState.enemyhero = this.physics.add.sprite(550,317,'roboscout');
        gameState.roboscoutpain = this.sound.add('roboscout_pain');
        gameState.roboscouttaunt = this.sound.add('roboscout_taunt');
        gameState.enemyherohealth = 50;
        gameState.enemyherobullets = this.physics.add.group();
        gameState.enemyherobullets.outOfBoundsKill = true;
        gameState.enemyheroshooting = false;
        this.physics.add.collider(gameState.enemyhero, gameState.invisibleplatform);
        gameState.enemyhero.anims.play('roboscoutidle',true);
        gameState.roboscoutmovement = function(scene){
            if(gameState.enemyheroshooting === false){
                gameState.enemyhero.anims.play('roboscoutidle',true);
                gameState.hero.body.checkCollision.down = true;
            }
            if(gameState.enemyheroshooting === false){
                gameState.enemyheroshooting = true;
                scene.time.addEvent({
                    delay: 3000,
                    callback: ()=>{
                        gameState.enemyhero.anims.play('roboscoutshoot',true);
                        scene.time.addEvent({
                            delay: 500,
                            callback: ()=>{
                                if(gameState.enemyherohealth > 0){
                                    gameState.shootpistol.play();
                                    gameState.enemyherobullets.create(gameState.enemyhero.x-30, gameState.enemyhero.y, 'bullet').setGravityX(-1500).setGravityY(-1000).flipX = true;
                                }
                            },  
                            startAt: 0,
                            timeScale: 1
                        }); 
                        scene.time.addEvent({
                            delay: 1000,
                            callback: ()=>{
                                gameState.enemyheroshooting = false;
                            },  
                            startAt: 0,
                            timeScale: 1
                        }); 
                    },  
                    startAt: 0,
                    timeScale: 1
                });
            }
        }
    }
    
    update(){
        this.physics.add.overlap(gameState.enemyherobullets, gameState.hero,(ammo, hero)=>{
            gameState.scoutpain.play();
            hero.destroy();
            gameState.herohealth -= 5;
            gameState.herohealthtext.destroy();
            gameState.herohealthtext = this.add.text(180, 250, `${gameState.herohealth}/20`, { fontSize: ' bold 20px', fill: '#00000'});
            if(gameState.herohealth <= 0){
                this.physics.pause();
                gameState.playing = false;
                gameState.westernmusic.setMute(true);
                gameState.roboscouttaunt.play();
                gameState.status = 'defeat';
                this.time.addEvent({
                    delay: 3000,
                    callback: ()=>{
                        this.scene.start('DandVScene');
                    },  
                    startAt: 0,
                    timeScale: 1
                });
            }
        });
        this.physics.add.overlap(gameState.herobullets, gameState.enemyhero,(ammo, hero)=>{
            gameState.roboscoutpain.play();
            hero.destroy();
            gameState.enemyherohealth -= 5;
            gameState.enemyherohealthtext.destroy();
            gameState.enemyherohealthtext = this.add.text(560, 250, `${gameState.enemyherohealth}/50`, { fontSize: 'bold 20px', fill: '#00000' });
            if(gameState.enemyherohealth <= 0){
                this.physics.pause();
                gameState.dialogueover = false;
                gameState.missionnumber = 2;
                localStorage.missionnumber = gameState.missionnumber;
                gameState.playing = false;
                gameState.westernmusic.setMute(true);
                gameState.scouttaunt.play();
                gameState.status = 'victory';
                this.time.addEvent({
                    delay: 3000,
                    callback: ()=>{
                        this.scene.start('DandVScene');
                    },  
                    startAt: 0,
                    timeScale: 1
                });
            }
        });
        if(gameState.dialogueover === true){
            if(gameState.playing === true){
                gameState.scoutmovement(this); 
                gameState.roboscoutmovement(this);
            }
            else{
                
            }
        }
        else {
            gameState.dialogue(this);
        }
    }
}





