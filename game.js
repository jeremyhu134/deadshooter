const config = {
  type: Phaser.AUTO,
  width: 1224,
  height: 600,
  backgroundColor: "a9a9a9",
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 500 },
          enableBody: true,
        }
    },
  scene:[StartScene, Level1]
};

const game = new Phaser.Game(config);

let gameState = {
    active: true,
    over: false,
    ammo: 10,
    reset: function (){
        gameState.ammo = 10;
    }
}