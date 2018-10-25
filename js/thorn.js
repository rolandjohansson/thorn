var config = 
  {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "graphics",
    pixelArt: true,
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

var player;
var ground;

var game = new Phaser.Game(config);

function preload() 
  {
    this.load.image('bkg00', 'assets/backgrounds/forest00.png');
    this.load.image('bkg01', 'assets/backgrounds/forest01.png');
    this.load.image('bkg02', 'assets/backgrounds/forest02.png');
    this.load.image('bkg03', 'assets/backgrounds/forest03.png');
    this.load.image('bkg04', 'assets/backgrounds/forest04.png');
    this.load.image('bkg05', 'assets/backgrounds/forest05.png');
    this.load.image('bkg06', 'assets/backgrounds/forest06.png');
    this.load.image('bkg07', 'assets/backgrounds/forest07.png');
    this.load.image('bkg08', 'assets/backgrounds/forest08.png');
    this.load.image('bkg09', 'assets/backgrounds/forest09.png');
    this.load.image('bkg10', 'assets/backgrounds/forest10.png');
    this.load.spritesheet('adventurer', 'assets/adventurer.png', { frameWidth: 50, frameHeight: 37 });
  }

function create() 
  {
    this.add.image(400, 204, 'bkg00');
    this.add.image(400, 204, 'bkg01');
    this.add.image(400, 204, 'bkg02');
    this.add.image(400, 204, 'bkg03');
    this.add.image(400, 204, 'bkg04');
    this.add.image(400, 204, 'bkg05');
    this.add.image(400, 204, 'bkg06');
    this.add.image(400, 204, 'bkg07');
    this.add.image(400, 204, 'bkg08');
    this.add.image(400, 204, 'bkg09');

    player = this.add.sprite(100, 490, "adventurer").setScale(3);
    
    this.add.image(400, 204, 'bkg10');

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("adventurer", { start: 38, end: 41 }),
      frameRate: 3
    });

    this.anims.create({
      key: "run-right",
      frames: this.anims.generateFrameNumbers("adventurer", { start: 8, end: 13 }),
      frameRate: 10
    });

    this.anims.create({
      key: "attack1",
      frames: this.anims.generateFrameNumbers("adventurer", { start: 42, end: 46 }),
      frameRate: 10
    });
  }

function update()
  {
    player.anims.play("idle", true);
  }