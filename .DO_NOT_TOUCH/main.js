import Phaser from "phaser";

import Animal from "/.DO_NOT_TOUCH/classes/Animal.js";

import { createPet, createPlatforms, createGoal } from "/modify.js";

import Instruction from "./classes/Instruction";
import InstructionSequence from "./classes/InstructionSequence";

class PlayScene extends Phaser.Scene {
  preload() {
    this.load.image("sky", "/.DO_NOT_TOUCH/assets/sky.png");
    this.load.image("ground", "/.DO_NOT_TOUCH/assets/ground.png");
    this.load.image("cloud", "/.DO_NOT_TOUCH/assets/cloud.png");
    this.load.image("meat", "/.DO_NOT_TOUCH/assets/meat.png");

    // Load the pet's spritesheet
    this.load.spritesheet("pet", "/.DO_NOT_TOUCH/assets/pet.png", {
      frameWidth: 17,
      frameHeight: 21,
      margin: 0,
      spacing: 0
    });
  }

  create() {
    let halfGameWidth = this.game.config.width / 2;
    let halfGameHeight = this.game.config.height / 2;

    // Create sky
    this.sky = this.add.sprite(halfGameWidth, halfGameHeight, "sky");

    // Create ground
    this.ground = this.physics.add.staticSprite(halfGameWidth, 83, "ground");

    // Create clouds
    this.cloudLeft = this.add.sprite(50, 20, "cloud");
    this.cloudRight = this.add.sprite(150, 5, "cloud");

    // Create pet
    createPet.call(this);
    createGoal.call(this);

    this.physics.add.collider(this.pet.sprite, this.ground);

    const camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    camera.setBounds(0, 0, this.game.config.width, this.game.config.height);

    this.add
      .text(
        Math.floor(this.game.config.width / 2),
        Math.floor(this.game.config.height - 10),
        "Your pet needs food!",
        {
          fontSize: "16px",
          fontFamily: '"Press Start 2P"',
          align: "center",
          fill: "#ffffff",
          padding: { x: 1, y: 1 },
          backgroundColor: "transparent"
        }
      )
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setResolution(3) // Makes text more crisp
      .setScale(0.45); // Makes text more crisp

    new InstructionSequence(this, [
      new Instruction(this, "This is your new pet", 2000),
      new Instruction(this, "Code to care for it", 2000)
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
  width: Math.floor(500 / 3),
  height: Math.floor(300 / 3),
  parent: "game-container",
  pixelArt: true,
  /*
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  },
  */
  autoRound: false,
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
