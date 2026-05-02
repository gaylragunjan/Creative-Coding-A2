// exercise 7 - interactive art
// made by gayl ragunjan for creative computing assessment 2
// submitted to ms. lavanya mohan


let dots = []; // dots is an empty array that will store all the dots we have!
function setup() {
  createCanvas(400, 400);
  // the entirety of this is built upon a grid.
  let columns = width / 8; // this and the line below figures out exactly how many dots fit horizontally and vertically in rows and columns, by dividing the size of the canvas by the space iwant between each dot! which i chose to be 8 pixels.
  let rows = height / 8;
  let offx = (width - columns * 8) / 2, // because we dont want the dots to be on the top left of the screen but centered, we calculate its offset! so cols times the space is the total space our entire grid of dots take up horizontally. we subtract that from the width (or height) to get the leftover space and we divide it by two so that its centered, since it takes space from both the left and right side. (and the top and bottom for height!)
    offy = (height - rows * 8) / 2;

  for (
    let r = 0;
    r <= rows;
    r++ // so in a nested loop, the outer loop goes through each row and the inner loop goes through each column. which checks every possible position in our little grid!
  )
    for (let c = 0; c <= columns; c++) {
      let posx = offx + c * 8; // this calculates the dot's original positions and stores it.
      let posy = offy + r * 8;
      dots.push({ offx: posx, offy: posy, x: 0, y: 0 });
    }
  // it kinda took me a bit to visualize and figure this out but for every grid position it draws a dot (adds one to the dot array) with its original position and where it ends up getting displaced!

  // for the next parts, i got a good amount of help from AI and this youtube video ( https://www.youtube.com/watch?v=Fbzqfsy5GnM ) with this so i'm honestly explaining it in the way i understand it! it was a very fun learning adventure but this really stressed me out >__<
}
function draw() {
  background(0);
  for (let d of dots) {
    // we loop through every dot in our array.
    let distx = d.offx - mouseX, // this calculates the distance between the current dot's original position and the mouse! so when the dot is on the right of the mouse its positive and if its on the left its negative.
      disty = d.offy - mouseY;
    let dist = sqrt(distx * distx + disty * disty); // our distance is calculated by using the pythagorean theorem to get the straight distance between the dot and the mouse. the formula finds the straight-line distance between two points using their horizontal and vertical gaps. because the effect only works when it knows how close the mouse actually is to each dot and "close" means straight line, not just how far left/right or up/down it is!
    let movex = 0, // we declare our target displacement or where the dot wants to move to.
      movey = 0; // 
    if (dist < 50 && dist > 0) {
      // if the distance calculated is within 50 pixels, and also if the mouse isnt exactly on the dot,
      let f = (1 - dist / 50) * 20; // we create a variable for force. when the mouse is very close to the dot, it pushes the dot with the full force of 20px. when the mouse is at the edge of the radius (distance near 50), the force lessens until its basically 0.
      movex = (distx / dist) * f; // we give the dot a value between -1 and 1 which is its direction pointing from the mouse toward the dot. multiplying by the force scales that direction, so the dot gets pushed away from the mouse by the right amount.
      movey = (disty / dist) * f;
    }
    d.x += (movex - d.x) * 0.15; 
    d.y += (movey - d.y) * 0.15;
    let moved = sqrt(d.x * d.x + d.y * d.y); // this checks how far the dot has actually moved from its home position. and this is how we check and see if it should change opacity or size!
    noStroke();
    fill(255, map(moved, 0, 4, 120, 220)); // this makes it so that dots that have barely moved are more transparent, and dots that have moved further are more opaque and bright.
    circle(d.offx + d.x, d.offy + d.y, map(moved, 0, 20, 3, 6)); // thos draws the dot at its displacwd position, growing slightly in size the more it has moved.
  }
}