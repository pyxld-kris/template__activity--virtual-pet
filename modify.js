// First, we have to grab all of the stuff we need to make this file work
import Phaser from "phaser";
import Animal from "/.DO_NOT_TOUCH/classes/Animal.js";

/***********************************************************
 *  Do Stuff after this line! */

// This function creates a goal and adds it to the scene
export function createGoal(scene) {
  // Goal
}

// This function creates a player and adds it to the scene
export function createPet(scene) {
  console.log("creating animal");
  this.pet = new Animal(this, 30, 10);
  this.pet.sprite.setCollideWorldBounds(true);
}
