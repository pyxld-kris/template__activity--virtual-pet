import Phaser from "phaser";

import Animal from "/.DO_NOT_TOUCH/classes/Animal.js";
import Ball from "/.DO_NOT_TOUCH/classes/Ball.js";

import Instruction from "./classes/Instruction";
import InstructionSequence from "./classes/InstructionSequence";

/* Lift classes to global scope */
(function() {
  // We have to lift classes we need access to to the
  //   global scope (stupid module scoping issue)
  // This is done so students can code in a clean script file (without
  //    having to use imports/exports, etc.)
  window.Animal = Animal;
  window.Ball = Ball;
})();

/*
 * evalWithinContext()
 * Allows a string of javascript code to be executed within the given scope/context
 * Used after fetching student code in order to run it within the current Phaser scene
 *     (Keeps student coding interface clean)
 */
var evalWithinContext = function(context, code) {
  (function(code) {
    eval(code);
  }.apply(context, [code]));
};

class PlayScene extends Phaser.Scene {
  preload() {
    this.load.image("sky", "/.DO_NOT_TOUCH/assets/sky.png");
    this.load.image("ground", "/.DO_NOT_TOUCH/assets/ground.png");
    this.load.image("cloud", "/.DO_NOT_TOUCH/assets/cloud.png");
    this.load.image("meat", "/.DO_NOT_TOUCH/assets/meat.png");
    this.load.image("ball", "/.DO_NOT_TOUCH/assets/ball.png");

    // Load the pet's spritesheet
    this.load.spritesheet("pet", "/.DO_NOT_TOUCH/assets/pet.png", {
      frameWidth: 17,
      frameHeight: 21,
      margin: 0,
      spacing: 0
    });
  }

  // This function creates a pet and adds it to the scene
  createPet() {
    this.pet = new Animal(this, 30, 10);
    this.pet.sprite.setCollideWorldBounds(true);
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
    this.createPet();

    // Create the ball
    this.ball = new Ball(this, 50, 10);

    this.physics.add.collider(this.pet.sprite, this.ground);
    this.physics.add.collider(this.ball.sprite, this.ground);
    this.physics.add.collider(this.pet.sprite, this.ball.sprite);

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
      .setScale(0.5); // Makes text more crisp

    new InstructionSequence(this, [
      new Instruction(this, "This is your new pet", 2000),
      new Instruction(this, "Code to care for it", 2000)
    ]);

    this.loadModifyCode();
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

  loadModifyCode() {
    // Let's load the modify.js script and run it in this scope!
    // using this method instead of import to maintain scene scope and keep import/export
    //    out of the modify.js script. More simple for students to work with
    /* eslint-disable */
    var scene = this;
    let codeText = fetch("../modify.mjs")
      .then(function(response) {
        return response.text();
      })
      .then(function(textString) {
        evalWithinContext(scene, textString);
      });
    /* eslint-enable */
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
