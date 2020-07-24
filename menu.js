class MenuScene extends Phaser.Scene {
    constructor() {
		super({ key: 'MenuScene' })
	}
    preload(){
        this.load.image('ballmech','images/ballmech.png');
        this.load.image('alientrooper','images/alientrooper.png');
        this.load.image('reconexpert','images/reconexpert.png');
        this.load.image('goliathhero','images/goliathhero.png');
        this.load.image('zaro','images/zaro.png');
        this.load.image('acree','images/acree.png');
        this.load.image('selectionboxes', 'images/selectionboxes.png');
        this.load.image('start','images/start.png');
    }
    create() {
        this.add.text(500,20, 'SELECT YOUR HERO',{ fontSize: '30px', fill: '#000000' });
        gameState.start = this.add.image(600,600, 'start').setOrigin(0,0).setInteractive();
        this.add.image(150,300, 'selectionboxes').setOrigin(0,0);
        gameState.selectballmech = this.add.image(155,305, 'ballmech').setOrigin(0,0).setInteractive().setScale(0.8);
        gameState.selectalientrooper = this.add.image(245,315, 'alientrooper').setOrigin(0,0).setInteractive();
        gameState.selectreconexpert = this.add.image(325,305, 'reconexpert').setOrigin(0,0).setInteractive().setScale(0.9);
        gameState.selectgoliath = this.add.image(400,310, 'goliathhero').setOrigin(0,0).setInteractive();
        gameState.selectzaro = this.add.image(485,310, 'zaro').setOrigin(0,0).setInteractive().setScale(1.2);
        gameState.selectacree = this.add.image(563,305, 'acree').setOrigin(0,0).setInteractive().setScale(1.1);
        var herotext = this.add.text(20,100, '',{ fontSize: '50px', fill: '#000000' });
        gameState.selectballmech.on('pointerdown', () => {
            herotext.destroy();
            herotext = this.add.text(20,100, 'Selected: BallMech',{ fontSize: '50px', fill: '#000000' });;
            gameState.hero = 'ballmech';
            gameState.stats = gameState.ballmechStats;
		});
        gameState.selectalientrooper.on('pointerdown', () => {
            herotext.destroy();
            herotext = this.add.text(20,100, 'Selected: AlienTrooper',{ fontSize: '50px', fill: '#000000' });;
            gameState.hero = 'alientrooper';
            gameState.stats = gameState.alientrooperStats;
		});
        gameState.selectreconexpert.on('pointerdown', () => {
            herotext.destroy();
            herotext = this.add.text(20,100, 'Selected: ReconExpert',{ fontSize: '50px', fill: '#000000' });;
            gameState.hero = 'reconexpert';
            gameState.stats = gameState.reconexpertStats;
		});
        gameState.selectgoliath.on('pointerdown', () => {
            herotext.destroy();
            herotext = this.add.text(20,100, 'Selected: Goliath',{ fontSize: '50px', fill: '#000000' });;
            gameState.hero = 'goliathhero';
            gameState.stats = gameState.goliathheroStats;
		});
        gameState.selectzaro.on('pointerdown', () => {
            herotext.destroy();
            herotext = this.add.text(20,100, 'Selected: Zaro',{ fontSize: '50px', fill: '#000000' });;
            gameState.hero = 'zaro';
            gameState.stats = gameState.zaroStats;
		});
        gameState.selectacree.on('pointerdown', () => {
            herotext.destroy();
            herotext = this.add.text(20,100, 'Selected: Acree',{ fontSize: '50px', fill: '#000000' });;
            gameState.hero = 'acree';
            gameState.stats = gameState.acreeStats;
		});
        
        var rando = Math.ceil(Math.random()* 5);
        console.log(rando);
        if(rando === 1){
            gameState.enemyhero = 'ballmech';
            gameState.enemyherostats = gameState.ballmechStats;
        }
        else if(rando === 2){
            gameState.enemyhero = 'alientrooper';
            gameState.enemyherostats = gameState.alientrooperStats;
        }
        else if(rando === 3){
            gameState.enemyhero = 'reconexpert';
            gameState.enemyherostats = gameState.reconexpertStats;
        }
        else if(rando === 4){
            gameState.enemyhero = 'goliathhero';
            gameState.enemyherostats = gameState.goliathheroStats;
        }
        else if(rando === 5){
            gameState.enemyhero = 'zaro';
            gameState.enemyherostats = gameState.zaroStats;
        }
        gameState.enemyhealth = gameState.enemyherostats.health;
        gameState.enemyammo = gameState.enemyherostats.ammo;
        gameState.enemyprimarydamage = gameState.enemyherostats.primarydamage;
        gameState.enemyability1damage = gameState.enemyherostats.ability1damage;
        gameState.enemyreloadtime = gameState.enemyherostats.releadtime;
        gameState.enemyprimarycooldown = gameState.enemyherostats.primarycooldown;
        gameState.enemyability1cooldown = gameState.enemyherostats.ability1cooldown;
        gameState.enemyprimaryvelocityx = gameState.enemyherostats.primaryvelocityx;
        gameState.enemyvelocityX = gameState.enemyherostats.velocityX;
        gameState.enemyvelocityY = gameState.enemyherostats.velocityY;
        gameState.enemyherogravity = gameState.enemyherostats.herogravity;
        gameState.enemyprimaryspread = gameState.enemyherostats.primaryspread;
        gameState.start.on('pointerdown', () => {
            gameState.health = gameState.stats.health;
            gameState.ammo = gameState.stats.ammo;
            gameState.reloadtime = gameState.stats.releadtime;
            gameState.primarydamage = gameState.stats.primarydamage;
            gameState.primarycooldown = gameState.stats.primarycooldown;
            gameState.ability1cooldown = gameState.stats.ability1cooldown;
            gameState.ability1damage = gameState.stats.ability1damage;
            gameState.primaryvelocityx = gameState.stats.primaryvelocityx;
            gameState.velocityX = gameState.stats.velocityX;
            gameState.velocityY = gameState.stats.velocityY;
            gameState.herogravity = gameState.stats.herogravity;
            gameState.primaryspread = gameState.stats.primaryspread;
            this.scene.stop("MenuScene");
            this.scene.start("ArenaScene");
		});
	}
    update(){
        
    }
}