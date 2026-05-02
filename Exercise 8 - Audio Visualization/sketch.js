// exercise 8 - audio visualization
// made by gayl ragunjan for creative computing assessment 2
// submitted to ms. lavanya mohan


let baby = []; // create an array to store our images! (based most of this off of the animation exercises we did in class)
let mic, sound; // we create variables for our audio-in and our audio level

function preload() {
  baby[0] = loadImage("1.png"); // we preload our images as elements in our baby[] array! giving them indices so we can access them.
  baby[1] = loadImage("2.png");
}

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn(); // this creates a microphone input object using a built in p5 sound library function, and stores it in our mic variable.
  mic.start(); // this function is what requests permission from the browser to access the microphone and begins capturing audio. our mic only recieves data when this is called or allowed by the user!
}

function draw() {
  background(255, 245, 245);
  textAlign(CENTER);
  textSize(12);
  text("talk baby, talk!", 200, 330);

  sound = mic.getLevel(); // using the getLevel() function, we get the current volume/amplitude from the mic and returns a number which we store in our sound variable.

  let stwetch; // our dynamic height variable!
  if (sound > 0.5) {
    // if the volume our sound variable picks up is above the threshold of 0.5, stwetch scales from 250 to 260 based on how loud it is!
    stwetch = map(sound, 0.5, 1, 250, 260);
  } else {
    stwetch = 250; // otherwise h stays at 250. this is how the image stretches when the volume gets loud!
  }

  imageMode(CENTER);

  let ahhh; // this is how we do the animation part!
  if (sound > 0.5) {
    // if the volume is greater than 0.5,
    ahhh = baby[1]; // itll change the current image on the screen to the second image in our array of images, which has the index of 1! this is also the open-mouth version of the image, which makes it look like when we're speaking, its coming out of the babys mouth heheehehehe
  } else {
    // and if its quiet, it stays as the closed mouth version of the image, which is the first image in our array.
    ahhh = baby[0];
  }
  image(ahhh, 200, 190, 250, stwetch); // here we draw the image, with the animation variable so it can change faces, its position, its fixed width and its dynamic height.
}
