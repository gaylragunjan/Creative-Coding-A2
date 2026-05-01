// exercise 1 - car
// made by gayl ragunjan for creative computing assessment 2
// submitted to ms. lavanya mohan


function preload() {
  bg = loadImage('backdrop.png') // we load our backdrop as an object so we can call it in the background() function!
}
function setup() {
  createCanvas(400, 400); 
  background(bg); // this sets our background
  strokeWeight(4); // we initialize or set the attributes we want all our elements to have which is that all of them will have this color and sized stroke
  stroke(38, 27, 20);
}

function draw() { // because i initially drew my car to be too long and squeezed out i had to fix it and squish it back to the size i want it to!
  translate(200, 210); // first we have to change the origin point of our car to the center, so that scaling and moving it around is a lot easier.
  scale(0.9, 1.2); // this is how we adjust its width and height
  translate(-200, -200); // to make sure every specific point of the cars vertices are in the right place we change its origin again.
  
  
  
  // shadow 
  push(); // using push() and pop() save the attributes only for the parts drawn inside it, so that these settings dont affect the other parts under
  strokeWeight(4);
  stroke(208, 202, 183)
  fill(0, 0, 0, 0);
  line(50, 263, 335, 263);
  pop(); // i didn't draw the parts in this order but theyre arranged in this sequence so that all the parts layer correctly!
  
  
  // behind da wheels
  push();
  fill(41, 35, 30);
  rect(52, 200, 280, 40);
  pop();
  
  
  // tires
  push();
  fill(69, 55, 45);
  ellipse(87, 240, 55, 45);
  ellipse(298, 240, 55, 45);
  fill(164, 149, 110);
  ellipse(87, 240, 25, 18);
  ellipse(298, 240, 25, 18);
  pop();
  
  
  // da car yo
  push();
  fill(133, 114, 61);
  beginShape(); // to make parts like the body of the car and all the other irregular shapes, i had to make a custom shape using the beginShape() and endShape() functions ! 
  vertex(125, 245);
  vertex(265, 245); // we map out points with vertex() and it fills in its shape just like a constellation in the sky!
  vertex(265, 230);
  vertex(270, 220);
  vertex(285, 215);
  vertex(305, 215);
  vertex(325, 220);
  vertex(330, 230);
  vertex(330, 245);
  vertex(350, 245);
  vertex(360, 240);
  vertex(365, 220);
  vertex(355, 200);
  vertex(325, 180);
  vertex(310, 155);
  vertex(290, 140);
  vertex(255, 130);
  vertex(230, 128);
  vertex(175, 130);
  vertex(155, 135);
  vertex(130, 160);
  vertex(115, 175);
  vertex(75, 175);
  vertex(50, 180);
  vertex(40, 185);
  vertex(35, 190);
  vertex(25, 200);
  vertex(20, 215);
  vertex(23, 230);
  vertex(25, 240);
  vertex(40, 245);
  vertex(55, 245);
  vertex(55, 230);
  vertex(60, 220);
  vertex(70, 215);
  vertex(100, 215);
  vertex(115, 220);
  vertex(120, 230);
  vertex(120, 245);
  endShape(CLOSE); // closing the shape adds a fill that we can change the color of! without it, we can leave it blank or we can use noFill() 
  pop();
  
  
  // front bumper
  push();
  fill(164, 149, 110);
  beginShape();
  vertex(33, 245);
  vertex(20, 245);
  vertex(18, 240);
  vertex(18, 230);
  vertex(20, 225);
  vertex(30, 225);
  vertex(45, 228);
  vertex(45, 235);
  vertex(35, 238);
  vertex(33, 245);
  endShape();
  pop();
  
  
  // back bumper
  push();
  fill(164, 149, 110);
  beginShape();
  vertex(350, 225);
  vertex(345, 228);
  vertex(345, 235);
  vertex(350, 245);
  vertex(360, 245);
  vertex(362, 240);
  vertex(370, 235);
  vertex(370, 230);
  vertex(370, 228);
  vertex(350, 225);
  endShape();
  pop();
  
  
  // windows
  push();
  fill(208, 194, 157);
  beginShape();
  vertex(135, 170);
  vertex(138, 175);
  vertex(150, 180);
  vertex(285, 180);
  vertex(290, 175);
  vertex(290, 170);
  vertex(260, 145);
  vertex(240, 140);
  vertex(170, 140);
  vertex(155, 145);
  vertex(135, 170);
  endShape();
  fill(139, 127, 74);
  rect(210, 140, 6, 40);
  line(168, 140, 160, 180);
  pop();
  
  
  // hood thingie
  push();
  stroke(69, 55, 45, 100);
  fill(0, 0, 0, 0);
  beginShape();
  vertex(37, 190);
  vertex(100, 190);
  vertex(110, 185);
  vertex(110, 175);
  endShape();
  pop();
  
  
  // da door
  push();
  stroke(69, 55, 45, 100);
  fill(0, 0, 0, 0);
  beginShape();
  vertex(135, 170);
  vertex(150, 230);
  vertex(160, 240);
  vertex(230, 240);
  vertex(235, 235);
  vertex(245, 180);
  endShape();
  pop();
  
  
  // door handle
  push();
  stroke(69, 55, 45);
  fill(0, 0, 0, 0);
  beginShape();
  vertex(210, 190);
  vertex(230, 190);
  vertex(232, 194);
  endShape();
  pop();
}
