export class SimpleScene extends Phaser.Scene {
  get gameTitle() {
    return 'WaTeR u DoInG?'
  }
  get gameWidth() {
    return this.sys.game.config.width
  }

  get gameHeight() {
    return this.sys.game.config.height
  }

  collectMelon(player, melon) {
    melon.disableBody(true, true)
    this.score += 1
    this.text.setText(`${this.gameTitle} Score: ${this.score}`)
  }

  preload() {
    this.load.image('sky', 'assets/sky.png')
    this.load.image('platform', 'assets/platform.png')
    this.load.spritesheet('dude',
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    )
    this.load.image('star', 'assets/star.png')
    this.load.image('melon', 'assets/melon.png')

    this.score = 0
  }

  create() {
    this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'sky')

    this.platforms = this.physics.add.staticGroup()
    // setScale() adjusts the width and height
    // refreshBody() tells the physics world about the scale change
    this.platforms.create(400, 568, 'platform').setScale(2).refreshBody()
    this.platforms.create(600, 400, 'platform')
    this.platforms.create(50, 250, 'platform')
    this.platforms.create(750, 220, 'platform')

    this.player = this.physics.add.sprite(100, 450, 'dude')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)
    this.player.body.setGravityY(30)

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1, // tells the animation to loop
    })

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    })

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    })

    this.physics.add.collider(this.player, this.platforms) // collisions and overlaps can invoke an optional callback

    this.add.image(0, 0, 'star').setOrigin(0, 0)
    this.add.image(this.gameWidth, 0, 'star').setOrigin(1, 0)
    this.add.image(0, this.gameHeight, 'star').setOrigin(0, 1)
    this.add.image(this.gameWidth, this.gameHeight, 'star').setOrigin(1, 1)

    // default font-family is Courier
    this.text = this.add.text(
      this.gameWidth / 2,
      this.gameHeight - 20,
      `${this.gameTitle} Score: 0`,
      { fill: '#0F0' }
    ).setOrigin(0.5, 1)

    this.cursors = this.input.keyboard.createCursorKeys()

    this.melons = this.physics.add.group({
      key: 'melon', // texture key
      repeat: 11, // 12 in total: 1 child is created automatically, repeating 11 times
      setXY: { x: 12, y: 0, stepX: 70 } // each child placed at (12, 0) with 70 horiz pixels b/w them (i.e. next at (82, 0))
    })

    this.melons.children.iterate((child) => {
      // iterate thru all children and assign random bounce to each
      child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.4))
    })

    this.physics.add.collider(this.melons, this.platforms)

    this.physics.add.overlap(this.player, this.melons, this.collectMelon, null, this)
  }

  update() {
    // velocities in px/second
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)

      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)

      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)

      this.player.anims.play('turn')
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }
}
