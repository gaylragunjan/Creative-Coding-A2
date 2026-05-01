// exercise 2 - alien
// made by gayl ragunjan for creative computing assessment 2
// submitted to ms. lavanya mohan


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(29, 23, 19);
  noStroke();
  fill(255);
  randomSeed(42); // without this, the loop will continuously generate new outcomes, which will end up flashing. so we choose a set seed or randomization of numbers which is what'll make our stars stay in place the entire time.
  for (let i = 0; i < 250; i++) {
    // i starts at zero and goes up until it reaches 250. it puts an ellipse in a random spot on the canvas! the last two values determines its size randomly in a range of 2.5-5 pixels.
    fill(255, 245, 245);
    ellipse(random(width), random(height), random(2.5 - 5));
  }
  let floating = sin(frameCount * 0.04) * 30; // i had a hard time understanding how to make a floating animation that eased in and out like with css! i figured it out through this: https://p5js.org/reference/p5/sin/

  // we turn the animation itself into a variable. the frameCount counts up by 1 every frame of the cycle. we mltiply it by 0.04 so the frames slow down! when we put it in a sin function, it turns our value into a wave that kind of oscillates and gives us the effect were looking for! then we stretch the wave between 30 and -30 pixels. which is what moves it up and down!

  translate(200, 200 + floating); // this sets the origin of our alien to the center of the screen. plus adding the floating animation, it moves vertically but stays in place.
  alien(); // the parts of our alien are all pushed into one function we can call and work with. just like turning it into a group!
}

function alien() {
  push();
  translate(-200, -220);
  strokeWeight(4);
  stroke(38, 27, 20);

  push();
  fill(103, 93, 66);
  ellipse(200, 260, 190, 100);
  pop();

  push();
  fill(164, 149, 110);
  ellipse(200, 250, 250, 100);
  pop();

  push();
  fill(206, 193, 155);
  ellipse(200, 200, 120, 130);
  pop();

  push();
  noStroke();
  fill(164, 149, 110);
  ellipse(200, 250, 245, 95);
  pop();

  function windowwww(x, y) {
    // this is the window which basically repeats and shows up three times so instead of having the same lines of code repeated, i turned it into a function i could just call three times!
    push();
    fill(103, 93, 66);
    ellipse(x, y, 45, 45);
    fill(164, 149, 110);
    ellipse(x, y, 32, 32);
    pop();
  }

  windowwww(200, 265);
  windowwww(110, 250);
  windowwww(290, 250);

  push();
  fill(206, 193, 155);
  ellipse(200, 203, 120, 50);
  noStroke();
  ellipse(200, 197, 116, 55);
  pop();

  push();
  fill(133, 114, 61); // a lot of the parts are layered in a way to make some of the shapes work! like the ufo glass and the alien!
  rect(210, 155, 6, 20);
  circle(213, 150, 10);
  rect(180, 155, 6, 20);
  circle(183, 150, 10);
  ellipse(200, 190, 70, 60);
  pop();

  push();
  noStroke();
  fill(113, 20, 29);
  circle(200, 200, 10);
  pop();

  push();
  noStroke();
  fill(38, 27, 20);
  ellipse(205, 190, 5, 3);
  ellipse(195, 190, 5, 3);
  ellipse(200, 210, 10, 3);
  pop();

  noStroke();
  fill(133, 114, 61);
  rect(212, 150, 3, 20);
  rect(182, 150, 3, 20);

  pop();
}
