/* eslint-disable */
let scene = this; // Setting this variable for readability

// How many food items should we give to our pet?
var NUM_FOODS = 3; // Integer variable

// This function creates one food item in our active game scene
function createFood() {
  let thisMeat = scene.physics.add.sprite(60+Math.floor(Math.random()*60), 10, 'meat');
  scene.physics.add.collider(thisMeat, scene.ground);
  scene.physics.add.collider(thisMeat, scene.pet.sprite, function() {
    thisMeat.destroy();
  });
}

// Loop the appropriate number of times defined by NUM_FOODS
for (let i=0; i<NUM_FOODS; i++) {
  createFood();
}

/*
var PET_NAME = "Pet"; // String variable
var NUM_FOOD = 0; // Integer variable
*/

/*
scene.ball2 = new Ball(scene, 90, 10);
scene.physics.add.collider(scene.ball2.sprite, scene.ground);
scene.physics.add.collider(scene.ball2.sprite, scene.pet.sprite);
*/

//scene.meat = scene.physics.add.sprite(60, 10, 'meat');
//scene.physics.add.collider(scene.meat, scene.ground);


