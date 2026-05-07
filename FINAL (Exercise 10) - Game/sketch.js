// exercise 10 - game
// made by gayl ragunjan for creative computing assessment 2
// submitted to ms. lavanya mohan


// our global variables!
let score; // holds the players score.
let multiplier; // the bonus the players get that multiply and give them more points.
let score_counter; // this counts the frames and uses that to decide when points are recorded.
let score_indicator; // this and the variable in the bottom are arrays that hold the floating points and multipliers that will show up.
let bonus_indicator;
let finn_state; // this holds what mode finn is currently in.
let state_timer; // checks how long finn has been in a state.
let distracted_time; // these variables hold the range of time these states last.
let turning_time;
let ooohgetPranked; // this is the variable that randomly makes finn fake out and not turn.
let current_screen = "start"; // this is what controls which screen is shown on the canvas.
let meter_fill; // tracks how full the meter is.
let mouse_active; // tracks whether the mouse is currently being held down.
let catch_timer; // tracks how long the caught screen shows.

function preload() {
  // we load our assets in before anything starts
  idlefinn1 = loadImage("finn idle 1.png");
  idlefinn2 = loadImage("finn idle 2.png");
  turningfinn = loadImage("finn turn.png");
  watchingfinn = loadImage("finn looking.png");
  angryfinn = loadImage("finn shocked.png");
  idlebubbline = loadImage("bubbline idle.png");
  kissingbubbline = loadImage("bubbline kiss.png"); // sprites
  caughtbubbline = loadImage("bubbline caught.png");
  bg = loadImage("background.png");
  font = loadFont("Thunderman.ttf"); // font
  bgmusic = loadSound("bgmusic.mp3");
  finnchewing = loadSound("finn chewing.mp3");
  finnhuh = loadSound("finn huh.mp3");
  finhmm = loadSound("finn hmm.mp3"); // sound effects + music!
  pointsfx = loadSound("point.mp3");
  multipliersfx = loadSound("multiplier.mp3");
  finnscream = loadSound("finn scream.mp3");
  wompwomp = loadSound("wompwomp.mp3");
}

const w = 570; // the size of our canvas to make positioning easier! i forget to use it sometimes though hehe
const h = 400;

function setup() {
  // this runs once and sets up the
  createCanvas(570,400); // size of our canvas,
  bgmusic.setVolume(0.5); // our background music that loops (and its volume).
  bgmusic.loop();

  finn_sprites = {
    // the sprite arrays
    distracted: idlefinn1, // this lets us access them with their indexes and we dont have to make a bunch of if statements! there is a key and a value that holds the images we preloaded.
    turning: turningfinn,
    looking: watchingfinn,
    caught: angryfinn,
  };

  bubbline_sprites = {
    // same for bubbline!
    idle: idlebubbline,
    kissing: kissingbubbline,
    caught: caughtbubbline,
  };

  textFont(font); // we also set the font for all texts.
  resetstats(); // and call a function that freshens up the game to be replayable when reset or restarted.
}

function start() {
  // i first made the title screen.
  fill(38,27,20); // this is the background color
  textSize(25);
  textAlign(CENTER, CENTER); // we center everything by changing the text alignment and splitting the width of the canvas and manually aligning its height.
  text("Seriously... A Kissing Game!?", w/2, 120);

  fill(38,27,20,127);
  textSize(16);
  text("Finn really, really hates PDA!", w/2, 185);
  text(
    "Be careful and dont let him catch\nPB and Marcy all over each other!",
    w / 2,
    219
  );

  stroke(38,27,20); // this is our play button! its just a rectangle with a border and text on top of it. i made sure to take note of its exact position and size so that when i get to making the buttons functional, i can use that info to decide the interactable area for it!
  strokeWeight(3);
  fill(164,157,62);
  rect(215,268,140,30,4);
  noStroke();
  fill(38,27,20);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("PLAY", 285,284);
}

function yesgirlskiss() {
  // this checks if the mouse is currently being hovered on and if finn is NOT looking. we turned this into a function so we can use it as a rule to use in other functions! (it returns as a boolean)
  return mouse_active && finn_state !== "looking";
}

function finn_stats(state) {
  // this function holds all of finns important state information!
  finn_state = state;
  state_timer = 0;
  distracted_time = random(90,400); // the distracted time picks a random number between 105–120 frames which at 60fps is about 2 seconds,
  turning_time = random(60,90); // the turning state only runs for 48 frames (less than a second).
  ooohgetPranked = random() < 0.25; // the fake out it has a 2% chance of happening!

  if (state === "distracted") {
    // with if statements we can choose what sound effects play for each state!
    finnchewing.setVolume(1.2); // the audio i used is just a liddle quiet which is why i increased the volume.
    finnchewing.play();
  } else if (state === "turning") {
    finnhuh.play();
  } else if (state === "looking") {
    finhmm.play();
  }
}

function finn_brain() {
  // this is where everything works!
  state_timer++; // this tracks the time and increases in increments for every frame.

  switch (
    finn_state // i had to take a second to learn how switch statements work! since theyre less overwhelming than if statements. but basically we first check finns current state!
  ) {
    case "distracted": // if the case is that hes distracted,
      if (state_timer > distracted_time) finn_stats("turning"); // it checks if hes been distracted for long enough using our range stored in distracted_time and then turns him into turning state!
      break;

    case "turning": // it basically works the same for the rest of the states hes in.
      if (state_timer > turning_time) {
        finn_stats(ooohgetPranked ? "distracted" : "looking"); // a ternary operator is also similar to an if statement. basically, if our fake variable miraculously beats the 2% odds and turns true, finn goes back to distracted, and otherwise it goes to the next state which is looking!
        if (finn_state === "looking" && mouse_active) trigger_caught();
      } // this then checks that if finn is looking and the player is currently holding, it calls the caught function that ends the game heh..
      break;

    case "looking": // the lookig is just da same as distracted and everything loops for the entirety of the game.
      if (state_timer > 70) finn_stats("distracted");
      break;
  }
}

function bar_and_friends() {
  // this is where our gimmick stuff goes (score + multiplier counter and meter bar)
  noStroke();
  textAlign(LEFT, TOP);
  stroke(38, 27, 20);
  strokeWeight(6); // our score
  fill(239, 221, 195);
  textSize(22);
  text("Score : " + score, 14, 10);

  textAlign(RIGHT, TOP);
  stroke(38, 27, 20);
  strokeWeight(7);
  fill(239, 221, 195); // our multiplier
  textSize(40);
  text("x" + multiplier, 556, 6);

  noStroke(); // our bar is made of three parts!
  fill(239, 221, 195); // this is the bottom unfilled area
  rect(20, 372, 530, 14, 4);

  fill(186, 87, 61); // this is the meter_fill itself
  rect(20, 372, max(530 * (meter_fill / 100), 0), 14);

  stroke(38, 27, 20);
  strokeWeight(3.5);
  noFill(); // and this is the stroke border! combining this with the initial unfilled area made the stroke look thin no matter what weight it had. so i just offset its properties a bit so it fits right on top!
  rect(20 - 1, 372 - 1, 530 + 2, 14 + 2);
  noStroke();

  fill(38, 27, 20);
  textSize(10); // this is the little instructions under.
  textAlign(CENTER);
  text("hold the mouse to.. yew know..!", w / 2, 373);
}

function floaties(list, text) {
  // this creates and stores a new floating element inside an array so it can later be drawn.
  list.push({ x: random(60, 510), y: random(60, 100), text: text, timer: 20 }); // this stores all the information needed for one popup text, its random position, the text it holds, and its timer to be visible.
}

function numbers_on_da_screen() {
  // this function is what holds all the floating elements and their arrays
  strokeWeight(6);
  textAlign(CENTER);

  for (let i = 0; i < score_indicator.length; i++) {
    // this loops for every each item that is added in the array
    stroke(106, 38, 20); // its design properties
    fill(200, 125, 100);
    textSize(30);
    score_indicator[i].timer--; // its timer decreases until it disappears
    text(score_indicator[i].text, score_indicator[i].x, score_indicator[i].y); // the text that gets drawn is the text we made for the floaties() and it gets randomly placeed on the screen
  }
  score_indicator = score_indicator.filter((ind) => ind.timer > 0); // this gets rid of all the items with finished timers using filter().

  for (let i = 0; i < bonus_indicator.length; i++) {
    // the same thing goes for the multiplier!
    stroke(152, 113, 48);
    fill(220, 176, 102);
    textSize(50);
    bonus_indicator[i].timer--;
    text(bonus_indicator[i].text, bonus_indicator[i].x, bonus_indicator[i].y);
  }
  bonus_indicator = bonus_indicator.filter((ind) => ind.timer > 0);
}

function wat_dat_kiss_do() {
  // now the answer to that great question is in this function! this is how we get points and how our meter gets filled
  if (!yesgirlskiss()) {
    // if NOT k-wording..
    meter_fill = max(meter_fill - 0.15, 0); // the meter gets deducted! the max function prevents it from going to below negative values.
    if (meter_fill === 0 && multiplier > 1) multiplier--; // if the fill reachs 0 and the multiplier is more than one, it makes our multiplier go back to x1.
    score_counter = 0; // the score counter also resets so that the player can still get points even with breaks in between holding and they dont need to wait frames to get points again.
    return;
  }
  // but if the player is holding, and they arent getting caught...
  meter_fill = min(meter_fill + 0.2 / multiplier, 100); // the meter gets filled but when the multiplier goes up, the gain slows down. this is capped at 100.
  if (++score_counter % 18 !== 0) return; // the score counter works by increasing by increment and getting the remainder after dividing the time by 18 frames (which is when a point is registered).

  score += multiplier; // the bigger multiplier the more points u get per k-word!
  pointsfx.play(); // for every point earned an sfx plays!
  floaties(score_indicator, "+" + multiplier); // this is just how the floating element for that appears.

  if (meter_fill >= 100 && multiplier < 8) {
    // if the meter fill is at 100.
    meter_fill = 0; // it gets reset back to 0.
    multipliersfx.play(); // and does the same thing as the points!
    multiplier++; // it just adds 1 to the current multiplier.
    floaties(bonus_indicator, "x" + multiplier + " !");
  }
}

function scene(current_finn, current_bubbline) {
  // this calls our background and the characters!
  image(bg, 0, 0, w, h);
  image(bubbline_sprites[current_bubbline], 14, 110, 300, 260); // we size and position our sprites. their going to be in their default states.
  image(finn_sprites[current_finn], 250, 35, 360, 370);
}

function play() {
  // this is the main game screen.
  finn_brain(); // calls our finn logic and our score and meter logic.
  wat_dat_kiss_do();

  let bubbline_state = yesgirlskiss() ? "kissing" : "idle"; // the bubbline sprite depends on if the user is holding and if finn isnt looking (yesgirlskiss) which turns it into the k-wording sprite, and otherwise it stays idle.

  scene(finn_state, bubbline_state); // we call our sprites on screen,
  bar_and_friends(); // the hud and the floaties!
  numbers_on_da_screen();
}

function caught() {
  // this is our caught screen, which is just a red overlay and text. this only shows up for a bit before disappearing.
  scene("caught", "caught");
  bar_and_friends();

  catch_timer--; // deducts from the timer
  fill(132, 58, 27, 120); // the red overlay
  rect(0, 0, w, h);
  stroke(38, 27, 20);
  strokeWeight(9);
  fill(239, 221, 195);
  textSize(70);
  textAlign(CENTER, CENTER);
  text("BUSTED!", w / 2, h / 2); // the big text

  if (catch_timer <= 0) {
    // once the timer reaches zero it switches to the try again/game over screen.
    current_screen = "gameover";
  }
}

function trigger_caught() {
  // when the player gets caught this function is called and it resets the multiplier, the meter, stops all the sounds, plays the sound when finn catches you, and switches the screen to the caught screen.
  current_screen = "caught";
  multiplier = 1;
  meter_fill = 0;
  catch_timer = 110;
  finnchewing.stop();
  finnhuh.stop();
  finhmm.stop();
  bgmusic.stop();
  finnscream.play();
  finnscream.onended(() => {
    wompwomp.play();
    mouse_active = false;
  });
}

function gameover() {
  // the gameover screen which is very similar to the starting screen.
  fill(38, 27, 20);
  textSize(26);
  textAlign(CENTER, CENTER);
  text("Womp Womp...", w / 2, 140);
  fill(38, 27, 20, 127);
  textSize(14);
  text("Final Score : " + score, w / 2, 190);

  stroke(38, 27, 20);
  strokeWeight(3);
  fill(164, 157, 62);
  rect(215, 224, 140, 30, 4);
  noStroke();
  fill(38, 27, 20);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("TRY AGAIN", 285, 240);
}

function clicked() {
  // this is how our buttons work!!
  if (current_screen === "start") {
    if (mouseX > 215 && mouseX < 355 && mouseY > 268 && mouseY < 298) {
      // it takes the same measurements my buttons have and if my mouse is in its boundaries,
      resetstats(); // it resets everything
      current_screen = "play"; // and goes to the game itself
    }
  } else if (current_screen === "gameover") {
    // for the gameover button too
    if (mouseX > 215 && mouseX < 355 && mouseY > 224 && mouseY < 254) {
      current_screen = "play";
      bgmusic.loop(); // replays da bg music that we paused
      resetstats();
    }
  } else if (current_screen === "play") {
    // if the user is already playing, set mouse_active to true so kissing can begin!
    mouse_active = true;
  }
}

function not_clicked() {
  mouse_active = false; // basically the opposite of all of that!
}

function mousePressed() {
  // built in p5.js function for mouse inputs!
  clicked(); // we call our function.
}

function mouseReleased() {
  not_clicked(); // yes same thing basically.
}

const screens = { // our screen array and its keys and corresponding functions.
  start,
  play: play,
  caught: caught,
  gameover: gameover,
};

function resetstats() {
  // this function resets everything to be fresh when the game is replayed or reset!
  score = 0;
  multiplier = 1;
  score_counter = 0;
  meter_fill = 0;

  finn_state = "distracted";
  state_timer = 0;
  distracted_time = random(105, 120);
  turning_time = 0.8;
  ooohgetPranked = random() < 0.02;

  score_indicator = [];
  bonus_indicator = [];

  mouse_active = false; // we add this so that if the player leaves off holding their mouse (which is if they get caught, it doesnt bug out and start activated for the player when the game restarts.
}

function draw() {
  // draws START (our current screen)
  background(255, 246, 232);
  screens[current_screen]?.();
}
