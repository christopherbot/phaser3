webpackJsonp([0],{

/***/ 1075:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleScene = exports.SimpleScene = function (_Phaser$Scene) {
  _inherits(SimpleScene, _Phaser$Scene);

  function SimpleScene() {
    _classCallCheck(this, SimpleScene);

    return _possibleConstructorReturn(this, (SimpleScene.__proto__ || Object.getPrototypeOf(SimpleScene)).apply(this, arguments));
  }

  _createClass(SimpleScene, [{
    key: 'setHighScore',
    value: function setHighScore() {
      this.highScore = this.score;
      this.highScoreText.setText(this.highScoreCopy);
      localStorage.setItem('highScore', this.highScore);
    }
  }, {
    key: 'addTitleText',
    value: function addTitleText() {
      // default font-family is Courier
      this.add.text(this.gameWidth / 2, this.gameHeight - 20, this.gameTitle, { fill: '#0F0' }).setOrigin(0.5, 1);
    }
  }, {
    key: 'addScoreText',
    value: function addScoreText() {
      this.scoreText = this.add.text(this.gameWidth / 5, this.gameHeight - 40, this.scoreCopy).setOrigin(0.5, 1);
    }
  }, {
    key: 'addHighScoreText',
    value: function addHighScoreText() {
      this.highScoreText = this.add.text(this.gameWidth / 5, this.gameHeight - 20, this.highScoreCopy).setOrigin(0.5, 1);
    }
  }, {
    key: 'addPauseText',
    value: function addPauseText() {
      this.pauseText = this.add.text(this.gameWidth * 4 / 5, this.gameHeight - 20, this.pauseCopy).setOrigin(0.5, 1);
    }
  }, {
    key: 'updateScore',
    value: function updateScore(newScore) {
      // if a value is explictly passed, set the score to that value
      this.score = typeof newScore === 'number' ? newScore : this.score + 1;
      this.scoreText.setText(this.scoreCopy);
    }
  }, {
    key: 'addGameOverText',
    value: function addGameOverText() {
      if (this.gameOverText) {
        this.gameOverText.setText(this.gameOverCopy);

        return;
      }

      this.gameOverText = this.add.text(this.gameWidth / 2, this.gameHeight / 2, this.gameOverCopy, { fill: '#0F0' }).setOrigin(0.5, 0.5);
    }
  }, {
    key: 'removeGameOverText',
    value: function removeGameOverText() {
      // this.gameOverText.destroy()
      this.gameOverText.setText('');
    }
  }, {
    key: 'addBackground',
    value: function addBackground() {
      this.add.image(this.gameWidth / 2, this.gameHeight / 2, 'sky');
    }
  }, {
    key: 'addPlatforms',
    value: function addPlatforms() {
      this.platforms = this.physics.add.staticGroup();
      // setScale() adjusts the width and height
      // refreshBody() tells the physics world about the scale change
      this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
      this.platforms.create(600, 400, 'platform');
      this.platforms.create(50, 250, 'platform');
      this.platforms.create(750, 220, 'platform');
    }
  }, {
    key: 'addPlayer',
    value: function addPlayer() {
      this.player = this.physics.add.sprite(this.playerPositionX, this.playerPositionY, 'dude');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
      this.player.body.setGravityY(30);

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1 // tells the animation to loop
      });

      this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });
    }
  }, {
    key: 'resetPlayer',
    value: function resetPlayer() {
      this.player.clearTint();
      this.player.enableBody(true, this.playerPositionX, this.playerPositionY, true, true);
    }
  }, {
    key: 'addStarDecorations',
    value: function addStarDecorations() {
      this.add.image(0, 0, 'star').setOrigin(0, 0);
      this.add.image(this.gameWidth, 0, 'star').setOrigin(1, 0);
      this.add.image(0, this.gameHeight, 'star').setOrigin(0, 1);
      this.add.image(this.gameWidth, this.gameHeight, 'star').setOrigin(1, 1);
    }
  }, {
    key: 'addMelons',
    value: function addMelons() {
      this.melons = this.physics.add.group({
        key: 'melon', // texture key
        repeat: 11, // 12 in total: 1 child is created automatically, repeating 11 times
        setXY: { x: 12, y: 0, stepX: 70 } // each child placed at (12, 0) with 70 horiz pixels b/w them (i.e. next at (82, 0))
      });

      this.melons.children.iterate(function (child) {
        // iterate thru all children and assign random bounce to each
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.4));
      });
    }
  }, {
    key: 'resetMelons',
    value: function resetMelons() {
      this.melons.children.iterate(function (child) {
        // reset the y position of each melon to 0
        child.enableBody(true, child.x, 0, true, true);
      });
    }
  }, {
    key: 'addBombs',
    value: function addBombs() {
      this.bombs = this.physics.add.group();
    }
  }, {
    key: 'generateBomb',
    value: function generateBomb(player) {
      var bombPosition = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      var bomb = this.bombs.create(bombPosition, 16, 'bomb');

      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }, {
    key: 'resetBombs',
    value: function resetBombs() {
      this.bombs.children.iterate(function (child) {
        child && child.destroy();
      });

      this.bombs.clear(true);
    }
  }, {
    key: 'collectMelon',
    value: function collectMelon(player, melon) {
      melon.disableBody(true, true);

      this.updateScore();

      if (this.melons.countActive(true) === 0) {
        this.resetMelons();
        this.generateBomb(player);
      }
    }
  }, {
    key: 'hitBomb',
    value: function hitBomb(player, bomb) {
      this.physics.pause();
      this.player.setTint(0xff0000);
      this.player.anims.play('turn');
      this.gameOver = true;
    }
  }, {
    key: 'resetGame',
    value: function resetGame() {
      this.updateScore(0);
      this.removeGameOverText();
      this.resetPlayer();
      this.resetMelons();
      this.resetBombs();
      this.gameOver = false;
      this.physics.resume();
    }
  }, {
    key: 'setPause',
    value: function setPause() {
      if (this.paused) {
        this.pauseText.setText(this.pauseCopy);
        this.anims.resumeAll();
        this.physics.resume();
      } else {
        this.pauseText.setText(this.unpauseCopy);
        this.anims.pauseAll();
        this.physics.pause();
      }

      this.paused = !this.paused;
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.load.image('bomb', 'assets/bomb.png');
      this.load.image('melon', 'assets/melon.png');
      this.load.image('platform', 'assets/platform.png');
      this.load.image('sky', 'assets/sky.png');
      this.load.image('star', 'assets/star.png');

      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

      this.score = 0;
      this.highScore = this.highScoreFromStorage || 0;
      this.gameOver = false;
      this.paused = false;
    }
  }, {
    key: 'create',
    value: function create() {
      this.addBackground();
      this.addPlatforms();
      this.addStarDecorations();
      this.addTitleText();
      this.addScoreText();
      this.addHighScoreText();
      this.addPauseText();
      this.addPlayer();
      this.addMelons();
      this.addBombs();

      this.cursors = this.input.keyboard.createCursorKeys();

      // collisions and overlaps can invoke an optional callback
      this.physics.add.collider(this.player, this.platforms);
      this.physics.add.collider(this.melons, this.platforms);
      this.physics.add.collider(this.bombs, this.platforms);
      this.physics.add.overlap(this.player, this.melons, this.collectMelon, null, this);
      this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.score > this.highScore) {
        this.setHighScore();
      }

      if (this.gameOver) {
        this.addGameOverText();
        if (this.anyGameKeyIsPressed) {
          this.resetGame();
        }
      }

      if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
        this.setPause();
      }

      if (this.paused) {
        return;
      }

      if (this.cursors.down.isDown && this.cursors.right.isDown) {
        this.player.setVelocityX(320);
        this.player.anims.play('left', true);
      } else if (this.cursors.down.isDown && this.cursors.left.isDown) {
        this.player.setVelocityX(-320);
        this.player.anims.play('right', true);
      } else if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
      }

      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
      }
    }
  }, {
    key: 'gameTitle',
    get: function get() {
      return 'WaTeR u DoInG?';
    }
  }, {
    key: 'scoreCopy',
    get: function get() {
      return 'Score: ' + this.score;
    }
  }, {
    key: 'highScoreFromStorage',
    get: function get() {
      return localStorage.getItem('highScore');
    }
  }, {
    key: 'highScoreCopy',
    get: function get() {
      return 'High Score: ' + this.highScore;
    }
  }, {
    key: 'gameOverCopy',
    get: function get() {
      return 'Game Over\nPress any key to play again';
    }
  }, {
    key: 'pauseCopy',
    get: function get() {
      return 'Press [space] to pause';
    }
  }, {
    key: 'unpauseCopy',
    get: function get() {
      return 'Press [space] to unpause';
    }
  }, {
    key: 'gameWidth',
    get: function get() {
      return this.sys.game.config.width;
    }
  }, {
    key: 'gameHeight',
    get: function get() {
      return this.sys.game.config.height;
    }
  }, {
    key: 'playerPositionX',
    get: function get() {
      return 100;
    }
  }, {
    key: 'playerPositionY',
    get: function get() {
      return 450;
    }
  }, {
    key: 'anyGameKeyIsPressed',
    get: function get() {
      return Object.values(this.cursors).some(function (_ref) {
        var isDown = _ref.isDown;
        return isDown;
      });
    }
  }]);

  return SimpleScene;
}(Phaser.Scene);

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(210);

var _simpleScene = __webpack_require__(1075);

var gameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: _simpleScene.SimpleScene
};

var game = new Phaser.Game(gameConfig);

/***/ })

},[434]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NlbmVzL3NpbXBsZVNjZW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJTaW1wbGVTY2VuZSIsImhpZ2hTY29yZSIsInNjb3JlIiwiaGlnaFNjb3JlVGV4dCIsInNldFRleHQiLCJoaWdoU2NvcmVDb3B5IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImFkZCIsInRleHQiLCJnYW1lV2lkdGgiLCJnYW1lSGVpZ2h0IiwiZ2FtZVRpdGxlIiwiZmlsbCIsInNldE9yaWdpbiIsInNjb3JlVGV4dCIsInNjb3JlQ29weSIsInBhdXNlVGV4dCIsInBhdXNlQ29weSIsIm5ld1Njb3JlIiwiZ2FtZU92ZXJUZXh0IiwiZ2FtZU92ZXJDb3B5IiwiaW1hZ2UiLCJwbGF0Zm9ybXMiLCJwaHlzaWNzIiwic3RhdGljR3JvdXAiLCJjcmVhdGUiLCJzZXRTY2FsZSIsInJlZnJlc2hCb2R5IiwicGxheWVyIiwic3ByaXRlIiwicGxheWVyUG9zaXRpb25YIiwicGxheWVyUG9zaXRpb25ZIiwic2V0Qm91bmNlIiwic2V0Q29sbGlkZVdvcmxkQm91bmRzIiwiYm9keSIsInNldEdyYXZpdHlZIiwiYW5pbXMiLCJrZXkiLCJmcmFtZXMiLCJnZW5lcmF0ZUZyYW1lTnVtYmVycyIsInN0YXJ0IiwiZW5kIiwiZnJhbWVSYXRlIiwicmVwZWF0IiwiZnJhbWUiLCJjbGVhclRpbnQiLCJlbmFibGVCb2R5IiwibWVsb25zIiwiZ3JvdXAiLCJzZXRYWSIsIngiLCJ5Iiwic3RlcFgiLCJjaGlsZHJlbiIsIml0ZXJhdGUiLCJjaGlsZCIsInNldEJvdW5jZVkiLCJQaGFzZXIiLCJNYXRoIiwiRmxvYXRCZXR3ZWVuIiwiYm9tYnMiLCJib21iUG9zaXRpb24iLCJCZXR3ZWVuIiwiYm9tYiIsInNldFZlbG9jaXR5IiwiYWxsb3dHcmF2aXR5IiwiZGVzdHJveSIsImNsZWFyIiwibWVsb24iLCJkaXNhYmxlQm9keSIsInVwZGF0ZVNjb3JlIiwiY291bnRBY3RpdmUiLCJyZXNldE1lbG9ucyIsImdlbmVyYXRlQm9tYiIsInBhdXNlIiwic2V0VGludCIsInBsYXkiLCJnYW1lT3ZlciIsInJlbW92ZUdhbWVPdmVyVGV4dCIsInJlc2V0UGxheWVyIiwicmVzZXRCb21icyIsInJlc3VtZSIsInBhdXNlZCIsInJlc3VtZUFsbCIsInVucGF1c2VDb3B5IiwicGF1c2VBbGwiLCJsb2FkIiwic3ByaXRlc2hlZXQiLCJmcmFtZVdpZHRoIiwiZnJhbWVIZWlnaHQiLCJoaWdoU2NvcmVGcm9tU3RvcmFnZSIsImFkZEJhY2tncm91bmQiLCJhZGRQbGF0Zm9ybXMiLCJhZGRTdGFyRGVjb3JhdGlvbnMiLCJhZGRUaXRsZVRleHQiLCJhZGRTY29yZVRleHQiLCJhZGRIaWdoU2NvcmVUZXh0IiwiYWRkUGF1c2VUZXh0IiwiYWRkUGxheWVyIiwiYWRkTWVsb25zIiwiYWRkQm9tYnMiLCJjdXJzb3JzIiwiaW5wdXQiLCJrZXlib2FyZCIsImNyZWF0ZUN1cnNvcktleXMiLCJjb2xsaWRlciIsIm92ZXJsYXAiLCJjb2xsZWN0TWVsb24iLCJoaXRCb21iIiwic2V0SGlnaFNjb3JlIiwiYWRkR2FtZU92ZXJUZXh0IiwiYW55R2FtZUtleUlzUHJlc3NlZCIsInJlc2V0R2FtZSIsIklucHV0IiwiS2V5Ym9hcmQiLCJKdXN0RG93biIsInNwYWNlIiwic2V0UGF1c2UiLCJkb3duIiwiaXNEb3duIiwicmlnaHQiLCJzZXRWZWxvY2l0eVgiLCJsZWZ0IiwidXAiLCJ0b3VjaGluZyIsInNldFZlbG9jaXR5WSIsImdldEl0ZW0iLCJzeXMiLCJnYW1lIiwiY29uZmlnIiwid2lkdGgiLCJoZWlnaHQiLCJPYmplY3QiLCJ2YWx1ZXMiLCJzb21lIiwiU2NlbmUiLCJnYW1lQ29uZmlnIiwidHlwZSIsIkFVVE8iLCJkZWZhdWx0IiwiYXJjYWRlIiwiZ3Jhdml0eSIsImRlYnVnIiwic2NlbmUiLCJHYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFhQSxXLFdBQUFB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d0NBQVA7QUFDRDs7O3dCQUVlO0FBQ2QsYUFBTyx3QkFBUDtBQUNEOzs7d0JBRWlCO0FBQ2hCLGFBQU8sMEJBQVA7QUFDRDs7O3dCQUVlO0FBQ2QsYUFBTyxLQUFLK0gsR0FBTCxDQUFTQyxJQUFULENBQWNDLE1BQWQsQ0FBcUJDLEtBQTVCO0FBQ0Q7Ozt3QkFFZ0I7QUFDZixhQUFPLEtBQUtILEdBQUwsQ0FBU0MsSUFBVCxDQUFjQyxNQUFkLENBQXFCRSxNQUE1QjtBQUNEOzs7d0JBRXFCO0FBQ3BCLGFBQU8sR0FBUDtBQUNEOzs7d0JBRXFCO0FBQ3BCLGFBQU8sR0FBUDtBQUNEOzs7d0JBRXlCO0FBQ3hCLGFBQU9DLE9BQU9DLE1BQVAsQ0FBYyxLQUFLaEMsT0FBbkIsRUFBNEJpQyxJQUE1QixDQUFpQztBQUFBLFlBQUdmLE1BQUgsUUFBR0EsTUFBSDtBQUFBLGVBQWdCQSxNQUFoQjtBQUFBLE9BQWpDLENBQVA7QUFDRDs7OztFQS9DOEI5RCxPQUFPOEUsSzs7Ozs7Ozs7OztBQ0F4Qzs7QUFDQTs7QUFFQSxJQUFNQyxhQUFhO0FBQ2pCQyxRQUFNaEYsT0FBT2lGLElBREk7QUFFakJSLFNBQU8sR0FGVTtBQUdqQkMsVUFBUSxHQUhTO0FBSWpCNUcsV0FBUztBQUNQb0gsYUFBUyxRQURGO0FBRVBDLFlBQVE7QUFDTkMsZUFBUyxFQUFFMUYsR0FBRyxHQUFMLEVBREg7QUFFTjJGLGFBQU87QUFGRDtBQUZELEdBSlE7QUFXakJDLFNBQU9oSjtBQVhVLENBQW5COztBQWNBLElBQU1pSSxPQUFPLElBQUl2RSxPQUFPdUYsSUFBWCxDQUFnQlIsVUFBaEIsQ0FBYixDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU2ltcGxlU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmUge1xuICBnZXQgZ2FtZVRpdGxlKCkge1xuICAgIHJldHVybiAnV2FUZVIgdSBEb0luRz8nXG4gIH1cblxuICBnZXQgc2NvcmVDb3B5KCkge1xuICAgIHJldHVybiBgU2NvcmU6ICR7dGhpcy5zY29yZX1gXG4gIH1cblxuICBnZXQgaGlnaFNjb3JlRnJvbVN0b3JhZ2UoKSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWdoU2NvcmUnKVxuICB9XG5cbiAgZ2V0IGhpZ2hTY29yZUNvcHkoKSB7XG4gICAgcmV0dXJuIGBIaWdoIFNjb3JlOiAke3RoaXMuaGlnaFNjb3JlfWBcbiAgfVxuXG4gIGdldCBnYW1lT3ZlckNvcHkoKSB7XG4gICAgcmV0dXJuICdHYW1lIE92ZXJcXG5QcmVzcyBhbnkga2V5IHRvIHBsYXkgYWdhaW4nXG4gIH1cblxuICBnZXQgcGF1c2VDb3B5KCkge1xuICAgIHJldHVybiAnUHJlc3MgW3NwYWNlXSB0byBwYXVzZSdcbiAgfVxuXG4gIGdldCB1bnBhdXNlQ29weSgpIHtcbiAgICByZXR1cm4gJ1ByZXNzIFtzcGFjZV0gdG8gdW5wYXVzZSdcbiAgfVxuXG4gIGdldCBnYW1lV2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3lzLmdhbWUuY29uZmlnLndpZHRoXG4gIH1cblxuICBnZXQgZ2FtZUhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5zeXMuZ2FtZS5jb25maWcuaGVpZ2h0XG4gIH1cblxuICBnZXQgcGxheWVyUG9zaXRpb25YKCkge1xuICAgIHJldHVybiAxMDBcbiAgfVxuXG4gIGdldCBwbGF5ZXJQb3NpdGlvblkoKSB7XG4gICAgcmV0dXJuIDQ1MFxuICB9XG5cbiAgZ2V0IGFueUdhbWVLZXlJc1ByZXNzZWQoKSB7XG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5jdXJzb3JzKS5zb21lKCh7IGlzRG93biB9KSA9PiBpc0Rvd24pXG4gIH1cblxuICBzZXRIaWdoU2NvcmUoKSB7XG4gICAgdGhpcy5oaWdoU2NvcmUgPSB0aGlzLnNjb3JlXG4gICAgdGhpcy5oaWdoU2NvcmVUZXh0LnNldFRleHQodGhpcy5oaWdoU2NvcmVDb3B5KVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaWdoU2NvcmUnLCB0aGlzLmhpZ2hTY29yZSlcbiAgfVxuXG4gIGFkZFRpdGxlVGV4dCgpIHtcbiAgICAvLyBkZWZhdWx0IGZvbnQtZmFtaWx5IGlzIENvdXJpZXJcbiAgICB0aGlzLmFkZC50ZXh0KFxuICAgICAgdGhpcy5nYW1lV2lkdGggLyAyLFxuICAgICAgdGhpcy5nYW1lSGVpZ2h0IC0gMjAsXG4gICAgICB0aGlzLmdhbWVUaXRsZSxcbiAgICAgIHsgZmlsbDogJyMwRjAnIH1cbiAgICApLnNldE9yaWdpbigwLjUsIDEpXG4gIH1cblxuICBhZGRTY29yZVRleHQoKSB7XG4gICAgdGhpcy5zY29yZVRleHQgPSB0aGlzLmFkZC50ZXh0KFxuICAgICAgdGhpcy5nYW1lV2lkdGggLyA1LFxuICAgICAgdGhpcy5nYW1lSGVpZ2h0IC0gNDAsXG4gICAgICB0aGlzLnNjb3JlQ29weSxcbiAgICApLnNldE9yaWdpbigwLjUsIDEpXG4gIH1cblxuICBhZGRIaWdoU2NvcmVUZXh0KCkge1xuICAgIHRoaXMuaGlnaFNjb3JlVGV4dCA9IHRoaXMuYWRkLnRleHQoXG4gICAgICB0aGlzLmdhbWVXaWR0aCAvIDUsXG4gICAgICB0aGlzLmdhbWVIZWlnaHQgLSAyMCxcbiAgICAgIHRoaXMuaGlnaFNjb3JlQ29weSxcbiAgICApLnNldE9yaWdpbigwLjUsIDEpIFxuICB9XG5cbiAgYWRkUGF1c2VUZXh0KCkge1xuICAgIHRoaXMucGF1c2VUZXh0ID0gdGhpcy5hZGQudGV4dChcbiAgICAgIHRoaXMuZ2FtZVdpZHRoICogNCAvIDUsXG4gICAgICB0aGlzLmdhbWVIZWlnaHQgLSAyMCxcbiAgICAgIHRoaXMucGF1c2VDb3B5LFxuICAgICkuc2V0T3JpZ2luKDAuNSwgMSlcbiAgfVxuXG4gIHVwZGF0ZVNjb3JlKG5ld1Njb3JlKSB7XG4gICAgLy8gaWYgYSB2YWx1ZSBpcyBleHBsaWN0bHkgcGFzc2VkLCBzZXQgdGhlIHNjb3JlIHRvIHRoYXQgdmFsdWVcbiAgICB0aGlzLnNjb3JlID0gdHlwZW9mIG5ld1Njb3JlID09PSAnbnVtYmVyJyA/IG5ld1Njb3JlIDogdGhpcy5zY29yZSArIDFcbiAgICB0aGlzLnNjb3JlVGV4dC5zZXRUZXh0KHRoaXMuc2NvcmVDb3B5KVxuICB9XG5cbiAgYWRkR2FtZU92ZXJUZXh0KCkge1xuICAgIGlmICh0aGlzLmdhbWVPdmVyVGV4dCkge1xuICAgICAgdGhpcy5nYW1lT3ZlclRleHQuc2V0VGV4dCh0aGlzLmdhbWVPdmVyQ29weSlcblxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5nYW1lT3ZlclRleHQgPSB0aGlzLmFkZC50ZXh0KFxuICAgICAgdGhpcy5nYW1lV2lkdGggLyAyLFxuICAgICAgdGhpcy5nYW1lSGVpZ2h0IC8gMixcbiAgICAgIHRoaXMuZ2FtZU92ZXJDb3B5LFxuICAgICAgeyBmaWxsOiAnIzBGMCcgfVxuICAgICkuc2V0T3JpZ2luKDAuNSwgMC41KVxuICB9XG5cbiAgcmVtb3ZlR2FtZU92ZXJUZXh0KCkge1xuICAgIC8vIHRoaXMuZ2FtZU92ZXJUZXh0LmRlc3Ryb3koKVxuICAgIHRoaXMuZ2FtZU92ZXJUZXh0LnNldFRleHQoJycpXG4gIH1cblxuICBhZGRCYWNrZ3JvdW5kKCkge1xuICAgIHRoaXMuYWRkLmltYWdlKHRoaXMuZ2FtZVdpZHRoIC8gMiwgdGhpcy5nYW1lSGVpZ2h0IC8gMiwgJ3NreScpXG4gIH1cblxuICBhZGRQbGF0Zm9ybXMoKSB7XG4gICAgdGhpcy5wbGF0Zm9ybXMgPSB0aGlzLnBoeXNpY3MuYWRkLnN0YXRpY0dyb3VwKClcbiAgICAvLyBzZXRTY2FsZSgpIGFkanVzdHMgdGhlIHdpZHRoIGFuZCBoZWlnaHRcbiAgICAvLyByZWZyZXNoQm9keSgpIHRlbGxzIHRoZSBwaHlzaWNzIHdvcmxkIGFib3V0IHRoZSBzY2FsZSBjaGFuZ2VcbiAgICB0aGlzLnBsYXRmb3Jtcy5jcmVhdGUoNDAwLCA1NjgsICdwbGF0Zm9ybScpLnNldFNjYWxlKDIpLnJlZnJlc2hCb2R5KClcbiAgICB0aGlzLnBsYXRmb3Jtcy5jcmVhdGUoNjAwLCA0MDAsICdwbGF0Zm9ybScpXG4gICAgdGhpcy5wbGF0Zm9ybXMuY3JlYXRlKDUwLCAyNTAsICdwbGF0Zm9ybScpXG4gICAgdGhpcy5wbGF0Zm9ybXMuY3JlYXRlKDc1MCwgMjIwLCAncGxhdGZvcm0nKVxuICB9XG5cbiAgYWRkUGxheWVyKCkge1xuICAgIHRoaXMucGxheWVyID0gdGhpcy5waHlzaWNzLmFkZC5zcHJpdGUodGhpcy5wbGF5ZXJQb3NpdGlvblgsIHRoaXMucGxheWVyUG9zaXRpb25ZLCAnZHVkZScpXG4gICAgdGhpcy5wbGF5ZXIuc2V0Qm91bmNlKDAuMilcbiAgICB0aGlzLnBsYXllci5zZXRDb2xsaWRlV29ybGRCb3VuZHModHJ1ZSlcbiAgICB0aGlzLnBsYXllci5ib2R5LnNldEdyYXZpdHlZKDMwKVxuXG4gICAgdGhpcy5hbmltcy5jcmVhdGUoe1xuICAgICAga2V5OiAnbGVmdCcsXG4gICAgICBmcmFtZXM6IHRoaXMuYW5pbXMuZ2VuZXJhdGVGcmFtZU51bWJlcnMoJ2R1ZGUnLCB7IHN0YXJ0OiAwLCBlbmQ6IDMgfSksXG4gICAgICBmcmFtZVJhdGU6IDEwLFxuICAgICAgcmVwZWF0OiAtMSwgLy8gdGVsbHMgdGhlIGFuaW1hdGlvbiB0byBsb29wXG4gICAgfSlcblxuICAgIHRoaXMuYW5pbXMuY3JlYXRlKHtcbiAgICAgIGtleTogJ3R1cm4nLFxuICAgICAgZnJhbWVzOiBbIHsga2V5OiAnZHVkZScsIGZyYW1lOiA0IH0gXSxcbiAgICAgIGZyYW1lUmF0ZTogMjAsXG4gICAgfSlcblxuICAgIHRoaXMuYW5pbXMuY3JlYXRlKHtcbiAgICAgIGtleTogJ3JpZ2h0JyxcbiAgICAgIGZyYW1lczogdGhpcy5hbmltcy5nZW5lcmF0ZUZyYW1lTnVtYmVycygnZHVkZScsIHsgc3RhcnQ6IDUsIGVuZDogOCB9KSxcbiAgICAgIGZyYW1lUmF0ZTogMTAsXG4gICAgICByZXBlYXQ6IC0xLFxuICAgIH0pXG4gIH1cblxuICByZXNldFBsYXllcigpIHtcbiAgICB0aGlzLnBsYXllci5jbGVhclRpbnQoKVxuICAgIHRoaXMucGxheWVyLmVuYWJsZUJvZHkodHJ1ZSwgdGhpcy5wbGF5ZXJQb3NpdGlvblgsIHRoaXMucGxheWVyUG9zaXRpb25ZLCB0cnVlLCB0cnVlKVxuICB9XG5cbiAgYWRkU3RhckRlY29yYXRpb25zKCkge1xuICAgIHRoaXMuYWRkLmltYWdlKDAsIDAsICdzdGFyJykuc2V0T3JpZ2luKDAsIDApXG4gICAgdGhpcy5hZGQuaW1hZ2UodGhpcy5nYW1lV2lkdGgsIDAsICdzdGFyJykuc2V0T3JpZ2luKDEsIDApXG4gICAgdGhpcy5hZGQuaW1hZ2UoMCwgdGhpcy5nYW1lSGVpZ2h0LCAnc3RhcicpLnNldE9yaWdpbigwLCAxKVxuICAgIHRoaXMuYWRkLmltYWdlKHRoaXMuZ2FtZVdpZHRoLCB0aGlzLmdhbWVIZWlnaHQsICdzdGFyJykuc2V0T3JpZ2luKDEsIDEpXG4gIH1cblxuICBhZGRNZWxvbnMoKSB7XG4gICAgdGhpcy5tZWxvbnMgPSB0aGlzLnBoeXNpY3MuYWRkLmdyb3VwKHtcbiAgICAgIGtleTogJ21lbG9uJywgLy8gdGV4dHVyZSBrZXlcbiAgICAgIHJlcGVhdDogMTEsIC8vIDEyIGluIHRvdGFsOiAxIGNoaWxkIGlzIGNyZWF0ZWQgYXV0b21hdGljYWxseSwgcmVwZWF0aW5nIDExIHRpbWVzXG4gICAgICBzZXRYWTogeyB4OiAxMiwgeTogMCwgc3RlcFg6IDcwIH0sIC8vIGVhY2ggY2hpbGQgcGxhY2VkIGF0ICgxMiwgMCkgd2l0aCA3MCBob3JpeiBwaXhlbHMgYi93IHRoZW0gKGkuZS4gbmV4dCBhdCAoODIsIDApKVxuICAgIH0pXG5cbiAgICB0aGlzLm1lbG9ucy5jaGlsZHJlbi5pdGVyYXRlKChjaGlsZCkgPT4ge1xuICAgICAgLy8gaXRlcmF0ZSB0aHJ1IGFsbCBjaGlsZHJlbiBhbmQgYXNzaWduIHJhbmRvbSBib3VuY2UgdG8gZWFjaFxuICAgICAgY2hpbGQuc2V0Qm91bmNlWShQaGFzZXIuTWF0aC5GbG9hdEJldHdlZW4oMC4xLCAwLjQpKVxuICAgIH0pXG4gIH1cblxuICByZXNldE1lbG9ucygpIHtcbiAgICB0aGlzLm1lbG9ucy5jaGlsZHJlbi5pdGVyYXRlKChjaGlsZCkgPT4ge1xuICAgICAgLy8gcmVzZXQgdGhlIHkgcG9zaXRpb24gb2YgZWFjaCBtZWxvbiB0byAwXG4gICAgICBjaGlsZC5lbmFibGVCb2R5KHRydWUsIGNoaWxkLngsIDAsIHRydWUsIHRydWUpXG4gICAgfSlcbiAgfVxuXG4gIGFkZEJvbWJzKCkge1xuICAgIHRoaXMuYm9tYnMgPSB0aGlzLnBoeXNpY3MuYWRkLmdyb3VwKClcbiAgfVxuXG4gIGdlbmVyYXRlQm9tYihwbGF5ZXIpIHtcbiAgICBjb25zdCBib21iUG9zaXRpb24gPSAocGxheWVyLnggPCA0MDApID8gUGhhc2VyLk1hdGguQmV0d2Vlbig0MDAsIDgwMCkgOiBQaGFzZXIuTWF0aC5CZXR3ZWVuKDAsIDQwMClcbiAgICBjb25zdCBib21iID0gdGhpcy5ib21icy5jcmVhdGUoYm9tYlBvc2l0aW9uLCAxNiwgJ2JvbWInKVxuXG4gICAgYm9tYi5zZXRCb3VuY2UoMSlcbiAgICBib21iLnNldENvbGxpZGVXb3JsZEJvdW5kcyh0cnVlKVxuICAgIGJvbWIuc2V0VmVsb2NpdHkoUGhhc2VyLk1hdGguQmV0d2VlbigtMjAwLCAyMDApLCAyMClcbiAgICBib21iLmFsbG93R3Jhdml0eSA9IGZhbHNlXG4gIH1cblxuICByZXNldEJvbWJzKCkge1xuICAgIHRoaXMuYm9tYnMuY2hpbGRyZW4uaXRlcmF0ZSgoY2hpbGQpID0+IHtcbiAgICAgIGNoaWxkICYmIGNoaWxkLmRlc3Ryb3koKVxuICAgIH0pXG5cbiAgICB0aGlzLmJvbWJzLmNsZWFyKHRydWUpXG4gIH1cblxuICBjb2xsZWN0TWVsb24ocGxheWVyLCBtZWxvbikge1xuICAgIG1lbG9uLmRpc2FibGVCb2R5KHRydWUsIHRydWUpXG5cbiAgICB0aGlzLnVwZGF0ZVNjb3JlKClcblxuICAgIGlmICh0aGlzLm1lbG9ucy5jb3VudEFjdGl2ZSh0cnVlKSA9PT0gMCkge1xuICAgICAgdGhpcy5yZXNldE1lbG9ucygpXG4gICAgICB0aGlzLmdlbmVyYXRlQm9tYihwbGF5ZXIpXG4gICAgfVxuICB9XG5cbiAgaGl0Qm9tYihwbGF5ZXIsIGJvbWIpIHtcbiAgICB0aGlzLnBoeXNpY3MucGF1c2UoKVxuICAgIHRoaXMucGxheWVyLnNldFRpbnQoMHhmZjAwMDApXG4gICAgdGhpcy5wbGF5ZXIuYW5pbXMucGxheSgndHVybicpXG4gICAgdGhpcy5nYW1lT3ZlciA9IHRydWVcbiAgfVxuXG4gIHJlc2V0R2FtZSgpIHtcbiAgICB0aGlzLnVwZGF0ZVNjb3JlKDApXG4gICAgdGhpcy5yZW1vdmVHYW1lT3ZlclRleHQoKVxuICAgIHRoaXMucmVzZXRQbGF5ZXIoKVxuICAgIHRoaXMucmVzZXRNZWxvbnMoKVxuICAgIHRoaXMucmVzZXRCb21icygpXG4gICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlXG4gICAgdGhpcy5waHlzaWNzLnJlc3VtZSgpXG4gIH1cblxuICBzZXRQYXVzZSgpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHRoaXMucGF1c2VUZXh0LnNldFRleHQodGhpcy5wYXVzZUNvcHkpXG4gICAgICB0aGlzLmFuaW1zLnJlc3VtZUFsbCgpXG4gICAgICB0aGlzLnBoeXNpY3MucmVzdW1lKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXVzZVRleHQuc2V0VGV4dCh0aGlzLnVucGF1c2VDb3B5KVxuICAgICAgdGhpcy5hbmltcy5wYXVzZUFsbCgpXG4gICAgICB0aGlzLnBoeXNpY3MucGF1c2UoKVxuICAgIH1cblxuICAgIHRoaXMucGF1c2VkID0gIXRoaXMucGF1c2VkXG4gIH1cblxuICBwcmVsb2FkKCkge1xuICAgIHRoaXMubG9hZC5pbWFnZSgnYm9tYicsICdhc3NldHMvYm9tYi5wbmcnKVxuICAgIHRoaXMubG9hZC5pbWFnZSgnbWVsb24nLCAnYXNzZXRzL21lbG9uLnBuZycpXG4gICAgdGhpcy5sb2FkLmltYWdlKCdwbGF0Zm9ybScsICdhc3NldHMvcGxhdGZvcm0ucG5nJylcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ3NreScsICdhc3NldHMvc2t5LnBuZycpXG4gICAgdGhpcy5sb2FkLmltYWdlKCdzdGFyJywgJ2Fzc2V0cy9zdGFyLnBuZycpXG5cbiAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ2R1ZGUnLCAnYXNzZXRzL2R1ZGUucG5nJywgeyBmcmFtZVdpZHRoOiAzMiwgZnJhbWVIZWlnaHQ6IDQ4IH0pXG5cbiAgICB0aGlzLnNjb3JlID0gMFxuICAgIHRoaXMuaGlnaFNjb3JlID0gdGhpcy5oaWdoU2NvcmVGcm9tU3RvcmFnZSB8fCAwXG4gICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlXG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZVxuICB9XG5cbiAgY3JlYXRlKCkge1xuICAgIHRoaXMuYWRkQmFja2dyb3VuZCgpXG4gICAgdGhpcy5hZGRQbGF0Zm9ybXMoKVxuICAgIHRoaXMuYWRkU3RhckRlY29yYXRpb25zKClcbiAgICB0aGlzLmFkZFRpdGxlVGV4dCgpXG4gICAgdGhpcy5hZGRTY29yZVRleHQoKVxuICAgIHRoaXMuYWRkSGlnaFNjb3JlVGV4dCgpXG4gICAgdGhpcy5hZGRQYXVzZVRleHQoKVxuICAgIHRoaXMuYWRkUGxheWVyKClcbiAgICB0aGlzLmFkZE1lbG9ucygpXG4gICAgdGhpcy5hZGRCb21icygpXG5cbiAgICB0aGlzLmN1cnNvcnMgPSB0aGlzLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKVxuXG4gICAgLy8gY29sbGlzaW9ucyBhbmQgb3ZlcmxhcHMgY2FuIGludm9rZSBhbiBvcHRpb25hbCBjYWxsYmFja1xuICAgIHRoaXMucGh5c2ljcy5hZGQuY29sbGlkZXIodGhpcy5wbGF5ZXIsIHRoaXMucGxhdGZvcm1zKVxuICAgIHRoaXMucGh5c2ljcy5hZGQuY29sbGlkZXIodGhpcy5tZWxvbnMsIHRoaXMucGxhdGZvcm1zKVxuICAgIHRoaXMucGh5c2ljcy5hZGQuY29sbGlkZXIodGhpcy5ib21icywgdGhpcy5wbGF0Zm9ybXMpXG4gICAgdGhpcy5waHlzaWNzLmFkZC5vdmVybGFwKHRoaXMucGxheWVyLCB0aGlzLm1lbG9ucywgdGhpcy5jb2xsZWN0TWVsb24sIG51bGwsIHRoaXMpXG4gICAgdGhpcy5waHlzaWNzLmFkZC5jb2xsaWRlcih0aGlzLnBsYXllciwgdGhpcy5ib21icywgdGhpcy5oaXRCb21iLCBudWxsLCB0aGlzKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLnNjb3JlID4gdGhpcy5oaWdoU2NvcmUpIHtcbiAgICAgIHRoaXMuc2V0SGlnaFNjb3JlKClcbiAgICB9XG5cbiAgICBpZiAodGhpcy5nYW1lT3Zlcikge1xuICAgICAgdGhpcy5hZGRHYW1lT3ZlclRleHQoKVxuICAgICAgaWYgKHRoaXMuYW55R2FtZUtleUlzUHJlc3NlZCkge1xuICAgICAgICB0aGlzLnJlc2V0R2FtZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKFBoYXNlci5JbnB1dC5LZXlib2FyZC5KdXN0RG93bih0aGlzLmN1cnNvcnMuc3BhY2UpKSB7XG4gICAgICB0aGlzLnNldFBhdXNlKClcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh0aGlzLmN1cnNvcnMuZG93bi5pc0Rvd24gJiYgdGhpcy5jdXJzb3JzLnJpZ2h0LmlzRG93bikge1xuICAgICAgdGhpcy5wbGF5ZXIuc2V0VmVsb2NpdHlYKDMyMClcbiAgICAgIHRoaXMucGxheWVyLmFuaW1zLnBsYXkoJ2xlZnQnLCB0cnVlKVxuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJzb3JzLmRvd24uaXNEb3duICYmIHRoaXMuY3Vyc29ycy5sZWZ0LmlzRG93bikge1xuICAgICAgdGhpcy5wbGF5ZXIuc2V0VmVsb2NpdHlYKC0zMjApXG4gICAgICB0aGlzLnBsYXllci5hbmltcy5wbGF5KCdyaWdodCcsIHRydWUpXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnNvcnMubGVmdC5pc0Rvd24pIHtcbiAgICAgIHRoaXMucGxheWVyLnNldFZlbG9jaXR5WCgtMTYwKVxuICAgICAgdGhpcy5wbGF5ZXIuYW5pbXMucGxheSgnbGVmdCcsIHRydWUpXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnNvcnMucmlnaHQuaXNEb3duKSB7XG4gICAgICB0aGlzLnBsYXllci5zZXRWZWxvY2l0eVgoMTYwKVxuICAgICAgdGhpcy5wbGF5ZXIuYW5pbXMucGxheSgncmlnaHQnLCB0cnVlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBsYXllci5zZXRWZWxvY2l0eVgoMClcbiAgICAgIHRoaXMucGxheWVyLmFuaW1zLnBsYXkoJ3R1cm4nKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmN1cnNvcnMudXAuaXNEb3duICYmIHRoaXMucGxheWVyLmJvZHkudG91Y2hpbmcuZG93bikge1xuICAgICAgdGhpcy5wbGF5ZXIuc2V0VmVsb2NpdHlZKC0zMzApXG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NlbmVzL3NpbXBsZVNjZW5lLmpzIiwiaW1wb3J0ICdwaGFzZXInXG5pbXBvcnQgeyBTaW1wbGVTY2VuZSB9IGZyb20gJy4vc2NlbmVzL3NpbXBsZVNjZW5lJ1xuXG5jb25zdCBnYW1lQ29uZmlnID0ge1xuICB0eXBlOiBQaGFzZXIuQVVUTyxcbiAgd2lkdGg6IDgwMCxcbiAgaGVpZ2h0OiA2MDAsXG4gIHBoeXNpY3M6IHtcbiAgICBkZWZhdWx0OiAnYXJjYWRlJyxcbiAgICBhcmNhZGU6IHtcbiAgICAgIGdyYXZpdHk6IHsgeTogMzAwIH0sXG4gICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgfVxuICB9LFxuICBzY2VuZTogU2ltcGxlU2NlbmUsXG59XG5cbmNvbnN0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoZ2FtZUNvbmZpZylcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=