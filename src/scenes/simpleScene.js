export class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image('melon', 'assets/melon.png')
  }

  create() {
    this.add.image(10, 10, 'melon')
    this.add.image(670, 10, 'melon')
    this.add.image(0, 380, 'melon').setOrigin(0, 0)
    this.add.image(680, 400, 'melon').setOrigin(1, 1)
    this.add.text(280, 150, 'WaTeR u DoInG', { fill: '#0f0' })
  }
}
