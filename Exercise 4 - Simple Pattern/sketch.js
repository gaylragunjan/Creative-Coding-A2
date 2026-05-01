// exercise 4 - simple pattern
// made by gayl ragunjan for creative computing assessment 2
// submitted to ms. lavanya mohan


function preload() {
  img = loadImage("pooop.png");
}

function setup() {
  createCanvas(400, 400);
  noLoop(); // this stops the loop from constantly repeating. unlike setting the random seed which will keep the same order of fishes even if you refresh, this changes the outcome every time you reload the page.
}

function draw() {
  imageMode(CENTER); // this sets the origin of our background image to the center, so if we position it at the center of our canvas, it will be in the right place and it wont take the corner instead!
  image(img, 200, 170, 401, 500);

  for (let i = 0; i < 25; i++) {
    // like the loop i used to make the stars
    let c = color(random(167, 128), random(89, 58), random(44, 18)); // we randomize each RGB value in ranges but they will all produce a shade of orange
    let x = random(width); // this places a fish anywhere horizontally
    let y = random(350); // this is specific to the height of the canvas! i put 350 so that fishes dont show up too close to the bottom.
    let size = random(0.3, 0.5); // this randomizes their sizes slightly
    fishy(x, y, size, c); // we call our fish function and its different attributes!
  }
}

function fishy(x, y, size, c) {
  // just like the car and alien, this is the same concept uf using shapes to create the fish in a function we can use and manipulate!
  push();
  translate(x, y);
  scale(size);
  translate(-200, -200);

  fill(c);
  strokeWeight(8);
  stroke(38, 27, 20);

  // tail
  push();
  beginShape();
  vertex(250, 200);
  vertex(300, 225);
  vertex(300, 175);
  vertex(250, 200);
  endShape(CLOSE);
  pop();

  // top fin
  push();
  beginShape();
  vertex(180, 170);
  vertex(200, 150);
  vertex(230, 145);
  vertex(235, 170);
  vertex(180, 170);
  endShape(CLOSE);
  pop();

  // body
  push();
  ellipse(200, 200, 60, 30);
  ellipse(200, 200, 150, 80);
  pop();

  // eye
  push();
  fill(255, 245, 245);
  strokeWeight(6);
  ellipse(150, 200, 30);

  fill(38, 27, 20);
  noStroke();
  ellipse(157, 200, 15);
  pop();

  // fin
  push();
  strokeWeight(6);
  fill(c);
  stroke(41, 35, 30);
  ellipse(220, 200, 50, 20);
  pop();

  pop();
}
