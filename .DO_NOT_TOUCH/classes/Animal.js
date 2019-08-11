export default class Animal {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the animations we need from the player spritesheet
    const anims = scene.anims;

    anims.create({
      key: "johnny-idle",
      frames: anims.generateFrameNumbers("johnny", { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1
    });

    anims.create({
      key: "johnny-walk",
      frames: anims.generateFrameNumbers("johnny", { start: 5, end: 7 }),
      frameRate: 12,
      repeat: -1
    }); // Create the physics-based sprite that we will move around and animate

    this.sprite = scene.physics.add
      .sprite(x, y, "johnny", 0)
      .setDrag(500, 0)
      .setMaxVelocity(200, 400);

    this.sprite.anims.play("johnny-idle", true);
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
  }

  destroy() {
    this.sprite.destroy();
  }
}
