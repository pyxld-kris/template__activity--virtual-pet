import Phaser from "phaser";

export default class Instruction {
  constructor(scene, instructionString, displayDuration) {
    this.scene = scene;
    this.instructionString = instructionString;
    this.displayDuration = displayDuration;
  }

  display() {
    let scene = this.scene;

    let halfScreenWidth = scene.game.config.width / 2;
    let halfScreenHeight = scene.game.config.height / 2;
    this.text = scene.add
      .text(halfScreenWidth, 0, this.instructionString, {
        font: "10px monospace",
        fill: "#ffffff",
        align: "center",
        padding: { x: 1, y: 1 },
        backgroundColor: "transparent"
      })
      .setScrollFactor(0)
      .setOrigin(0.5);

    this.textTween = scene.tweens.add({
      targets: this.text,
      y: halfScreenHeight, // '+=100'
      ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 1000,
      repeat: -1, // -1: infinity
      yoyo: true
    });

    this.destroyTimer = scene.time.addEvent({
      delay: this.displayDuration, // ms
      callback: () => {
        this.destroy();
      }
    });
  }

  destroy() {
    if (this.textTween !== undefined) this.textTween.complete();
    if (this.textTween !== undefined) this.text.destroy();
  }
}
