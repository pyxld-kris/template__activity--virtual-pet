import Phaser from "phaser";

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;

    this.sprite = scene.physics.add
      .sprite(x, y, "ball", 0)
      .setDrag(500, 0)
      .setMaxVelocity(200, 400)
      .setBounce(0.6);

    // Let's make something happen when we click on this animal
    this.sprite
      .setInteractive()
      .setOrigin() // fixes interactive offset issue
      .on("pointerdown", function(pointer, localX, localY, event) {
        this.scene.physics.add.sprite(50, 10, "meat");
      });
  }

  update() {
    if (Math.random() < 0.02) {
      var leftOrRight = Math.random();
      if (leftOrRight < 0.5) {
        this.sprite.setVelocity(100, 0);
      } else {
        this.sprite.setVelocity(-100, 0);
      }
    }

    if (this.sprite.body.velocity.x > 0) {
      this.sprite.anims.play("pet-walk", true);
      this.sprite.flipX = false;
    } else if (this.sprite.body.velocity.x < 0) {
      this.sprite.anims.play("pet-walk", true);
      this.sprite.flipX = true;
    } else {
      this.sprite.anims.play("pet-idle", true);
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
