import 'phaser'
import { SimpleScene } from './scenes/simpleScene'

const gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    }
  },
  scene: SimpleScene,
}

const game = new Phaser.Game(gameConfig)
