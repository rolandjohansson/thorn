var config = 
  {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "graphics",
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

var player;

var game = new Phaser.Game(config);

function preload() 
  {
    this.load.spritesheet('adventurer', '../assets/adventurer.png', { frameWidth: 50, frameHeight: 37 });
  }

function create() 
  {
    player = this.physics.add.sprite(100, 450, "adventurer").setScale(4);
    player.setCollideWorldBounds(true);

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

    cursors = this.input.keyboard.createCursorKeys();

  }

function update()
  {
    if (cursors.space.isDown) {
      player.anims.play("attack1", true);
    } else if (cursors.right.isDown) {
      player.anims.play("run-right", true);
    }
    else {
      player.anims.play("idle", true);
    }
  }