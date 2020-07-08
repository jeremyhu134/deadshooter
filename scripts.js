    
    class GameScene extends Phaser.Scene {
        constructor() {
            super({ key: 'GameScene' })
        }
        preload(){
            this.load.image('codey','assets/avatar.png');
            this.load.image('bug', 'assets/zombie.png');
            this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
            this.load.image('bugRepellent', 'assets/bullet.png');
        }
        create(){
            //groups
            const platforms = this.physics.add.staticGroup();
            gameState.bugRepellent = this.physics.add.group();
            gameState.bug = this.physics.add.group();
            platforms.create(600, 500, 'platform').setScale(2).refreshBody(0);
            gameState.cursors = this.input.keyboard.createCursorKeys(); 
            gameState.codey = this.physics.add.sprite(200, 300, 'codey').setOrigin(0,0);
            gameState.codey.setCollideWorldBounds(true);
            //collision for codey
            gameState.codey.body.checkCollision.right = true;
            gameState.codey.body.checkCollision.left = true;
            gameState.codey.body.checkCollision.up = true;
            gameState.codey.body.checkCollision.down = true;
            for (var i = 5; i>0; i--){
                gameState.bug.create(Math.ceil(Math.random()*1000),0,'bug').setScale(1.5);
            }
            this.physics.add.collider(gameState.codey, platforms);
            this.physics.add.collider(gameState.bug, platforms);
            this.physics.add.collider(gameState.bug, gameState.bugRepellent, function(bug,bullet) {
                bug.destroy();
                bullet.destroy();
            }); 
            this.physics.add.collider(gameState.codey,gameState.bug, ()=>{
                this.physics.pause();
                this.add.text(600, 250, 'GAME OVER!', { fontSize: '15px', fill: '#000000' });
                this.add.text(550, 350, 'Click to restart!', { fontSize: '15px', fill: '#000000' });
                gameState.active = false;
            });
            //this.add.text(500, 20, 'Click anywhere to spawn a zombie!', { fontSize: '15px', fill: '#000000' });
        }

        update(){
            this.input.on('pointerup', () => {
                if(gameState.active === false){
                    this.scene.restart();
                    gameState.active = true;
                }   
                /*else {
                    gameState.bug.create(game.input.mousePointer.x,game.input.mousePointer.y,'bug').setScale(1.5);
                }*/
            });
            gameState.bug.getChildren().forEach(bug => {
                if(bug.body.touching.down){
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
                this.add.text(600, 250, 'YOU WIN!', { fontSize: '15px', fill: '#000000' });
                this.add.text(550, 350, 'Click to restart!', { fontSize: '15px', fill: '#000000' });
                gameState.active = false;
            }  
            if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
                if(gameState.codey.flipX === false){
                    gameState.bugRepellent.create(gameState.codey.x+25,gameState.codey.y+25,'bugRepellent').setGravityY(-500).setVelocityX(800);
                }
                else if(gameState.codey.flipX === true){
                    gameState.bugRepellent.create(gameState.codey.x+25,gameState.codey.y+25,'bugRepellent').setGravityY(-500).setVelocityX(-800);
                }
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
    









