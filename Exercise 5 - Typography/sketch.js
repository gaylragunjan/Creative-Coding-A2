// exercise 5 - typography
// made by gayl ragunjan for creative computing assessment 2
// submitted to ms. lavanya mohan


function preload() {
  // this is where we load in our outside assets! like our font and background image.
  font = loadFont("PinyonScript-Regular.ttf");
  jeans = loadImage("jeans.jpg");
}

// i took a lot of inspo from the dot to font exercise we did in class! i just wanted to change it up a bit and pretend my text is cros-stiched on. i have some grapic design work i saw and used as reference which i will add in my documentation.

function setup() {
  createCanvas(400, 400);
  text1 = font.textToPoints("Keep it", 30, 145, 80, { sampleFactor: 0.222 });
  text2 = font.textToPoints("in Your", 155, 205, 80, { sampleFactor: 0.222 });
  text3 = font.textToPoints("Pants!", 30, 310, 140, { sampleFactor: 0.245 }); // since i wanted 3 lines of text, i made them into separate text lines. font.textToPoints from my understanding traces the outline of the letters and turns each vertex/point into a coordinate. the next two values are where its placed in the canvas (with the most left side as its origin), the one after is its size and the sampleFactor controls how densely the points are placed along the outlines! so it can either be tighter or more spread out.
  x = 200; // these just preset our x and y values to the center of the canvas.
  y = 200;
}

function stitch(x, y) {
  push();
  strokeWeight(1.3); // this is how think our "embroidery thread" will be!
  stroke(255, 245, 245);
  translate(x, y); // this sets its origin to the center.
  rotate(0.8); // using radians we rotate it about 45 degrees so it turns into an x! (which is why we had to center its origin or i would rotate from a completely different point)
  line(-2, 0, 2, 0); // the shape is basically just a short line going across and another over it!
  line(0, 2, 0, -2);
  pop();
}

function draw() {
  image(jeans, -90, -30, 500, 500); // this sets our background! (when i made this, i didn't know you could just set it as the background yet... hehe)
  for (var i = 0; i < text1.length; i++) {
    // for every point in the text, it draws our stitch on each one
    var t = text1[i]; // this takes the current point from the array at index i and stores it as a t coordinate (t.x t.y)
    stitch(t.x, t.y); // then with that info, thats where the stitch goes!
  }

  for (var i = 0; i < text2.length; i++) {
    var t = text2[i]; // goes the same for these ones... heh
    stitch(t.x, t.y);
  }

  for (var i = 0; i < text3.length; i++) {
    var t = text3[i];
    stitch(t.x, t.y);
  }
}
