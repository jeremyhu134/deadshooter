    
    class Level1 extends Phaser.Scene {
        constructor() {
            super({ key: 'Level1' })
        }
        preload(){
            this.load.image('codey','assets/avatar.png');
            this.load.image('bug', 'assets/zombie.png');
            this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
            this.load.image('platform1', 'assets/bplatform.png');
            this.load.image('bugRepellent', 'assets/bullet.png');
        }
        create(){
            //groups
            gameState.platforms = this.physics.add.staticGroup();
            gameState.bugRepellent = this.physics.add.group();
            gameState.bug = this.physics.add.group();
            gameState.platforms.create(600, 500, 'platform').setScale(2).refreshBody(0);
            gameState.platforms.create(200, 400, 'platform');
            gameState.platforms.create(1200, 400, 'platform');
            gameState.platforms.create(600, 300, 'platform1').setScale(2).refreshBody(0);
            gameState.cursors = this.input.keyboard.createCursorKeys(); 
            gameState.codey = this.physics.add.sprite(200, 300, 'codey');
            gameState.codey.setCollideWorldBounds(true);
            //collision for codey
            gameState.codey.body.checkCollision.right = true;
            gameState.codey.body.checkCollision.left = true;
            gameState.codey.body.checkCollision.up = true;
            gameState.codey.body.checkCollision.down = true;
            for (var i = 5; i>0; i--){
                gameState.bug.create(Math.ceil(Math.random()*450+600),0,'bug').setScale(1.5);
            }
            this.physics.add.collider(gameState.codey, gameState.platforms);
            this.physics.add.collider(gameState.bug, gameState.platforms);
            this.physics.add.collider(gameState.bug, gameState.bugRepellent, function(bug,bullet) {
                bug.destroy();
                bullet.destroy();
            }); 
            this.physics.add.collider(gameState.codey,gameState.bug, ()=>{
                this.physics.pause();
                gameState.over = true;
                this.add.text(575, 250, 'GAME OVER!', { fontSize: '15px', fill: '#000000' });
                this.add.text(550, 350, 'Click to restart!', { fontSize: '15px', fill: '#000000' });
            });
            this.add.text(600, 20, 'Level 1', { fontSize: '15px', fill: '#000000' });
            gameState.ammoText = this.add.text(200, 20, `Bullets :${gameState.ammo}`, { fontSize: '20px', fill: '#000000' });
        }

        update(){
            this.input.on('pointerup', () => {
                if(gameState.over === true){
                    this.scene.restart();
                    gameState.reset();
                    gameState.over = false;
                }
                if(gameState.active === false){
                    this.scene.stop('Level1');
			        this.scene.start('StartScene');
                    gameState.reset();
                    gameState.active = true;
                }   
                /*else {
                    gameState.bug.create(game.input.mousePointer.x,game.input.mousePointer.y,'bug').setScale(1.5);
                }*/
            });
            gameState.bug.getChildren().forEach(bug => {
                if(bug.body.touching.down && gameState.codey.y < bug.y-51){
                    bug.setVelocityY(-300);
                }
                if(bug.x > gameState.codey.x){
                    bug.setVelocityX(-70);
                    bug.flipX = true;
                }
                else if(bug.x < gameState.codey.x){
                    bug.setVelocityX(70);
                    bug.flipX = false;
                }
            });
            if(gameState.bug.getChildren().length === 0){
                this.add.text(570, 250, 'Level Complete!', { fontSize: '15px', fill: '#000000' });
                this.add.text(550, 350, 'Click to go to menu!', { fontSize: '15px', fill: '#000000' });
                gameState.active = false;
            }  
            if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space) && gameState.ammo > 0) {
                if(gameState.codey.flipX === false){
                    gameState.bugRepellent.create(gameState.codey.x+25,gameState.codey.y+25,'bugRepellent').setGravityY(-500).setVelocityX(800);
                }
                else if(gameState.codey.flipX === true){
                    gameState.bugRepellent.create(gameState.codey.x+25,gameState.codey.y+25,'bugRepellent').setGravityY(-500).setVelocityX(-800);
                }
                gameState.ammo -= 1;
                gameState.ammoText.destroy();
                gameState.ammoText = this.add.text(200, 20, `Bullets :${gameState.ammo}`, { fontSize: '20px', fill: '#000000' });
            }
            if(gameState.cursors.up.isDown && gameState.codey.body.touching.down){
               gameState.codey.setVelocityY(-350);
            }
            if(gameState.cursors.right.isDown){
                gameState.codey.setVelocityX(300);
                gameState.codey.flipX = false;
            }
            else if(gameState.cursors.left.isDown){
                gameState.codey.setVelocityX(-300);
                gameState.codey.flipX = true;
            }
            else{
                gameState.codey.setVelocityX(0);
            }
        }
    }
    









