// exercise 9 - data visualization
// made by gayl ragunjan for creative computing assessment 2
// submitted to ms. lavanya mohan


function preload() {
  // these are all our different assets!
  img = loadImage("ladybug.png");
  bg = loadImage("bg.png");
  table = loadTable("streams.csv", "csv", "header");
  font = loadFont("Minya Nouvelle Rg.otf");
}

function setup() {
  createCanvas(400, 500);
  background(255, 245, 245); // as you can see im using two backgrounds! a background image is layered on top, but at 200 out of 255 opacity so it's a little see-through, letting the colour under show through heh
  background(bg, 200);
  textFont(font); // this sets all the text i draw to use the font i preloaded!

  // i figured the logic out with the help of the data column exercise we did in class!

  let cols = table.rows.length; // these are all our different variables! this counts how many rows are in the CSV (our selection of songs.
  let streams = table.getColumn("streams").map(Number); // this turns our values under "streams" from strings to integers!
  let biggest = max(streams); // this checks for what song has the highest amount of streams.
  let bugcap = 18; // this is the most ladybugs a song can have.
  let bugsize = 22; // this is how many pixels big our ladybugs are!
  let colw = width / cols; // this spreads the columns out evenly so theyre spaced out neatly on the canvas! the quotient is the space between each column.

  fill(38, 27, 20);
  textAlign(CENTER);
  textSize(30);
  text("summertime (1997)", 220, 195);
  textSize(18);
  text("the sundays", 220, 220);
  textSize(13);
  fill(38, 27, 20, 150);
  text("(songs and their number of streams in ladybugs!)", 220, 260);

  for (let i = 0; i < table.rows.length; i++) {
    // so we have a loop that runs for every item in our CSV file.
    let title = table.getString(i, "song"); // this takes the song title per index.
    let stream = streams[i]; // it then gets each of the songs' number of streams per index.
    let bugs = round(map(stream, 0, biggest, 1, bugcap)); // this determines how the minimum and maximum bugs a song can get. so the most-streamed song gets 18 bugs, the least gets 1. the round() function turns the result into a whole number.
    let x = colw * i + colw / 2; // this finds the middle of each column so that when we draw the title and its number of streams, its perfectly aligned with its column.

    // this is how our bars work..! (i got a little bit of help from ai with this.. just so i could visualize how it would work)

    for (let b = 0; b < bugs; b++) {
      // so for every ladybug that needs to be in a column, they get stacked upwards. the first ever bug sits at y = 420, and the next bug is added above it or deducted from 420, since its going down the y-axis! it finds its place perfectly because each subsequent bug is placed bugsize pixels higher!
      let y = 420 - b * bugsize;
      let tilt = random(-0.3, 0.8); // we also want our bugs to tilt a little so we create a variable that will randomly tilt them!

      push();
      translate(x, y); // this is the position of our bug
      rotate(tilt); // its random rotation
      imageMode(CENTER);
      image(img, 0, 0, bugsize, bugsize); // we print our image at 0,0 but it gets moved cause of the translate line! it is bugsize or 22 pixels big.
      pop();
    }

    fill(38, 27, 20);
    textSize(12);
    textAlign(CENTER);
    text(title, x, 450); // this draws the song name below the bugs, at y=450!

    textSize(10);
    fill(38, 27, 20, 175);
    text(nfc(stream, 0), x, 465); // and this draws the stream count under the titles! with the nfc() function formatting our numbers with commas! i learnt that from here hehe: https://p5js.org/reference/p5/nfc/
  }
}
