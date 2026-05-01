// exercise 3 - working with images
// made by gayl ragunjan for creative computing assessment 2
// submitted to ms. lavanya mohan

function preload() {
  img = loadImage("chhichi2.png"); // we first preload the image were using! (my take on this activity is kinda different from the sample but i based it off of some )
}

function setup() {
  createCanvas(400, 400);
  noLoop();
  frameRate(2);
}

function star(x, y, radius1, radius2, npoints) {
  noStroke();
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE); // star taken from https://archive.p5js.org/examples/form-star.html!!
}

let punches = [ // this is the array that holds the specific positions of all our stars!!!
  { x: 78, y: 150 },
  { x: 15, y: 90 },
  { x: 40, y: 40 },
  { x: 180, y: 110 },
  { x: 260, y: 185 },
  { x: 220, y: 30 },
  { x: 320, y: 140 },
  { x: 400, y: 170 },
  { x: 350, y: 80 },
  { x: 315, y: 0 },
];


function draw() {
  background(38, 27, 20);
  image(img, 0, 0, 400, 200);

  push();
  loop();
  noStroke();
  let x = random(400);
  let y = random(150);
  fill(255, random(200, 230), random(80, 200), 13);
  ellipse(x, y, random(30, 90));
  pop();

  fill(38, 27, 20);
  for (let p of punches) {
    star(p.x, p.y, 10, 5, 5);
  }

  for (let p of punches) {
    push();
    translate(p.x, p.y + 200);
    beginClip();
    star(0, 0, 10, 5, 5);
    endClip();
    image(img, -p.x, -p.y, 400, 200);
    pop();
  }

  textAlign(CENTER);
  textSize(30);

  fill(255, 245, 245);
  textSize(12);
  text("hi monchhichi!", 320, 242);
}
