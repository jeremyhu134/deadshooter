


class ArenaScene extends Phaser.Scene {
    constructor() {
		super({ key: 'ArenaScene' })
	}
    preload(){
        this.load.image('mainplatform','images/mainplatform.png');
        this.load.image('platform1','images/platform1.png');
        this.load.image('sideplatform','images/sideplatform.png');
        this.load.image('arenabg','images/arenabg.png');    
        this.load.image('ability1iconnotready','images/ability1iconnotready.png');
        this.load.image('crawler','images/crawler.png');
        //BallMechImages
        this.load.image('ballmech','images/ballmech.png');
        this.load.image('ballmechprimaryammo','images/ballmechprimaryammo.png');
        this.load.image('ballmechability1icon','images/ballmechability1icon.png');
        //AlienTrooperImages
        this.load.image('alientrooper','images/alientrooper.png');
        this.load.image('alientrooperprimaryammo','images/alientrooperprimaryammo.png');
        this.load.image('alientrooperability1icon','images/alientrooperability1icon.png');
        //ReconExpertImages
        this.load.image('reconexpert','images/reconexpert.png');
        this.load.image('reconexpertprimaryammo','images/reconexpertprimaryammo.png');
        this.load.image('reconexpertability1icon','images/reconexpertability1icon.png');
        this.load.image('reconexpertability1ammo','images/reconexpertability1ammo.png');
        //GoliathImages
        this.load.image('goliathhero','images/goliathhero.png');
        this.load.image('goliathheroprimaryammo','images/goliathheroprimaryammo.png');
        this.load.image('goliathheroability1icon','images/goliathheroability1icon.png');
        this.load.image('goliathheroability1ammo','images/goliathheroability1ammo.png');
        //Zaroimages
        this.load.image('zaro','images/zaro.png');
        this.load.image('zaroprimaryammo','images/zaroprimaryammo.png');
        this.load.image('zaroability1ammo','images/zaroability1ammo.png');
        this.load.image('zaroability1icon','images/zaroability1icon.png');
        //Acreeimages
        this.load.image('acree','images/acree.png');
        this.load.image('acreeprimaryammo','images/acreeprimaryammo.png');
        this.load.image('acreeability1ammo','images/acreeability1ammo.png');
        this.load.image('acreeability1icon','images/acreeability1icon.png');
        //TheADMINImages
        this.load.image('theadmin','images/theadmin.png');
        this.load.image('theadminprimaryammo','images/theadminprimaryammo.png');
        this.load.image('theadminability1ammo','images/theadminprimaryammo.png');
        this.load.image('theadminability1icon','images/theadminability1icon.png');
        this.load.image('theadminturret','images/theadminturret.png');
        //LucioImages
        this.load.image('lucio','images/lucio.png');
        this.load.image('lucioprimaryammo','images/lucioprimaryammo.png');
        this.load.image('lucioability1icon','images/lucioability1icon.png');
        
        
        this.load.image('healthbar','images/healthbar.png');
    }
    create(){
        gameState.score = 0;
        gameState.enemyscore = 0;
        gameState.input=this.input;
        gameState.mouse=this.input.mousePointer;
        this.add.image(0,0,'arenabg').setOrigin(0,0);
        gameState.reloading = false;
        gameState.keys = this.input.keyboard.addKeys('W,S,A,D,R,SPACE,SHIFT');
        gameState.platforms = this.physics.add.staticGroup();
        gameState.health1 = this.add.image(1155,100,'healthbar').setOrigin(0,0);
        gameState.health2 = this.add.image(1181,100,'healthbar').setOrigin(0,0);
        gameState.health3 = this.add.image(1207,100,'healthbar').setOrigin(0,0);
        gameState.health4 = this.add.image(1233,100,'healthbar').setOrigin(0,0);
        gameState.primaryammo = this.physics.add.group();
        gameState.ability1ammo = this.physics.add.group();
        gameState.platforms.create(0, 640, 'mainplatform').setScale(1.5).setOrigin(0,0).refreshBody(0);
        gameState.platforms.create(-10, 0, 'mainplatform').setScale(1.5).setOrigin(0,0).refreshBody(0);
        gameState.platforms.create(200, 460, 'platform1').setOrigin(0,0).refreshBody(0);
        gameState.platforms.create(800, 460, 'platform1').setOrigin(0,0).refreshBody(0);
        gameState.platforms.create(500, 240, 'platform1').setOrigin(0,0).refreshBody(0);
        gameState.platforms.create(0, 0, 'sideplatform').setOrigin(0,0).refreshBody(0);
        gameState.platforms.create(1270, 0, 'sideplatform').setOrigin(0,0).refreshBody(0);
        gameState.cursors = this.input.keyboard.createCursorKeys(); 
        //hero
        gameState.heroimage = this.physics.add.sprite(100, 550, `${gameState.hero}`).setDepth(1).setGravityY(gameState.herogravity).setBounce(0.2);
        gameState.heroimage.body.checkCollision.right = true;
        gameState.heroimage.body.checkCollision.left = true;
        gameState.heroimage.body.checkCollision.up = true;
        gameState.heroimage.body.checkCollision.down = true;
        gameState.heroimage.setCollideWorldBounds(true);
        gameState.ability1icon = this.add.image(1170,170,`${gameState.hero}ability1icon`).setOrigin(0,0);
        //enemyhero
        gameState.enemyheroimage = this.physics.add.sprite(1100, 550, `${gameState.enemyhero}`).setDepth(1).setGravityY(gameState.herogravity);
        gameState.enemyheroimage.body.checkCollision.right = true;
        gameState.enemyheroimage.body.checkCollision.left = true;
        gameState.enemyheroimage.body.checkCollision.up = true;
        gameState.enemyheroimage.body.checkCollision.down = true;
        gameState.enemyheroimage.setCollideWorldBounds(true);
        this.add.text(30, 30, `Enemy Hero`, { fontSize: '30px', fill: '#696969' });
        //collider
        this.physics.add.collider(gameState.heroimage, gameState.platforms);
        //enemy stuff
        gameState.enemyprimaryammo = this.physics.add.group();
        gameState.enemyability1ammo = this.physics.add.group();
        gameState.enemycurrentprimarycooldown = 0;
        gameState.enemycurrentability1cooldown = 0;
        gameState.enemycurrentammo = gameState.enemyammo;
        gameState.enemycurrenthealth = gameState.enemyhealth;
        gameState.enemyhealthtext = this.add.text(30, 70, `${gameState.enemycurrenthealth}/${gameState.enemyhealth}`, { fontSize: '25px', fill: '#FF6347' });
        gameState.enemyreloading = false;
        var enemyprimarycooldown = this.time.addEvent({
            delay: 1,
            callback: ()=>{
                gameState.enemycurrentprimarycooldown -= 1;
            },  
            startAt: 0,
            timeScale: 1,
            loop: true
        });
        var enemyability1cooldown = this.time.addEvent({
            delay: 1,
            callback: ()=>{
                gameState.enemycurrentability1cooldown -= 1;
            },  
            startAt: 0,
            timeScale: 1,
            loop: true
        });
        //others
        gameState.currentprimarycooldown = 0;
        gameState.currentability1cooldown = 0;
        gameState.currentammo = gameState.ammo;
        gameState.currenthealth = gameState.health;
        gameState.ammotext = this.add.text(1150, 30, `${gameState.currentammo}/${gameState.ammo}`, { fontSize: '30px', fill: '#696969' });
        gameState.healthtext = this.add.text(1155, 70, `${gameState.currenthealth}/${gameState.health}`, { fontSize: '25px', fill: '#FF6347' });
        var primarycooldown = this.time.addEvent({
            delay: 1,
            callback: ()=>{
                gameState.currentprimarycooldown -= 1;
            },  
            startAt: 0,
            timeScale: 1,
            loop: true
        });
        var ability1cooldown = this.time.addEvent({
            delay: 1,
            callback: ()=>{
                gameState.currentability1cooldown -= 1;
            },  
            startAt: 0,
            timeScale: 1,
            loop: true
        });
        //gameState.heroimage.play(`${gameState.hero}walk`);
        gameState.scoretext = this.add.text(560,50,`${gameState.enemyscore} - ${gameState.score}`, { fontSize: '40px', fill: '#000000' });
    }
    
    
    update(){
        if(gameState.gameover === false){
            this.physics.add.collider(gameState.heroimage, gameState.platforms);
            this.physics.add.collider(gameState.primaryammo, gameState.platforms,(primaryammo, platforms)=>{
                primaryammo.destroy();
            });
            this.physics.add.collider(gameState.ability1ammo, gameState.platforms,(ability1ammo, platforms)=>{
                ability1ammo.destroy();
            });
            if(gameState.input.x > gameState.heroimage.x){
                gameState.heroimage.flipX = false;
            }
            else if(gameState.input.x < gameState.heroimage.x){
                gameState.heroimage.flipX = true;
            }
            //abilityicon condition
            if(gameState.currentability1cooldown <= 0){
                gameState.ability1icon.destroy;
                gameState.ability1icon = this.add.image(1170,170,`${gameState.hero}ability1icon`).setOrigin(0,0);
            }
            //healthbarscondition
            if(gameState.currenthealth <= 0){
                gameState.health1.destroy();
            }
            else if(gameState.currenthealth < gameState.health*.25){
                gameState.health2.destroy();
            }
            else if(gameState.currenthealth < gameState.health*.50){
                gameState.health3.destroy();
            }
            else if(gameState.currenthealth < gameState.health*.75){
                gameState.health4.destroy();
            }
            //reloadbutton
            if(gameState.keys.R.isDown && gameState.reloading === false){
                gameState.reloading = true;
                gameState.reloadtext = this.add.text(480, 100, `..RELOADING STAND BY..`, { fontSize: '20px', fill: '#696969' });
                var reloading = this.time.addEvent({
                    delay: gameState.reloadtime,
                    callback: ()=>{
                        gameState.currentammo = gameState.ammo;
                        gameState.reloading = false;
                        gameState.reloadtext.destroy();
                        gameState.ammotext.destroy();
                        gameState.ammotext = this.add.text(1150, 30, `${gameState.currentammo}/${gameState.ammo}`, { fontSize: '30px', fill: '#696969' });
                    },  
                    startAt: 0,
                    timeScale: 1,
                });
            };
            if(gameState.currentammo < 0 ){
                gameState.currentammo === 0;
            }

            //shooting button
            if (gameState.mouse.isDown&& gameState.currentprimarycooldown <= 0 && gameState.currentammo > 0 && gameState.reloading === false) {
                if(gameState.hero === 'lucio'){
                    this.time.addEvent({
                        delay: 50,
                        callback: ()=>{
                            gameState.primaryammo = this.physics.add.sprite(gameState.heroimage.x,gameState.heroimage.y,`${gameState.hero}primaryammo`).setGravityY(-1000);
                           this.physics.moveTo(gameState.primaryammo,gameState.input.x, gameState.input.y,gameState.primaryvelocityx); gameState.angle=Phaser.Math.Angle.Between(gameState.primaryammo.x,gameState.primaryammo.y,gameState.input.x,gameState.input.
                           y);
                            gameState.primaryammo.setRotation(gameState.angle);
                            gameState.currentammo -= 1;
                            gameState.ammotext.destroy();
                            gameState.ammotext = this.add.text(1150, 30, `${gameState.currentammo}/${gameState.ammo}`, { fontSize: '30px', fill: '#696969' });
                        },  
                        startAt: 0,
                        timeScale: 1,
                        repeat : 3
                    });
                }
                else {
                    gameState.primaryammo = this.physics.add.sprite(gameState.heroimage.x,gameState.heroimage.y,`${gameState.hero}primaryammo`).setGravityY(-1000);
                    gameState.angle=Phaser.Math.Angle.Between(gameState.primaryammo.x,gameState.primaryammo.y,gameState.input.x,gameState.input.y);
                    if(gameState.input.x < gameState.heroimage.x && gameState.input.y < gameState.heroimage.y || gameState.input.x > gameState.heroimage.x && gameState.input.y > gameState.heroimage.y){
                        this.physics.moveTo(gameState.primaryammo,Math.ceil(Math.random() * -(gameState.primaryspread))+gameState.input.x,Math.ceil(Math.random() * -(gameState.primaryspread))+gameState.input.y,gameState.primaryvelocityx);
                    }
                    else {
                        this.physics.moveTo(gameState.primaryammo,Math.ceil(Math.random() * gameState.primaryspread)+gameState.input.x,Math.ceil(Math.random() * -(gameState.primaryspread))+gameState.input.y,gameState.primaryvelocityx);
                    }
                    gameState.primaryammo.setRotation(gameState.angle);
                    gameState.currentammo -= 1;
                }
                gameState.currentprimarycooldown = gameState.primarycooldown;
                 gameState.ammotext.destroy();
                gameState.ammotext = this.add.text(1150, 30, `${gameState.currentammo}/${gameState.ammo}`, { fontSize: '30px', fill: '#696969' });
            }
            
            if (gameState.keys.SHIFT.isDown && gameState.currentability1cooldown <= 0) {
                gameState.currentability1cooldown = gameState.ability1cooldown;
                gameState.ability1icon.destroy;
                gameState.ability1icon = this.add.image(1170,170,'ability1iconnotready').setOrigin(0,0);
                if(gameState.hero === 'ballmech'){
                    gameState.heroimage.setVelocityY(-1000);
                }
                else if(gameState.hero === 'alientrooper'){
                    gameState.heroimage.x = game.input.mousePointer.x;
                    gameState.heroimage.y = game.input.mousePointer.y;
                }
                else if(gameState.hero === 'reconexpert'){
                   this.time.addEvent({
                        delay: 20,
                        callback: ()=>{
                            gameState.ability1ammo = this.physics.add.sprite(gameState.heroimage.x,gameState.heroimage.y,`${gameState.hero}ability1ammo`).setGravityY(-1000).setVelocityX(800);
                            this.physics.moveTo(gameState.ability1ammo,gameState.input.x,gameState.input.y,800);
                        },  
                        startAt: 0,
                        timeScale: 1,
                        repeat: 15
                    }); 
                }
                else if(gameState.hero === 'goliathhero'){
                   this.time.addEvent({
                        delay: 70,
                        callback: ()=>{
                            gameState.ability1ammo = this.physics.add.sprite(gameState.heroimage.x,gameState.heroimage.y,`${gameState.hero}ability1ammo`).setGravityY(-1000);
                            this.physics.moveTo(gameState.ability1ammo,gameState.input.x,gameState.input.y,650);
                            gameState.angle1=Phaser.Math.Angle.Between(gameState.ability1ammo.x,gameState.ability1ammo.y,gameState.input.x,gameState.input.y);
                            gameState.ability1ammo.setRotation(gameState.angle1);
                        },  
                        startAt: 0,
                        timeScale: 1,
                        repeat: 8
                    }); 
                }
                else if(gameState.hero === 'zaro'){
                   this.time.addEvent({
                        delay: 150,
                        callback: ()=>{
                            gameState.ability1ammo = this.physics.add.sprite(gameState.heroimage.x,gameState.heroimage.y,`${gameState.hero}ability1ammo`).setGravityY(-1000);
                            this.physics.moveTo(gameState.ability1ammo,gameState.enemyheroimage.x,gameState.enemyheroimage.y,600);
                            gameState.angle1=Phaser.Math.Angle.Between(gameState.ability1ammo.x,gameState.ability1ammo.y,gameState.enemyheroimage.x,gameState.enemyheroimage.y);
                            gameState.ability1ammo.setRotation(gameState.angle1);
                        },  
                        startAt: 0,
                        timeScale: 1,
                        repeat: 8
                    }); 
                }
                else if(gameState.hero === 'acree'){
                   gameState.ability1ammo = this.physics.add.sprite(gameState.heroimage.x,gameState.heroimage.y,`${gameState.hero}ability1ammo`).setGravityY(-1000);
                    this.input.on('pointermove', function (pointer){
                        this.physics.moveTo(gameState.ability1ammo, gameState.input.x,gameState.input.y, 600);
                        gameState.angle1=Phaser.Math.Angle.Between(gameState.ability1ammo.x,gameState.ability1ammo.y,gameState.input.x,gameState.input.y);
                        gameState.ability1ammo.setRotation(gameState.angle1);
                    }, this);
                }
                else if(gameState.hero === 'theadmin'){
                    if(gameState.theadminturret){
                        gameState.theadminturret.destroy();
                    }
                   gameState.theadminturret = this.physics.add.sprite(gameState.heroimage.x,gameState.heroimage.y,`${gameState.hero}turret`).setGravityY(-1000);
                    this.physics.moveTo(gameState.theadminturret, gameState.input.x,gameState.input.y, 600);
                    this.physics.add.collider(gameState.theadminturret, gameState.platforms,(turret, platforms)=>{
                        turret.setVelocity(0);
                        if(gameState.turretattack){
                            gameState.turretattack.destroy();
                        }
                        gameState.turretattack = this.time.addEvent({
                            delay: 400,
                            callback: ()=>{
                                gameState.ability1ammo = this.physics.add.sprite(gameState.theadminturret.x,gameState.theadminturret.y,`${gameState.hero}ability1ammo`).setGravityY(-1000).setScale(0.8);
                                this.physics.moveTo(gameState.ability1ammo,gameState.enemyheroimage.x,gameState.enemyheroimage.y,550);
                                gameState.angle1=Phaser.Math.Angle.Between(gameState.ability1ammo.x,gameState.ability1ammo.y,gameState.enemyheroimage.x,gameState.enemyheroimage.y);
                                gameState.ability1ammo.setRotation(gameState.angle1);
                            },  
                            startAt: 0,
                            timeScale: 1,
                            loop : true
                        }); 
                    });
                }
                else if(gameState.hero === 'lucio'){
                    gameState.velocityX = gameState.stats.velocityX + 175;
                    this.time.addEvent({
                        delay: 5000,
                        callback: ()=>{
                            gameState.velocityX = gameState.stats.velocityX;
                        },  
                        startAt: 0,
                        timeScale: 1
                    }); 
                }
            }
            this.physics.add.overlap(gameState.enemyprimaryammo, gameState.theadminturret,(ammo, turret)=>{
                turret.destroy();
                ammo.destroy();
                if(gameState.turretattack){
                    gameState.turretattack.destroy();
                }
                turret = false;
            });
            this.physics.add.collider(gameState.primaryammo, gameState.platforms,(primaryammo, platforms)=>{
                primaryammo.destroy();
            });
            //heromovement
            if(gameState.keys.W.isDown && gameState.hero === 'acree'&& gameState.heroimage.body.touching.left || gameState.keys.W.isDown && gameState.hero === 'acree'&&gameState.heroimage.body.touching.right){
               gameState.heroimage.setVelocityY(-500);
            }
            else if(gameState.keys.W.isDown && gameState.hero === 'lucio'&& gameState.heroimage.body.touching.left || gameState.keys.W.isDown && gameState.hero === 'lucio'&&gameState.heroimage.body.touching.right){
               gameState.heroimage.setVelocityY(gameState.velocityY);
            }
            if(gameState.keys.W.isDown && gameState.heroimage.body.touching.down){
               gameState.heroimage.setVelocityY(gameState.velocityY);
            }
            else if(gameState.keys.D.isDown){
                gameState.heroimage.setVelocityX(gameState.velocityX);
            }
            else if(gameState.keys.A.isDown){
                gameState.heroimage.setVelocityX(-(gameState.velocityX));
            }
            else{
                gameState.heroimage.setVelocityX(0);
            }  


            //enemy hero stuff
            if(gameState.heroimage.y < gameState.enemyheroimage.y && gameState.enemyheroimage.body.touching.down){
                gameState.enemyheroimage.setVelocityY(gameState.enemyvelocityY);
            }
            else if(gameState.heroimage.x > (gameState.enemyheroimage.x)+300){
                gameState.enemyheroimage.setVelocityX(gameState.enemyvelocityX);
            }
            else if(gameState.heroimage.x < (gameState.enemyheroimage.x)-300){
                gameState.enemyheroimage.setVelocityX(-(gameState.enemyvelocityX));
            }
            else{
                gameState.enemyheroimage.setVelocityX(0);
            }


            this.physics.add.collider(gameState.enemyheroimage, gameState.platforms);
            if(gameState.heroimage.x > gameState.enemyheroimage.x){
                gameState.enemyheroimage.flipX = false;
            }
            else if(gameState.heroimage.x < gameState.enemyheroimage.x){
                gameState.enemyheroimage.flipX = true;
            }
            this.physics.add.overlap(gameState.enemyprimaryammo, gameState.heroimage,(ammo, hero)=>{
                ammo.destroy();
                gameState.currenthealth -= gameState.enemyprimarydamage;
                gameState.healthtext.destroy();
                gameState.healthtext = this.add.text(1155, 70, `${gameState.currenthealth}/${gameState.health}`, { fontSize: '25px', fill: '#FF6347' });
            });
            this.physics.add.overlap(gameState.primaryammo, gameState.enemyheroimage,(ammo, hero)=>{
                ammo.destroy();
                gameState.enemycurrenthealth -= gameState.primarydamage;
                gameState.enemyhealthtext.destroy();
                gameState.enemyhealthtext = this.add.text(30, 70, `${gameState.enemycurrenthealth}/${gameState.enemyhealth}`, { fontSize: '25px', fill: '#FF6347' });
            });
            this.physics.add.overlap(gameState.ability1ammo, gameState.enemyheroimage,(ammo, hero)=>{
                ammo.destroy();
                gameState.enemycurrenthealth -= gameState.ability1damage;
                gameState.enemyhealthtext.destroy();
                gameState.enemyhealthtext = this.add.text(30, 70, `${gameState.enemycurrenthealth}/${gameState.enemyhealth}`, { fontSize: '25px', fill: '#FF6347' });
            });
            this.physics.add.overlap(gameState.enemyprimaryammo, gameState.platforms, (ammo,platform)=> {
                ammo.destroy();
            });
            this.physics.add.overlap(gameState.enemyability1ammo, gameState.platforms, (ammo,platform)=> {
                ammo.destroy();
            });
            this.physics.add.overlap(gameState.enemyability1ammo, gameState.heroimage,(ammo, hero)=>{
                ammo.destroy();
                gameState.currenthealth -= gameState.enemyability1damage;
                gameState.healthtext.destroy();
                gameState.healthtext = this.add.text(1155, 70, `${gameState.enemycurrenthealth}/${gameState.enemyhealth}`, { fontSize: '25px', fill: '#FF6347' });
            });
            if (gameState.enemycurrentprimarycooldown <= 0 && gameState.enemycurrentammo > 0 && gameState.enemyreloading === false) {
                if(gameState.enemyhero === 'lucio'){
                    this.time.addEvent({
                        delay: 50,
                        callback: ()=>{
                            gameState.enemyprimaryammo = this.physics.add.sprite(gameState.enemyheroimage.x,gameState.enemyheroimage.y,`${gameState.enemyhero}primaryammo`).setGravityY(-1000);
                            gameState.angle2=Phaser.Math.Angle.Between(gameState.enemyprimaryammo.x,gameState.enemyprimaryammo.y,gameState.heroimage.x,gameState.heroimage.y);
                            gameState.enemyprimaryammo.setRotation(gameState.angle2);
                            gameState.enemycurrentammo -= 1;
                            this.physics.moveTo(gameState.enemyprimaryammo,gameState.heroimage.x,+gameState.heroimage.y,gameState.enemyprimaryvelocityx);
                        },  
                        startAt: 0,
                        timeScale: 1,
                        repeat : 3
                    });
                }
                else {
                    gameState.enemyprimaryammo = this.physics.add.sprite(gameState.enemyheroimage.x,gameState.enemyheroimage.y,`${gameState.enemyhero}primaryammo`).setGravityY(-1000);
                    gameState.angle2=Phaser.Math.Angle.Between(gameState.enemyprimaryammo.x,gameState.enemyprimaryammo.y,gameState.heroimage.x,gameState.heroimage.y);
                    if(gameState.heroimage.x < gameState.enemyheroimage.x && gameState.heroimage.y < gameState.enemyheroimage.y || gameState.enemyheroimage.x > gameState.enemyheroimage.x && gameState.heroimage.y > gameState.enemyheroimage.y){
                        this.physics.moveTo(gameState.enemyprimaryammo,Math.ceil(Math.random() * -(gameState.primaryspread))+gameState.heroimage.x,Math.ceil(Math.random() * -(gameState.primaryspread))+gameState.heroimage.y,gameState.enemyprimaryvelocityx);
                    }
                    else {
                        this.physics.moveTo(gameState.enemyprimaryammo,Math.ceil(Math.random() * gameState.enemyprimaryspread)+gameState.heroimage.x,Math.ceil(Math.random() * -(gameState.enemyprimaryspread))+gameState.heroimage.y,gameState.enemyprimaryvelocityx);
                    }
                    gameState.enemyprimaryammo.setRotation(gameState.angle2);
                }
                gameState.enemycurrentprimarycooldown = gameState.enemyprimarycooldown;
                gameState.enemycurrentammo -= 1;
            }
            if(gameState.enemyreloading === false&& gameState.enemycurrentammo <= 0){
                gameState.enemyreloading = true;
                var enemyreloading = this.time.addEvent({
                    delay: gameState.enemyreloadtime,
                    callback: ()=>{
                        gameState.enemycurrentammo = gameState.enemyammo;
                        gameState.enemyreloading = false;
                    },  
                    startAt: 0,
                    timeScale: 1,
                });
            };
            if(gameState.enemyhero === 'ballmech'){
                if (gameState.enemyheroimage.body.touching.down && gameState.enemycurrentability1cooldown <= 0) {
                    gameState.enemyheroimage.setVelocityY(-1000);
                    gameState.enemycurrentability1cooldown = gameState.enemyability1cooldown;
                }
            }
            else if(gameState.enemyhero === 'alientrooper'){
                if (gameState.enemycurrentability1cooldown <= 0) {
                    gameState.enemyheroimage.x = gameState.heroimage.x;
                    gameState.enemyheroimage.y = gameState.heroimage.y;
                    gameState.enemycurrentability1cooldown = gameState.enemyability1cooldown;
                }
            }
            else if(gameState.enemyhero === 'reconexpert'){
                if (gameState.enemycurrentability1cooldown <= 0) {
                   this.time.addEvent({
                        delay: 20,
                        callback: ()=>{
                            gameState.enemyability1ammo = this.physics.add.sprite(gameState.enemyheroimage.x,gameState.enemyheroimage.y,`${gameState.enemyhero}ability1ammo`).setGravityY(-1000).setVelocityX(800);
                            this.physics.moveTo(gameState.enemyability1ammo,gameState.heroimage.x,gameState.heroimage.y,800);
                        },  
                        startAt: 0,
                        timeScale: 1,
                        repeat: 15
                    }); 
                    gameState.enemycurrentability1cooldown = gameState.enemyability1cooldown;
                }
            }
            else if(gameState.enemyhero === 'goliathhero'){
                if (gameState.enemycurrentability1cooldown <= 0) {
                   this.time.addEvent({
                        delay: 70,
                        callback: ()=>{
                            gameState.enemyability1ammo = this.physics.add.sprite(gameState.enemyheroimage.x,gameState.enemyheroimage.y,`${gameState.enemyhero}ability1ammo`).setGravityY(-1000);
                            this.physics.moveTo(gameState.enemyability1ammo,gameState.heroimage.x,gameState.heroimage.y,650);
                            gameState.angle4=Phaser.Math.Angle.Between(gameState.enemyability1ammo.x,gameState.enemyability1ammo.y,gameState.heroimage.x,gameState.heroimage.y);
                            gameState.enemyability1ammo.setRotation(gameState.angle4);
                        },  
                        startAt: 0,
                        timeScale: 1,
                        repeat: 8
                    }); 
                    gameState.enemycurrentability1cooldown = gameState.enemyability1cooldown;
                }
            }
            else if(gameState.enemyhero === 'zaro'){
                if (gameState.enemycurrentability1cooldown <= 0) {
                   this.time.addEvent({
                        delay: 150,
                        callback: ()=>{
                            gameState.enemyability1ammo = this.physics.add.sprite(gameState.enemyheroimage.x,gameState.enemyheroimage.y,`${gameState.enemyhero}ability1ammo`).setGravityY(-1000);
                            this.physics.moveTo(gameState.enemyability1ammo,gameState.heroimage.x,gameState.heroimage.y,600);
                            gameState.angle4=Phaser.Math.Angle.Between(gameState.enemyability1ammo.x,gameState.enemyability1ammo.y,gameState.heroimage.x,gameState.heroimage.y);
                            gameState.enemyability1ammo.setRotation(gameState.angle4);
                        },  
                        startAt: 0,
                        timeScale: 1,
                        repeat: 8
                    }); 
                    gameState.enemycurrentability1cooldown = gameState.enemyability1cooldown;
                }
            }
            else if(gameState.enemyhero === 'acree' && gameState.enemycurrentability1cooldown <= 0){
               gameState.enemyability1ammo = this.physics.add.sprite(gameState.enemyheroimage.x,gameState.enemyheroimage.y,`${gameState.enemyhero}ability1ammo`).setGravityY(-1000);
                gameState.enemycurrentability1cooldown = gameState.enemyability1cooldown;
                this.physics.moveTo(gameState.enemyability1ammo, gameState.heroimage.x,gameState.heroimage.y, 600); gameState.angle4=Phaser.Math.Angle.Between(gameState.enemyability1ammo.x,gameState.enemyability1ammo.y,gameState.heroimage.x,gameState.heroimage.y);
                gameState.enemyability1ammo.setRotation(gameState.angle4);
            }
            else if(gameState.enemyhero === 'lucio' && gameState.enemycurrentability1cooldown <= 0){
                gameState.enemyvelocityX = gameState.enemyherostats.velocityX + 175;
                this.time.addEvent({
                    delay: 5000,
                    callback: ()=>{
                        gameState.enemyvelocityX = gameState.enemyherostats.velocityX;
                    },  
                    startAt: 0,
                    timeScale: 1
                }); 
            }
        }
        if(gameState.enemycurrenthealth <= 0){
            gameState.health1 = this.add.image(1155,100,'healthbar').setOrigin(0,0);
            gameState.health2 = this.add.image(1181,100,'healthbar').setOrigin(0,0);
            gameState.health3 = this.add.image(1207,100,'healthbar').setOrigin(0,0);
            gameState.health4 = this.add.image(1233,100,'healthbar').setOrigin(0,0);
            gameState.enemyheroimage.destroy();
            gameState.enemyheroimage = this.physics.add.sprite(650, 200, `${gameState.enemyhero}`).setDepth(1).setGravityY(gameState.herogravity);
            gameState.currenthealth = gameState.health;
            gameState.enemycurrenthealth = gameState.enemyhealth;
            gameState.healthtext.destroy();
            gameState.healthtext = this.add.text(1155, 70, `${gameState.currenthealth}/${gameState.health}`, { fontSize: '25px', fill: '#FF6347' });
            gameState.enemyhealthtext.destroy();
            gameState.enemyhealthtext = this.add.text(30, 70, `${gameState.enemycurrenthealth}/${gameState.enemyhealth}`, { fontSize: '25px', fill: '#FF6347' });
            gameState.score += 1;
            gameState.scoretext.destroy();
            gameState.scoretext = this.add.text(560,50,`${gameState.enemyscore} - ${gameState.score}`, { fontSize: '40px', fill: '#000000' });
        }
        if(gameState.currenthealth <= 0 ){
            gameState.health1 = this.add.image(1155,100,'healthbar').setOrigin(0,0);
            gameState.health2 = this.add.image(1181,100,'healthbar').setOrigin(0,0);
            gameState.health3 = this.add.image(1207,100,'healthbar').setOrigin(0,0);
            gameState.health4 = this.add.image(1233,100,'healthbar').setOrigin(0,0);
            gameState.heroimage.destroy();
            gameState.heroimage = this.physics.add.sprite(650, 200, `${gameState.hero}`).setDepth(1).setGravityY(gameState.herogravity);
            gameState.currenthealth = gameState.health;
            gameState.enemycurrenthealth = gameState.enemyhealth;
            gameState.healthtext.destroy();
            gameState.healthtext = this.add.text(1155, 70, `${gameState.currenthealth}/${gameState.health}`, { fontSize: '25px', fill: '#FF6347' });
            gameState.enemyhealthtext.destroy();
            gameState.enemyhealthtext = this.add.text(30, 70, `${gameState.enemycurrenthealth}/${gameState.enemyhealth}`, { fontSize: '25px', fill: '#FF6347' });
            gameState.enemyscore += 1;
            gameState.scoretext.destroy();
            gameState.scoretext = this.add.text(560,50,`${gameState.enemyscore} - ${gameState.score}`, { fontSize: '40px', fill: '#000000' });
        }
        if(gameState.score === 5){
            this.physics.pause();
            gameState.enemycurrenthealth === 0;
            gameState.enemyhealthtext.destroy();
            gameState.enemyhealthtext = this.add.text(30, 70, `${gameState.enemycurrenthealth}/${gameState.enemyhealth}`, { fontSize: '25px', fill: '#FF6347' });
            this.add.text(540, 100, `===VICTORY===`, { fontSize: '30px', fill: '#696969' });
            this.physics.pause();
            gameState.gameover = true;
        }
        else if(gameState.enemyscore === 5){
            gameState.currenthealth === 0;
            gameState.healthtext.destroy();
            gameState.healthtext = this.add.text(1155, 70, `${gameState.currenthealth}/${gameState.health}`, { fontSize: '25px', fill: '#FF6347' });
            this.add.text(540, 100, `===DEFEAT===`, { fontSize: '30px', fill: '#696969' });
            this.physics.pause();
            gameState.gameover = true;
        }
        if(gameState.gameover === true){ 
            gameState.endgame = this.time.addEvent({
                delay: 3000,
                callback: ()=>{
                    gameState.reset();
                    gameState.endgame.destroy();
                    this.scene.stop('ArenaScene');
                    this.scene.start('MenuScene');
                },  
                startAt: 0,
                timeScale: 1
            }); 
        }
    }
}