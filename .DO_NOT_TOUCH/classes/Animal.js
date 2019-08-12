export default class Animal {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the animations we need from the player spritesheet
    const anims = scene.anims;

    anims.create({
      key: "pet-idle",
      frames: anims.generateFrameNumbers("pet", { start: 0, end: 0 }),
      frameRate: 3,
      repeat: -1
    });

    anims.create({
      key: "pet-walk",
      frames: anims.generateFrameNumbers("pet", { start: 1, end: 1 }),
      frameRate: 12,
      repeat: -1
    }); // Create the physics-based sprite that we will move around and animate

    this.sprite = scene.physics.add
      .sprite(x, y, "pet", 0)
      .setDrag(500, 0)
      .setMaxVelocity(200, 400);

    this.sprite.anims.play("pet-idle", true);

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
