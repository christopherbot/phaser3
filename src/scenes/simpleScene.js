export class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image('melon', 'assets/melon.png')
  }

  create() {
    this.add.image(100, 50, 'melon')
    this.add.text(100, 95, 'WaTeR u DoInG', { fill: '#0f0' })
    this.add.image(100, 150, 'melon')
  }
}
