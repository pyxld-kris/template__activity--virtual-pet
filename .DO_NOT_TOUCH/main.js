import Phaser from "phaser";

import Animal from "/.DO_NOT_TOUCH/classes/Animal.js";

import { createPet, createPlatforms, createGoal } from "/modify.js";

import Instruction from "./classes/Instruction";
import InstructionSequence from "./classes/InstructionSequence";

class PlayScene extends Phaser.Scene {
  preload() {
    this.load.spritesheet("johnny", "/.DO_NOT_TOUCH/assets/johnny_sprite.png", {
      frameWidth: 16,
      frameHeight: 16,
      margin: 0,
      spacing: 0
    });
  }

  create() {
    createPet.call(this);
    createPlatforms.call(this);
    createGoal.call(this);

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);

    this.add
      .text(0, 0, "Take care of your pet!", {
        font: "8px monospace",
        fill: "#ffffff",
        padding: { x: 1, y: 1 },
        backgroundColor: "transparent"
      })
      .setScrollFactor(0);

    new InstructionSequence(this, [
      new Instruction(
        this,
        "Change the code to\nmove your character\nto the exit!!!",
        2000
      ),
      new Instruction(this, "Remove the red wall!", 2000)
    ]);
  }

  update(time, delta) {
    this.pet.update(time, delta);
  }

  /* <Begin> helper functions added by Kris */
  //
  //

  addPhysicalRectangle(x, y, width, height, color, alphaIThinkMaybe) {
    // TODO: alphaIThinkMaybe name change
    let rect = this.add.rectangle(x, y, width, height, color, alphaIThinkMaybe);
    rect = this.physics.add.existing(rect, true);

    return rect;
  }

  /* </End> Helper functions added by kris */
}

const config = {
  type: Phaser.AUTO,
  width: 500 / 3,
  height: 300 / 3,
  parent: "game-container",
  pixelArt: true,
  zoom: 2,
  backgroundColor: "#3333AA",
  scene: PlayScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 }
    }
  }
};

const game = new Phaser.Game(config);
let controls;
