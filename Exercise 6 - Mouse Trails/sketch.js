// exercise 6 - mouse trails
// made by gayl ragunjan for creative computing assessment 2
// submitted to ms. lavanya mohan


let yay = [
  // we store the kaomojis in an array, this is the selection that gets randomly picked from whenever a new one needs to appear!
  "(˶ˆᗜˆ˵)", "♬⋆.˚", "(๑•᎑•๑)", "₍^. .^₎⟆", "(´｡• ᵕ •｡`)", "⋆｡°✩", "(｡ᵕ ◞ _◟)", "(˶>⩊<˶)",
];
let trail = []; // the trail itself is an empty array. every kaomoji currently visible on screen gets put in here as an object. so depending if they show up or disappear from the screen they get added or removed

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 245, 245); // we put our background in the draw function instead of setup so that it resets each frame! is what creates the fading effect, since it covers whatever is on the previous frame.
  let previous = trail[trail.length - 1]; // previous is the last kaomoji that was added to the trail, and this is how we store and know how far the mouse has moved since that last kaomoji.
  let space = !previous || dist(mouseX, mouseY, previous.x, previous.y) > 50; // space checks if the trail array is empty, or if the the distance of the mouse from the last kaomoji is more than 50 px! when both are true, it adds a space! so they dont show up stacked on each other.

  if (space) {
    // if a space is added, it pushes/adds a random kaomoji from our yay array, with a random size and full opacity (or alpha! learnt it from here: https://p5js.org/reference/p5/alpha/). with its position being where the mouse currently is.
    trail.push({
      face: random(yay),
      size: random(8, 30),
      alpha: 255,
      x: mouseX,
      y: mouseY,
    });
  }

  trail = trail.filter((t) => t.alpha > 0); // when a kaomoji with full transparency or alpha = 0, it gets removed from the trail array so it isnt filled with anything that's invisible.

  for (let t of trail) {
    // so with all of those parameters set, this loop goes through every kaomoji in our trail and sets the colour to black using that kaomoji's current transparency, so older ones look like they're fading away.
    fill(38, 27, 20, t.alpha);
    textSize(t.size);
    text(t.face, t.x, t.y); // it draws the kaomoji where it was created at so it stays there as we move the mouse somewhere else.
    t.alpha -= 4; // we use an assignment operator that decreases the opacity every frame, making it slowly fade!
  }
}
